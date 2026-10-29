import { Link } from "react-router-dom";
import { galleryImages } from "./galleryData";

const getDishImage = (id: string) =>
  galleryImages.find((image) => image.id === id)?.imageUrl ?? "";

const slides = [
  {
    title: "Palada Payasam",
    subtitle: "A creamy Kerala classic, made for a sweet finish.",
    image: getDishImage("7"),
    alt: "Traditional palada payasam garnished with cashews",
  },
  {
    title: "Appam & Fish Molly",
    subtitle: "Soft, lacy appam with mild fish stew in coconut milk.",
    image:
      "https://i0.wp.com/www.pepperdelight.com/wp-content/uploads/2018/03/pepper-delight-fish-molly-3.jpg?resize=1899%2C2896",
    alt: "Kerala fish molly served with appam",
  },
  {
    title: "Karimeen Pollichathu",
    subtitle: "Pearl spot fish wrapped in banana leaf with Kerala spices.",
    image: getDishImage("5"),
    alt: "Kerala pearl spot fish roasted in a banana leaf",
  },
  {
    title: "Unniyappam",
    subtitle: "Little rice and jaggery fritters with banana and cardamom.",
    image: getDishImage("17"),
    alt: "Golden Kerala unniyappam fritters",
  },
];

function Slideshow() {
  const duration = slides.length * 5;

  return (
    <section className="slideshow" aria-label="Featured Kerala dishes">
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className="slide"
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
          style={{
            backgroundImage: `linear-gradient(90deg, rgb(13 21 18 / 78%), rgb(13 21 18 / 18%)), url("${slide.image}")`,
            animationDuration: `${duration}s`,
            animationDelay: `${index * 5}s`,
          }}
        >
          <div className="slide-content">
            <p className="slide-eyebrow">Sree’s Kitchen · Kerala cuisine</p>
            <h2>{slide.title}</h2>
            <p className="slide-description">{slide.subtitle}</p>
            <div className="slide-actions">
              <Link to="/menu" className="slide-primary-link">
                Explore our menu
              </Link>
              <Link to="/gallery" className="slide-secondary-link">
                See the gallery
              </Link>
            </div>
            <span className="sr-only">{slide.alt}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Slideshow;
