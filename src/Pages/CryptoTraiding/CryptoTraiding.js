import {
  CheckCircle2,
  Play,
  LineChart,
  Target,
  ShieldCheck,
  Brain,
  Lock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import "./CryptoTraiding.scss";
import { NavLink } from "react-router-dom";

const highlights = [
  "Beginner to intermediate friendly",
  "Real strategies, not just theory",
  "Risk management & psychology",
  "Practical examples and case studies",
];

const features = [
  {
    icon: LineChart,
    title: "Market Basics",
    desc: "Understand how the crypto market works and what drives price movements.",
  },
  {
    icon: Target,
    title: "Technical Analysis",
    desc: "Learn to read charts, identify trends, and use indicators effectively.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Management",
    desc: "Protect your capital with smart risk management strategies.",
  },
  {
    icon: Brain,
    title: "Trading Psychology",
    desc: "Build discipline, patience, and the right mindset for long-term success.",
  },
];

const learnColumnOne = [
  "How the crypto market really works",
  "Technical analysis fundamentals",
  "Support & resistance, trend analysis",
  "Risk management & position sizing",
];

const learnColumnTwo = [
  "Trading strategies that work",
  "How to analyze coins and tokens",
  "Common mistakes to avoid",
  "Building a trading plan and routine",
];

const fitFor = [
  "Are new to crypto and want to start trading",
  "Have some experience but lack consistency",
  "Want to build a solid foundation",
  "Are ready to take trading seriously",
];

export const CryptoTrading = () => {
  return (
    <div className="crypto-page">
      <div className="crypto-page__inner">
        <div className="breadcrumb">
          <a href="#">Home</a>
          <ChevronRight size={14} className="sep" />
          <a href="#">Courses</a>
          <ChevronRight size={14} className="sep" />
          <span className="current">Crypto Trading</span>
        </div>

        <div className="hero">
          <div>
            <h1 className="hero__title">Crypto Trading</h1>
            <p className="hero__tagline">
              Learn to trade. Manage risk. Build confidence.
            </p>
            <p className="hero__desc">
              A practical course that teaches you the core skills of crypto
              trading — from understanding the market to making better trading
              decisions.
            </p>

            <div className="checklist">
              {highlights.map((item) => (
                <div className="checklist__item" key={item}>
                  <CheckCircle2 size={18} />
                  {item}
                </div>
              ))}
            </div>

            <div className="purchase">
              <div>
                <div className="purchase__price">₼29</div>
                <div className="purchase__sub">One-time payment</div>
              </div>
              <button className="btn btn--solid">
                Buy Now
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="purchase-note">
              <ShieldCheck size={14} />
              Lifetime access
              <span className="dot">•</span>
              All future updates included
            </div>
          </div>

          <div className="preview-card">
            <img
              className="preview-card__image"
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop"
              alt="Crypto trading dashboard preview"
            />
            <div className="preview-card__overlay" />
            <div className="preview-card__play">
              <Play size={26} fill="currentColor" />
            </div>
            <div className="preview-card__caption">
              <h3>Preview this course</h3>
              <p>Watch a short preview (2:15)</p>
            </div>
          </div>
        </div>

        <div className="features">
          {features.map(({ icon: Icon, title, desc }) => (
            <div className="features__item" key={title}>
              <span className="features__icon">
                <Icon size={20} />
              </span>
              <div className="features__title">{title}</div>
              <p className="features__desc">{desc}</p>
            </div>
          ))}
        </div>

        <div className="learn">
          <div>
            <h2 className="learn__heading">What You'll Learn</h2>
            <div className="learn__columns">
              <div>
                {learnColumnOne.map((item) => (
                  <div className="learn__item" key={item}>
                    <CheckCircle2 size={16} />
                    {item}
                  </div>
                ))}
              </div>
              <div>
                {learnColumnTwo.map((item) => (
                  <div className="learn__item" key={item}>
                    <CheckCircle2 size={16} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fit-box">
            <div className="fit-box__heading">
              This course is for you if you:
            </div>
            {fitFor.map((item) => (
              <div className="fit-box__item" key={item}>
                <ChevronRight size={14} />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="cta-banner">
          <div className="cta-banner__left">
            <span className="cta-banner__icon">
              <Lock size={24} />
            </span>
            <div>
              <div className="cta-banner__title">
                One Payment. Lifetime Access.
              </div>
              <p className="cta-banner__text">
                Get full access to the course and all future updates with a
                single payment.
              </p>
            </div>
          </div>

          <div className="cta-banner__right">
            <div>
              <div className="cta-banner__price">₼29</div>
              <div className="cta-banner__price-sub">One-time payment</div>
            </div>
            <button className="btn btn--solid">
              Buy Now
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTrading;
