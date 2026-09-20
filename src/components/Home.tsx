import Header from "./Header";
import TopHeader from "./TopHeader";
import Slideshow from "./Slideshow";

function Home() {
    return (
      <>
        <TopHeader />
        <Header />
        <Slideshow />
  
        <main className="pt-24 p-6">
          <h2 className="text-3xl font-bold">Welcome to Sree’s Kitchen 🍴</h2>
        </main>
      </>
    );
  }
  
  export default Home;
  