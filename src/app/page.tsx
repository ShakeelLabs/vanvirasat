"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Check,
  Compass,
  Leaf,
  MapPin,
  Users,
  X,
} from "lucide-react";

const experiences = [
  {
    id: "mahi",
    category: "Nature & slow travel",
    title: "The Mahi River Escape",
    duration: "2 days · 1 night",
    description:
      "A slower journey through river landscapes, quiet viewpoints and the green countryside around Dungarpur.",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=85",
    alt: "Open green landscape with hills under a wide sky",
  },
  {
    id: "culture",
    category: "Culture & community",
    title: "Living Heritage Trail",
    duration: "1 day · guided",
    description:
      "Meet local hosts, discover regional food and crafts, and learn about community traditions with respect.",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1100&q=85",
    alt: "Warm-toned rural landscape and trees",
  },
  {
    id: "weekend",
    category: "A complete local journey",
    title: "Dungarpur Weekend",
    duration: "3 days · 2 nights",
    description:
      "A considered first visit combining heritage, village surroundings, local cuisine and time in nature.",
    price: 5999,
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1100&q=85",
    alt: "Mountain valley and winding landscape",
  },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function Home() {
  const [destination, setDestination] = useState("Dungarpur, Rajasthan");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [selectedExperience, setSelectedExperience] = useState("weekend");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");

  const experience = useMemo(
    () => experiences.find((item) => item.id === selectedExperience) ?? experiences[0],
    [selectedExperience],
  );

  function startBooking(experienceId?: string) {
    if (experienceId) setSelectedExperience(experienceId);
    setBookingMessage("");
    setBookingOpen(true);
    window.setTimeout(() => {
      document.getElementById("booking-dialog")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 0);
  }

  function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    if (!name || !email || !phone || !date) {
      setBookingMessage("Please complete your name, email, phone and preferred date.");
      return;
    }
    const summary = [
      "VanVirasat trip inquiry",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Experience: ${experience.title}`,
      `Destination: ${destination}`,
      `Preferred date: ${date}`,
      `Travelers: ${travelers}`,
      `Indicative starting price: ${money(experience.price)} per person`,
    ].join("\n");
    const subject = encodeURIComponent("VanVirasat trip inquiry");
    const body = encodeURIComponent(summary);
    setBookingMessage(
      "Your inquiry is ready. Your email app will open so you can send it to the agency. This is an inquiry only, not a confirmed booking or payment.",
    );
    window.location.href = `mailto:hello@vanvirasat.in?subject=${subject}&body=${body}`;
  }

  return (
    <main className="site-shell">
      <div className="topline">
        <div className="container topline-inner">
          <span>MEANINGFUL JOURNEYS · LOCAL CONNECTIONS</span>
          <span>DUNGARPUR, RAJASTHAN · INDIA</span>
        </div>
      </div>

      <header className="container nav">
        <a className="brand" href="#home" aria-label="VanVirasat home">
          <span className="brand-mark"><Leaf size={21} strokeWidth={1.6} /></span>
          <span>VanVirasat</span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#journeys">Journeys</a>
          <a href="#our-story">Our approach</a>
          <a href="#why-us">Why VanVirasat</a>
        </nav>
        <a className="btn btn-primary" href="#journeys">
          Explore journeys <ArrowRight size={15} />
        </a>
      </header>

      <section className="hero" id="home">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=2200&q=90"
          alt="Golden light over a green natural landscape"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="eyebrow">Beyond the familiar</div>
          <h1>Come for the land.<br />Leave with a <em>connection.</em></h1>
          <p className="hero-copy">
            Discover the living heritage of Dungarpur and southern Rajasthan —
            with thoughtful local journeys, community connections and room to
            experience a place at its own pace.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#journeys">
              Find your journey <ArrowRight size={16} />
            </a>
            <a className="btn btn-light" href="#our-story">
              Our approach <ArrowDownRight size={16} />
            </a>
          </div>
          <div className="hero-note">
            <span><MapPin size={14} /> Dungarpur, Rajasthan</span>
            <span><Leaf size={14} /> Local-led experiences</span>
            <span><Compass size={14} /> Travel with purpose</span>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="booking-panel" aria-labelledby="plan-title">
          <div className="booking-heading">
            <div>
              <div className="kicker">Your next meaningful trip</div>
              <h2 id="plan-title">Start planning your journey</h2>
            </div>
            <span style={{ color: "var(--muted)", fontSize: 11 }}>
              Plan now · Confirm details with us
            </span>
          </div>
          <form
            className="booking-fields"
            onSubmit={(event) => {
              event.preventDefault();
              startBooking();
            }}
          >
            <div className="field">
              <label htmlFor="quick-destination">Where to?</label>
              <select
                id="quick-destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              >
                <option>Dungarpur, Rajasthan</option>
                <option>Banswara, Rajasthan</option>
                <option>Southern Rajasthan</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="quick-date">Travel date</label>
              <input
                id="quick-date"
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="quick-experience">Journey</label>
              <select
                id="quick-experience"
                value={selectedExperience}
                onChange={(event) => setSelectedExperience(event.target.value)}
              >
                {experiences.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="quick-travelers">Travelers</label>
              <select
                id="quick-travelers"
                value={travelers}
                onChange={(event) => setTravelers(event.target.value)}
              >
                {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => (
                  <option key={count} value={String(count)}>{count} {count === 1 ? "person" : "people"}</option>
                ))}
                <option value="13+">13+ people</option>
              </select>
            </div>
            <button className="btn btn-primary" type="submit">
              Plan a trip <ArrowRight size={15} />
            </button>
          </form>
          <div className="notice">
            Package prices shown on this preview are illustrative starting prices, not confirmed live rates.
            Availability, inclusions and final quotes will be confirmed by the VanVirasat team.
          </div>
        </section>
      </div>

      <section className="section" id="journeys">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Thoughtfully put together</div>
              <h2>Find a journey that<br />feels like yours.</h2>
              <p className="section-intro">
                From a quiet weekend outdoors to a deeper cultural introduction,
                start with a small group, a local perspective and a little curiosity.
              </p>
            </div>
            <a className="text-link" href="#our-story">How we travel <ArrowRight size={15} /></a>
          </div>
          <div className="packages">
            {experiences.map((item) => (
              <article className="package-card" key={item.id}>
                <img className="package-photo" src={item.image} alt={item.alt} loading="lazy" />
                <div className="package-content">
                  <div className="package-meta">
                    <span>{item.category}</span>
                    <span>{item.duration}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="package-bottom">
                    <div className="price">Starting from <strong>{money(item.price)} <span style={{ fontSize: 11, fontWeight: 400 }}> / person</span></strong></div>
                    <button className="text-link" type="button" onClick={() => startBooking(item.id)}>
                      Enquire <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-sand" id="our-story">
        <div className="container story-grid">
          <div className="story-image-wrap">
            <img
              className="story-image"
              src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85"
              alt="A broad view across a rural landscape"
              loading="lazy"
            />
            <div className="story-stamp">A place is best known through its people.<span>Our belief</span></div>
          </div>
          <div className="story-copy">
            <div className="kicker">Our approach</div>
            <h2>Not just a destination.<br />A place to understand.</h2>
            <p>
              VanVirasat is being built around a simple idea: travel can create
              meaningful connections between visitors and the communities that
              make a place special. We start in Dungarpur, in Rajasthan&apos;s
              southern landscape, and build journeys around local knowledge,
              heritage and nature.
            </p>
            <p>
              We aim to work with local guides, hosts and craftspeople, with
              consent, fair compensation and respect for community priorities.
              Experiences and partners will be listed only as arrangements are verified.
            </p>
            <div className="story-points">
              <div className="story-point"><strong>Local perspectives</strong>Learn from people who know the place.</div>
              <div className="story-point"><strong>Considered travel</strong>Small, thoughtful experiences over checklists.</div>
              <div className="story-point"><strong>Respect first</strong>Community consent and cultural sensitivity.</div>
              <div className="story-point"><strong>Clear expectations</strong>Transparent inclusions and trip details.</div>
            </div>
            <a className="btn btn-primary" href="#why-us">What guides us <ArrowRight size={15} /></a>
          </div>
        </div>
      </section>

      <section className="section" id="why-us">
        <div className="container">
          <div className="kicker">The VanVirasat difference</div>
          <h2>A better way to meet a place.</h2>
          <p className="section-intro" style={{ marginBottom: 34 }}>
            Our standards are part of the journey — from the first conversation
            to the way we work with local partners.
          </p>
          <div className="values-grid">
            <article className="value-card">
              <span className="value-number">01 / LOCAL</span>
              <h3>Rooted here</h3>
              <p>Journeys shaped around regional knowledge, local hosts and the distinct character of southern Rajasthan.</p>
            </article>
            <article className="value-card">
              <span className="value-number">02 / RESPECT</span>
              <h3>People before pictures</h3>
              <p>We ask permission, respect privacy and cultural boundaries, and never treat people as a tourist attraction.</p>
            </article>
            <article className="value-card">
              <span className="value-number">03 / CLARITY</span>
              <h3>Know what to expect</h3>
              <p>Clear itineraries, honest inclusions, transparent pricing and practical information before you travel.</p>
            </article>
            <article className="value-card">
              <span className="value-number">04 / CARE</span>
              <h3>Travel with care</h3>
              <p>Responsible group sizes, safe planning and respect for the landscapes and communities we visit.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 90 }}>
        <div className="cta-band">
          <div>
            <div className="kicker" style={{ color: "#e8bc7e" }}>Start a conversation</div>
            <h2>Your first journey into southern Rajasthan starts here.</h2>
            <p>Tell us what you enjoy, when you plan to visit and who is travelling with you. We&apos;ll help you explore the options.</p>
          </div>
          <button className="btn btn-light" type="button" onClick={() => startBooking()}>
            Plan with us <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a className="brand" href="#home"><span className="brand-mark"><Leaf size={21} /></span><span>VanVirasat</span></a>
              <p>Discover tribal India. Experience living heritage. Thoughtful journeys beginning in Dungarpur, Rajasthan.</p>
            </div>
            <div>
              <h4>Explore</h4>
              <div className="footer-links">
                <a href="#journeys">Our journeys</a>
                <a href="#our-story">Our approach</a>
                <a href="#why-us">Responsible travel</a>
              </div>
            </div>
            <div>
              <h4>Get in touch</h4>
              <div className="footer-links">
                <span>Dungarpur, Rajasthan, India</span>
                <a href="mailto:hello@vanvirasat.in">hello@vanvirasat.in</a>
                <span>Visits by prior arrangement</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} VanVirasat. All rights reserved.</span>
            <span>Travel thoughtfully. Leave a positive footprint.</span>
          </div>
        </div>
      </footer>

      <div className="mobile-booking-bar" aria-label="Quick trip booking">
        <div className="mobile-booking-copy">
          <span>Planning a visit?</span>
          <strong>Make it a local journey.</strong>
        </div>
        <button className="btn btn-primary" type="button" onClick={() => startBooking()}>
          Plan your trip <ArrowRight size={16} />
        </button>
      </div>

      {bookingOpen && (
        <div
          className="dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setBookingOpen(false);
          }}
        >
          <section
            className="booking-dialog"
            id="booking-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
          >
            <div className="dialog-top">
              <div>
                <div className="kicker">Start with an inquiry</div>
                <h2 id="booking-title">Plan your VanVirasat journey</h2>
              </div>
              <button className="icon-button" onClick={() => setBookingOpen(false)} aria-label="Close booking form" type="button">
                <X size={19} />
              </button>
            </div>
            <div className="dialog-summary">
              <span><MapPin size={15} /> {destination}</span>
              <span><CalendarDays size={15} /> {date || "Date to be decided"}</span>
              <span><Users size={15} /> {travelers} traveler{travelers === "1" ? "" : "s"}</span>
            </div>
            <div className="selected-trip">
              <div>
                <strong>{experience.title}</strong>
                <span>{experience.duration} · illustrative starting price {money(experience.price)} / person</span>
              </div>
              <span className="selected-check"><Check size={15} /></span>
            </div>
            <form className="inquiry-form" onSubmit={submitInquiry}>
              <div className="field">
                <label htmlFor="customer-name">Your name</label>
                <input id="customer-name" name="name" autoComplete="name" placeholder="Full name" required />
              </div>
              <div className="field">
                <label htmlFor="customer-email">Email address</label>
                <input id="customer-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </div>
              <div className="field">
                <label htmlFor="customer-phone">Phone number</label>
                <input id="customer-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91" inputMode="tel" required />
              </div>
              <div className="field">
                <label htmlFor="dialog-date">Preferred travel date</label>
                <input
                  id="dialog-date"
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="dialog-travelers">Number of travelers</label>
                <select id="dialog-travelers" value={travelers} onChange={(event) => setTravelers(event.target.value)}>
                  {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => (
                    <option key={count} value={String(count)}>{count} {count === 1 ? "traveler" : "travelers"}</option>
                  ))}
                  <option value="13+">13+ travelers</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="dialog-destination">Preferred destination</label>
                <select id="dialog-destination" value={destination} onChange={(event) => setDestination(event.target.value)}>
                  <option>Dungarpur, Rajasthan</option>
                  <option>Banswara, Rajasthan</option>
                  <option>Southern Rajasthan</option>
                </select>
              </div>
              <button className="btn btn-primary" style={{ width: "100%", marginTop: 7 }} type="submit">
                Open email to send inquiry <ArrowRight size={16} />
              </button>
              <p className="form-disclaimer">
                This demo collects no data on a server and does not take payments. Sending an inquiry opens your email app. A booking is confirmed only after availability, final pricing and terms have been agreed.
              </p>
              {bookingMessage && <p className="form-message" role="status">{bookingMessage}</p>}
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
