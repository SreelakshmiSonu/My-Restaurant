import { Link } from "react-router-dom";


type NavItem = {
    label : string;
    href : string;
}

const NavItems : NavItem[] = [
    {label : "HOME", href : "/"},
    { label : "ABOUT US", href : "/about"},
    // { label: "ORDER ONLINE", href: "/order" },
    // { label: "MENU", href: "/menu" },
    // { label: "RESERVATION", href: "/reservation" },
    { label: "GALLERY", href: "/gallery" },
    // { label: "OUR NEWS", href: "/news" },
    // { label: "CONTACT US", href: "/contact" },
];

function Navbar () {
    return (
        <nav className="hidden md:flex gap-8 font-body text-md tracking-wide">
            {NavItems.map((item) => (
                <Link
                key={item.label}
                to={item.href}
                className="hover:text-yellow-300 relative group transition-colors"
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white group-hover:w-full transition-all"></span>
              </Link>
            ))}
        </nav>
    )
}

export default Navbar;