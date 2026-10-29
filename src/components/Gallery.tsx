import { useMemo, useState, type FormEvent } from "react";
import Header from "./Header";
import TopHeader from "./TopHeader";
import { categories, galleryImages } from "./galleryData";
import { searchGallery } from "./galleryApi";
import type { GalleryImage } from "./galleryTypes";

export default function Gallery() {
  const [category, setCategory] = useState<string>("ALL");
  const [query, setQuery] = useState("");
  const [aiResultIds, setAiResultIds] = useState<string[] | null>(null);
  const [aiMessage, setAiMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  const filteredImages = useMemo(() => {
    return galleryImages.filter((image) => {
      const matchesCategory =
        category === "ALL" || image.category === category;

      const matchesAI =
        aiResultIds === null || aiResultIds.includes(image.id);

      return matchesCategory && matchesAI;
    });
  }, [category, aiResultIds]);

  
  async function searchWithAI(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setLoading(true);
    setError("");
    setAiMessage("");

    try {
      const result = await searchGallery(trimmedQuery, galleryImages);
      setAiResultIds(result.imageIds);
      setAiMessage(result.message);
    } catch (err) {
      console.error("AI gallery search failed:", err);

      setError(
        err instanceof Error
          ? err.name === "TimeoutError"
            ? "The AI search took too long. Please try again."
            : err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setQuery("");
    setAiResultIds(null);
    setAiMessage("");
    setError("");
  }

  return (
    <>
        <TopHeader />
        <Header />
    <main className="min-h-screen bg-[#faf9f6] text-[#202b28]">
      {/* Navigation */}
      

      {/* Hero */}
      <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-[#1d2924] px-5 pb-12 pt-28 text-center text-white">
        <img
          src="https://assets.cntraveller.in/photos/64d1f51e7f4c9f4cc0cc84b3/master/w_1600%2Cc_limit/Sadhya.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-[1] max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#e6bd61]">
            A taste of Kerala at Sree's Kitchen
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Our Gallery
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
            Discover Kerala favourites, from coastal curries and soft appam to
            festive sadya and homestyle sweets.
          </p>
        </div>
      </section>

      {/* Gallery content */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {/* AI search */}
        <form
          onSubmit={searchWithAI}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 shadow-sm focus-within:border-[#c99a38]">
            <span aria-hidden="true" className="text-xl text-[#bd8e2e]">
              ✨
            </span>
            <span className="sr-only">Search gallery with AI</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Ask AI to find something... e.g. "fish curry" or "vegetarian sadya"'
              className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-gray-400"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            )}
          </label>

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-[#c99a38] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#ae812b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Searching..." : "✦ Search with AI"}
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {aiMessage && !error && (
          <p role="status" className="mt-3 text-sm text-[#65716a]">
            {aiMessage}
          </p>
        )}

        {/* Category filters */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item.value}
                onClick={() => setCategory(item.value)}
                className={`rounded-full border px-5 py-2.5 text-sm transition ${
                  category === item.value
                    ? "border-[#1d2924] bg-[#1d2924] text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#c99a38] hover:text-[#8c6823]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500" aria-live="polite">
            Showing {filteredImages.length} of {galleryImages.length} photos
          </p>
        </div>

        {/* Gallery cards */}
        {filteredImages.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredImages.map((image) => (
              <button
                type="button"
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group min-w-0 text-left"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200">
                  <img
                    src={image.imageUrl}
                    alt={image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#25312c]">
                    {categories.find((item) => item.value === image.category)?.label}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
                    <span className="rounded-full bg-black/50 px-4 py-2 text-sm">
                      View photo ↗
                    </span>
                  </span>
                </div>

                <h2 className="mt-3 font-semibold text-[#202b28] transition group-hover:text-[#a77b25]">
                  {image.title}
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                  {image.description}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg font-medium">No matching photos found</p>
            <p className="mt-2 text-sm text-gray-500">
              Try another search or select a different category.
            </p>
            <button
              onClick={() => {
                setCategory("ALL");
                clearSearch();
              }}
              className="mt-5 rounded-full bg-[#1d2924] px-5 py-2.5 text-sm text-white"
            >
              Show all photos
            </button>
          </div>
        )}
      </section>

      {/* Image preview modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.title}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close image preview"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1.5 text-xl text-white"
            >
              ×
            </button>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.alt}
              className="max-h-[70vh] w-full object-cover"
            />
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-[#ae812b]">
                {categories.find((item) => item.value === selectedImage.category)?.label}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                {selectedImage.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  );
}
