import Header from "./Header";
import TopHeader from "./TopHeader";

export default function AboutUs() {
    
  
    return (
        <>
        <TopHeader />
        <Header />

        <div>
            <img className="w-full h-[45vh] object-cover"
                src="/images/platter.jpg"
                alt="Platter"
                
            />
        </div>

      <main className="mx-auto max-w-5xl px-5 py-12 text-gray-800">
        <section className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            About Us
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Welcome to our restaurant, where great food and exceptional service
            come together to create memorable dining experiences.
          </p>
        </section>
  
        <section className="mx-auto mb-12 max-w-2xl text-base leading-relaxed md:text-lg">
          <p>
            We are passionate about serving freshly prepared dishes made with
            quality ingredients, offering a menu that brings together traditional
            flavours and modern tastes. Whether you're joining us for a family
            meal, a quick lunch, or a special celebration, our goal is to make
            every visit enjoyable and unforgettable.
          </p>
        </section>
  
        {/* <section
          aria-label="What we stand for"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {values.map(({ title, text }) => (
            <article
              key={title}
              className="rounded-xl bg-amber-50 p-6 shadow-sm transition hover:shadow-md"
            >
              <h2 className="mb-2 text-lg font-semibold">{title}</h2>
              <p className="text-gray-600">{text}</p>
            </article>
          ))}
        </section> */}
      </main>
      </>
    );
  }