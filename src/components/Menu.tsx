import { useMemo, useState } from "react";
import Header from "./Header";
import TopHeader from "./TopHeader";
import {
  menuItems,
  menuSections,
  spiceLabels,
  type DietaryType,
  type MenuSection,
} from "./menuData";

type DietaryFilter = DietaryType | "ALL";
type SpiceFilter = "ALL" | "0" | "1" | "2" | "3";

function Menu() {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState<MenuSection | "ALL">("ALL");
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>("ALL");
  const [spiceFilter, setSpiceFilter] = useState<SpiceFilter>("ALL");

  const filteredItems = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        [item.name, item.description, ...item.tags]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm);
      const matchesSection = section === "ALL" || item.section === section;
      const matchesDiet =
        dietaryFilter === "ALL" || item.dietaryType === dietaryFilter;
      const matchesSpice =
        spiceFilter === "ALL" || item.spiceLevel === Number(spiceFilter);

      return matchesSearch && matchesSection && matchesDiet && matchesSpice;
    });
  }, [query, section, dietaryFilter, spiceFilter]);

  function clearFilters() {
    setQuery("");
    setSection("ALL");
    setDietaryFilter("ALL");
    setSpiceFilter("ALL");
  }

  return (
    <>
      <TopHeader />
      <Header />

      <main className="min-h-screen bg-[#faf9f6] pb-16 pt-28 text-[#202b28] sm:pt-32">
        <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-[#1d2924] px-5 py-16 text-center text-white">
          <img
            src="https://assets.cntraveller.in/photos/64d1f51e7f4c9f4cc0cc84b3/master/w_1600%2Cc_limit/Sadhya.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-[1] max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#e6bd61]">
              Sree’s Kitchen · Nottingham
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              The Menu
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              Kerala favourites, Indian classics and comforting dishes made for
              sharing.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-9 lg:px-8">
          <div className="mb-6 flex flex-wrap gap-2" aria-label="Menu sections">
            {menuSections.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setSection(item.value)}
                aria-pressed={section === item.value}
                className={`rounded-full border px-5 py-2.5 text-sm transition ${
                  section === item.value
                    ? "border-[#1d2924] bg-[#1d2924] text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#c99a38] hover:text-[#8c6823]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(220px,1fr)_190px_190px_auto] md:items-end">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Search dishes
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try biriyani, prawns, appam..."
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#c99a38]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Dietary
              </span>
              <select
                value={dietaryFilter}
                onChange={(event) =>
                  setDietaryFilter(event.target.value as DietaryFilter)
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#c99a38]"
              >
                <option value="ALL">Veg & non-veg</option>
                <option value="VEG">Vegetarian</option>
                <option value="NON_VEG">Non-vegetarian</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Hotness
              </span>
              <select
                value={spiceFilter}
                onChange={(event) =>
                  setSpiceFilter(event.target.value as SpiceFilter)
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#c99a38]"
              >
                <option value="ALL">Any spice level</option>
                {spiceLabels.map((label, index) => (
                  <option key={label} value={index}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#8c6823] hover:bg-[#faf6ec]"
            >
              Clear filters
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500" aria-live="polite">
              Showing {filteredItems.length} of {menuItems.length} menu items
            </p>
            <p className="text-xs text-gray-500">
              🌶️ shows each dish’s heat level
            </p>
          </div>
          <p className="mt-3 rounded-xl border border-[#eee2c7] bg-[#fff8ec] px-4 py-3 text-sm leading-6 text-[#72551f]">
            Ingredient and allergen notes are a guide based on typical recipes.
            Please confirm current ingredients and cross-contact with our team
            before ordering.
          </p>

          {filteredItems.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[#25312c]">
                      {menuSections.find((sectionItem) => sectionItem.value === item.section)?.label}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="text-lg font-semibold text-[#202b28]">
                        {item.name}
                      </h2>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          item.dietaryType === "VEG"
                            ? "bg-green-50 text-green-800"
                            : "bg-red-50 text-red-800"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-2 w-2 rounded-full ${
                            item.dietaryType === "VEG" ? "bg-green-600" : "bg-red-600"
                          }`}
                        />
                        {item.dietaryType === "VEG" ? "VEG" : "NON-VEG"}
                      </span>
                    </div>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
                      {item.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-sm text-[#8c6823]">
                      <span className="rounded-full bg-[#faf6ec] px-3 py-1 text-xs font-medium">
                        {spiceLabels[item.spiceLevel]}
                      </span>
                      <span
                        className="text-sm tracking-tight"
                        aria-label={`Hotness: ${spiceLabels[item.spiceLevel]}`}
                        title={`Hotness: ${spiceLabels[item.spiceLevel]}`}
                      >
                        {"🌶️".repeat(item.spiceLevel) || "No chilli"}
                      </span>
                    </div>

                    <details className="mt-4 border-t border-gray-100 pt-3 text-sm">
                      <summary className="cursor-pointer font-semibold text-[#1d2924] marker:text-[#c99a38]">
                        Ingredients & allergen advice
                      </summary>
                      <div className="mt-3 space-y-3 text-gray-600">
                        <div>
                          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Typical ingredients
                          </h3>
                          <p className="mt-1 leading-5">
                            {item.ingredients.join(", ")}.
                          </p>
                        </div>
                        <div className="rounded-xl bg-[#fff8ec] p-3">
                          <h3 className="text-xs font-semibold uppercase tracking-wide text-[#8c6823]">
                            Allergen advice · please confirm
                          </h3>
                          <p className="mt-1 leading-5">{item.allergenAdvice}</p>
                        </div>
                      </div>
                    </details>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-[#e9e3d7] bg-white px-6 py-16 text-center">
              <p className="text-lg font-medium">No matching dishes found</p>
              <p className="mt-2 text-sm text-gray-500">
                Try another search or clear some filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-full bg-[#1d2924] px-5 py-2.5 text-sm text-white"
              >
                Show the full menu
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Menu;
