import type { FormEvent } from "react";
import Header from "./Header";
import TopHeader from "./TopHeader";

const contactEmail = "sreelakshmisonu92@gmail.com";
const contactPhone = "+447776607568";
const displayPhone = "+44 7776607568";

export default function ContactUs() {
  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const subject = String(formData.get("subject") ?? "Website enquiry");
    const message = String(formData.get("message") ?? "");
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    window.location.href =
      `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <TopHeader />
      <Header />

      <main className="min-h-screen bg-[#faf9f6] pb-16 pt-28 text-[#202b28] sm:pt-32">
        <section className="bg-[#1d2924] px-5 py-16 text-center text-white sm:py-20">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#e6bd61]">
            We’d love to hear from you
          </p>
          <h1 className="font-logo text-4xl font-semibold tracking-tight sm:text-6xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
            Questions about the menu, a booking, or a special occasion? Get in
            touch with Sree’s Kitchen.
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="space-y-5">
            <article className="rounded-2xl border border-[#e9e3d7] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Email</h2>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-2 inline-block text-sm text-[#8c6823] underline-offset-4 hover:underline"
              >
                {contactEmail}
              </a>
            </article>

            <article className="rounded-2xl border border-[#e9e3d7] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Call us</h2>
              <a
                href={`tel:${contactPhone}`}
                className="mt-2 inline-block text-sm text-[#8c6823] underline-offset-4 hover:underline"
              >
                {displayPhone}
              </a>
            </article>

            <article className="rounded-2xl border border-[#e9e3d7] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Find us</h2>
              <p className="mt-2 text-sm text-gray-600">Nottingham, UK</p>
              <a
                href="https://maps.google.com/?q=Nottingham%2C+UK"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-medium text-[#8c6823] underline-offset-4 hover:underline"
              >
                Open map ↗
              </a>
            </article>
          </div>

          <form
            onSubmit={sendMessage}
            className="rounded-2xl border border-[#e9e3d7] bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-semibold">Send us a message</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Your email app will open with your message ready to send.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Your name</span>
                <input
                  name="name"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#c99a38]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Your email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#c99a38]"
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-medium">Subject</span>
              <input
                name="subject"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#c99a38]"
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-medium">Message</span>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#c99a38]"
              />
            </label>

            <button
              type="submit"
              className="mt-5 rounded-full bg-[#c99a38] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ae812b]"
            >
              Continue to email
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
