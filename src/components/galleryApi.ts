import type { GalleryImage } from "./galleryTypes";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

type GallerySearchResponse = {
  imageIds: string[];
  message: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getErrorMessage(result: unknown): string {
  if (!isRecord(result) || !("error" in result)) {
    return "AI search failed. Please try again.";
  }

  const error = result.error;

  if (typeof error === "string") {
    // Some APIs return a JSON-encoded error string.
    try {
      const parsed: unknown = JSON.parse(error);
      if (isRecord(parsed) && isRecord(parsed.error) &&
          typeof parsed.error.message === "string") {
        return parsed.error.message;
      }
    } catch {
      // The error was ordinary text, so return it as-is.
    }

    return error;
  }

  if (isRecord(error) && typeof error.message === "string") {
    return error.message;
  }

  return "AI search failed. Please try again.";
}

export async function searchGallery(
  query: string,
  images: GalleryImage[],
): Promise<GallerySearchResponse> {
  const response = await fetch(`${API_BASE_URL}/api/gallery-search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query.trim(),
      images: images.map(({ id, title, description, category, tags }) => ({
        id,
        title,
        description,
        category,
        tags,
      })),
    }),
    signal: AbortSignal.timeout(60_000),
  });

  const result: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(result));
  }

  if (
    !isRecord(result) ||
    !Array.isArray(result.imageIds) ||
    !result.imageIds.every((id: unknown) => typeof id === "string")
  ) {
    throw new Error("The server returned an unexpected search response.");
  }

  return {
    imageIds: result.imageIds,
    message:
      typeof result.message === "string"
        ? result.message
        : "Search completed.",
  };
}
