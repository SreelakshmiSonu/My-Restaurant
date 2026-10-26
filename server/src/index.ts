
import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
  }),
);

app.use(express.json({ limit: "20kb" }));

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in server/.env");
}

const ai = new GoogleGenAI({ apiKey });

type GalleryImageInput = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
};

type GallerySearchResult = {
  imageIds: string[];
  message: string;
};

// Retry temporary Gemini API failures up to two times.
async function retryOnTemporaryError<T>(
  operation: () => Promise<T>,
  retries = 2,
): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);

      const isTemporary =
        message.includes("503") ||
        message.includes("UNAVAILABLE") ||
        message.includes("429") ||
        message.includes("RESOURCE_EXHAUSTED");

      if (!isTemporary || attempt >= retries) {
        throw error;
      }

      const delay = 1000 * 2 ** attempt;

      console.warn(
        `Gemini request failed temporarily. Retrying in ${delay}ms...`,
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/gallery-search", async (req, res) => {
  const { query, images } = req.body ?? {};

  if (
    typeof query !== "string" ||
    query.trim().length < 2 ||
    query.length > 300 ||
    !Array.isArray(images) ||
    images.length > 100
  ) {
    res.status(400).json({
      error: "Invalid search request.",
    });
    return;
  }

  const validImages = images.every(
    (image: unknown) =>
      typeof image === "object" &&
      image !== null &&
      typeof (image as GalleryImageInput).id === "string" &&
      typeof (image as GalleryImageInput).title === "string" &&
      typeof (image as GalleryImageInput).description === "string" &&
      typeof (image as GalleryImageInput).category === "string" &&
      Array.isArray((image as GalleryImageInput).tags) &&
      (image as GalleryImageInput).tags.every(
        (tag: unknown) => typeof tag === "string",
      ),
  );

  if (!validImages) {
    res.status(400).json({
      error: "Invalid gallery image metadata.",
    });
    return;
  }

  try {
    const galleryImages = images as GalleryImageInput[];

    const response = await retryOnTemporaryError(() =>
      ai.models.generateContent({
        // Use the model ID recommended by your Gemini API error.
        model: "gemini-3.8-flash",
        contents: JSON.stringify({
          instruction:
            "Match the user's search query to the supplied gallery image metadata. " +
            "Return only IDs that exist in the supplied images. " +
            "If nothing matches, return an empty imageIds array. " +
            "Use the message field to briefly explain the result.",
          query: query.trim(),
          images: galleryImages,
        }),
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              imageIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              message: {
                type: Type.STRING,
              },
            },
            required: ["imageIds", "message"],
          },
        },
      }),
    );

    const responseText = response.text;

    if (!responseText) {
      throw new Error("Gemini returned an empty response.");
    }

    const result = JSON.parse(responseText) as GallerySearchResult;

    if (
      !Array.isArray(result.imageIds) ||
      !result.imageIds.every((id) => typeof id === "string") ||
      typeof result.message !== "string"
    ) {
      throw new Error("Gemini returned an invalid response format.");
    }

    // Only return IDs belonging to the submitted gallery.
    const allowedIds = new Set(
      galleryImages.map((image) => image.id),
    );

    const imageIds = [...new Set(result.imageIds)].filter((id) =>
      allowedIds.has(id),
    );

    res.json({
      imageIds,
      message: result.message,
    });
  } catch (error) {
    console.error("AI gallery search failed:", error);

    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "AI search failed. Please try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});