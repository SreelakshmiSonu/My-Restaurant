import Navbar from "./Navbar";

function Header() {
 // const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-black/40 text-white shadow-md fixed top-8 left-0 z-40 backdrop-blur-sm">


        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

            {/* Logo */}
            <h1 className="font-logo text-3xl tracking-wide">
            Sree’s Kitchen
            </h1>

            {/* Navbar (desktop only) */}
            <Navbar />

            {/* Cart Icon */}
            {/* <button className="hidden md:block text-2xl">
            🛒
            </button> */} 
        </div>


        {/* Mobile Menu */}
        {/* {open && (
            <div className="md:hidden bg-black px-6 py-4 flex flex-col gap-4 text-lg font-semibold tracking-wide">
            <a href="#home" className="hover:text-yellow-300">HOME</a>
            <a href="#about" className="hover:text-yellow-300">ABOUT US</a>
            <a href="#order" className="hover:text-yellow-300">ORDER ONLINE</a>
            <a href="#menu" className="hover:text-yellow-300">MENU</a>
            <a href="#reservation" className="hover:text-yellow-300">RESERVATION</a>
            <a href="#gallery" className="hover:text-yellow-300">GALLERY</a>
            <a href="#news" className="hover:text-yellow-300">OUR NEWS</a>
            <a href="#contact" className="hover:text-yellow-300">CONTACT US</a>
            </div>
        )} */}
    </header>
  );
}

export default Header;
