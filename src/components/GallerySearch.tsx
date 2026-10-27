import { useState } from "react";

export default function GallerySearch() {
  const [query, setQuery] = useState("");

  const searchWithAI = async () => {
    // const API_BASE_URL =
    //   import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

    // const response = await fetch(
    //   `${API_BASE_URL}/api/gallery-search`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       query: query,
    //       Image,
    //     }),
    //   },
    // );

    // Handle the response here
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void searchWithAI();
      }}
    >
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search the gallery..."
      />
      <button type="submit">Search with AI</button>
    </form>
  );
}