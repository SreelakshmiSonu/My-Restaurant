import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "MENU", href: "/menu" },
  { label: "ABOUT US", href: "/about" },
  { label: "GALLERY", href: "/gallery" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="relative font-body tracking-wide" aria-label="Main navigation">
      <div className="hidden items-center gap-8 text-md md:flex">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`group relative transition-colors hover:text-yellow-300 ${
                isActive ? "text-yellow-300" : ""
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-current transition-all ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        className="rounded-lg border border-white/40 px-3 py-2 text-sm font-semibold md:hidden"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute right-0 top-full z-50 mt-3 flex min-w-48 flex-col gap-1 rounded-xl border border-white/10 bg-[#1d2924] p-2 shadow-xl md:hidden"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm transition-colors hover:bg-white/10 hover:text-yellow-300 ${
                  isActive ? "text-yellow-300" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
