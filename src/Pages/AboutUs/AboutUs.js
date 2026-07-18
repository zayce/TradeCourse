import { useEffect, useRef, useState } from "react";
import "./AboutUs.scss";

/* ---------- хук для reveal-анимации по скроллу ---------- */
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ---------- хук для анимации счётчика чисел ---------- */
function useCountUp(target, visible, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = null;
    let frame;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [visible, target, duration]);

  return value;
}

/* ---------- данные ---------- */
const BADGES = ["Practical", "Simple", "Effective"];

const FEATURE_CARDS = [
  {
    title: "Practical First",
    text: "We focus on skills that bring real results.",
    icon: "target",
  },
  {
    title: "Fast Learning",
    text: "Short, effective and actionable lessons.",
    icon: "bolt",
  },
  {
    title: "Community",
    text: "Learn together and grow together.",
    icon: "users",
  },
  {
    title: "Lifetime Updates",
    text: "All future updates included for free.",
    icon: "refresh",
  },
];

const JOURNEY = [
  {
    value: 2024,
    suffix: "",
    label: "QazancLab\nFounded",
    icon: "rocket",
    isYear: true,
  },
  { value: 100, suffix: "+", label: "First Students\nJoined", icon: "user" },
  {
    value: 300,
    suffix: "+",
    label: "Active Students\nWorldwide",
    icon: "globe",
  },
  { value: 500, suffix: "+", label: "Graduates\nand Growing", icon: "trophy" },
];

const WHY_LIST = [
  "Real strategies, not just theory",
  "Step-by-step guidance",
  "Support when you need it",
  "Results that speak for themselves",
];

/* ---------- иконки (div + css, без svg/тегов кроме div) ---------- */
function Icon({ name }) {
  return (
    <div className={`icon-glyph icon-glyph--${name}`}>
      <div className="icon-glyph__shape" />
    </div>
  );
}

/* ---------- карточка фичи ---------- */
function FeatureCard({ card, index }) {
  const [ref, visible] = useReveal(0.25);
  return (
    <div
      ref={ref}
      className={`card ${visible ? "card--visible" : ""}`}
      style={{ "--delay": `${index * 0.12}s` }}
    >
      <div className="card__icon">
        <Icon name={card.icon} />
      </div>
      <div className="card__title">{card.title}</div>
      <div className="card__text">{card.text}</div>
    </div>
  );
}

/* ---------- пункт таймлайна ---------- */
function TimelineItem({ item, index }) {
  const [ref, visible] = useReveal(0.35);
  const count = useCountUp(item.value, visible);
  const display = item.isYear ? item.value : count;

  return (
    <div
      ref={ref}
      className={`timeline__item ${visible ? "timeline__item--visible" : ""}`}
      style={{ "--delay": `${index * 0.15}s` }}
    >
      <div className="timeline__dot" />
      <div className="timeline__number">
        {display}
        {item.suffix}
      </div>
      <div className="timeline__label">
        {item.label.split("\n").map((line, i) => (
          <div className="timeline__label-line" key={i}>
            {line}
          </div>
        ))}
      </div>
      <div className="timeline__icon">
        <Icon name={item.icon} />
      </div>
    </div>
  );
}

/* ---------- основной компонент ---------- */
export const AboutUs = () => {
  const [heroRef, heroVisible] = useReveal(0.1);
  const [missionRef, missionVisible] = useReveal(0.2);
  const [whyRef, whyVisible] = useReveal(0.2);
  const [ctaRef, ctaVisible] = useReveal(0.2);

  return (
    <div className="about">
      <div className="about__breadcrumb">
        <div className="about__breadcrumb-link">Home</div>
        <div className="about__breadcrumb-sep">›</div>
        <div className="about__breadcrumb-current">About Us</div>
      </div>

      {/* HERO */}
      <div
        ref={heroRef}
        className={`hero ${heroVisible ? "hero--visible" : ""}`}
      >
        <div className="hero__content">
          <div className="hero__eyebrow">About Us</div>
          <div className="hero__heading">
            We help people build <div className="hero__accent">real income</div>{" "}
            online.
          </div>
          <div className="hero__text">
            QazancLab is an online education platform created to help people
            learn in-demand skills and build sustainable income streams through
            practical, step-by-step courses.
          </div>
          <div className="hero__badges">
            {BADGES.map((badge, i) => (
              <div
                className="badge"
                key={badge}
                style={{ "--delay": `${0.6 + i * 0.15}s` }}
              >
                <div className="badge__dot">
                  <div className="badge__check" />
                </div>
                <div className="badge__label">{badge}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__glow" />
          <div className="hero__bars">
            <div className="hero__bar hero__bar--1" />
            <div className="hero__bar hero__bar--2" />
            <div className="hero__bar hero__bar--3" />
          </div>
          <div className="hero__arrow" />
        </div>
      </div>

      {/* MISSION */}
      <div
        ref={missionRef}
        className={`mission ${missionVisible ? "mission--visible" : ""}`}
      >
        <div className="mission__visual">
          <div className="mission__ring mission__ring--outer" />
          <div className="mission__ring mission__ring--mid" />
          <div className="mission__ring mission__ring--inner" />
          <div className="mission__arrow" />
        </div>
        <div className="mission__content">
          <div className="mission__title">Our Mission</div>
          <div className="mission__text">
            Our mission is to provide high-quality, practical and affordable
            education that helps people achieve financial freedom through
            in-demand online skills.
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div className="cards">
        {FEATURE_CARDS.map((card, i) => (
          <FeatureCard card={card} index={i} key={card.title} />
        ))}
      </div>

      {/* JOURNEY */}
      <div className="journey">
        <div className="journey__title">Our Journey</div>
        <div className="timeline">
          <div className="timeline__line" />
          {JOURNEY.map((item, i) => (
            <TimelineItem item={item} index={i} key={item.label} />
          ))}
        </div>
      </div>

      {/* WHY */}
      <div ref={whyRef} className={`why ${whyVisible ? "why--visible" : ""}`}>
        <div className="why__title">Why QazancLab?</div>
        <div className="why__list">
          {WHY_LIST.map((text, i) => (
            <div
              className="why__item"
              key={text}
              style={{ "--delay": `${i * 0.1}s` }}
            >
              <div className="why__dot">
                <div className="why__check" />
              </div>
              <div className="why__text">{text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div ref={ctaRef} className={`cta ${ctaVisible ? "cta--visible" : ""}`}>
        <div className="cta__box">
          <div className="cta__left">
            <div className="cta__icon">
              <Icon name="users" />
            </div>
            <div className="cta__copy">
              <div className="cta__title">Join Our Growing Community</div>
              <div className="cta__text">
                Be part of hundreds of students who are already building their
                online income streams.
              </div>
            </div>
          </div>
          <div className="cta__button">
            <div className="cta__button-label">Join QazancLab</div>
            <div className="cta__button-arrow">→</div>
          </div>
        </div>
      </div>
    </div>
  );
};
