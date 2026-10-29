import { Link } from "react-router-dom";
import Header from "./Header";
import TopHeader from "./TopHeader";
import Slideshow from "./Slideshow";

function Home() {
  return (
    <>
      <TopHeader />
      <Header />
      <Slideshow />

      <main className="bg-[#faf9f6] px-5 py-16 text-[#202b28] sm:py-20">
        <section className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a77b25]">
            Welcome to Sree’s Kitchen
          </p>
          <h1 className="mt-3 font-logo text-3xl font-bold sm:text-5xl">
            A little taste of Kerala in Nottingham
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Gather over Kerala favourites, comforting Indian classics and warm,
            homestyle hospitality. We look forward to welcoming you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/menu"
              className="rounded-full bg-[#1d2924] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#34463e]"
            >
              Browse the menu
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-[#1d2924]/25 px-6 py-3 text-sm font-semibold text-[#1d2924] transition hover:border-[#c99a38] hover:text-[#8c6823]"
            >
              About our kitchen
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
