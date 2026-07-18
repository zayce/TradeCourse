import {
  Users,
  TrendingUp,
  BookOpen,
  Star,
  MapPin,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import "./Achievements.scss";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Graduates",
    sub: "And growing every month",
  },
  {
    icon: TrendingUp,
    value: "27+",
    label: "Countries",
    sub: "Our students are worldwide",
  },
  {
    icon: BookOpen,
    value: "15+",
    label: "Income Niches",
    sub: "Different ways to earn online",
  },
  {
    icon: Star,
    value: "100%",
    label: "Real Stories",
    sub: "From real QazancLab graduates",
  },
];

const graduates = [
  {
    name: "Ramil H.",
    track: "Crypto Trading",
    city: "Baku, Azerbaijan",
    avatar: "https://i.pravatar.cc/120?img=12",
    income: "2,150",
    time: "4 Months",
    quote:
      "The strategies I learned helped me become consistent. 4 months of focus changed my life.",
  },
  {
    name: "Aygun M.",
    track: "Dropshipping",
    city: "Ganja, Azerbaijan",
    avatar: "https://i.pravatar.cc/120?img=47",
    income: "1,680",
    time: "5 Months",
    quote:
      "From my first store to my first profit in 5 weeks. Now I run multiple stores.",
  },
  {
    name: "Tural S.",
    track: "Freelancing",
    city: "Sumqayit, Azerbaijan",
    avatar: "https://i.pravatar.cc/120?img=33",
    income: "1,250",
    time: "3 Months",
    quote:
      "I started with zero experience. Now I work with clients from all over the world.",
  },
  {
    name: "Elnur V.",
    track: "Crypto Trading",
    city: "Lankaran, Azerbaijan",
    avatar: "https://i.pravatar.cc/120?img=14",
    income: "2,800",
    time: "6 Months",
    quote:
      "It wasn't easy, but the knowledge and community kept me on track. Worth every step.",
  },
  {
    name: "Nigar T.",
    track: "Dropshipping",
    city: "Baku, Azerbaijan",
    avatar: "https://i.pravatar.cc/120?img=45",
    income: "1,950",
    time: "4 Months",
    quote:
      "I'm now financially independent. Dropshipping changed everything for me.",
  },
  {
    name: "Murad K.",
    track: "Freelancing",
    city: "Baku, Azerbaijan",
    avatar: "https://i.pravatar.cc/120?img=51",
    income: "1,400",
    time: "4 Months",
    quote: "Consistency and the right skills made all the difference.",
  },
];

export const Achievements = () => {
  return (
    <div className="achievements">
      <div className="achievements__inner">
        {/* Suda nnado block s Peooplea */}
        <div className="hero">
          <div>
            <h1 className="hero__title">
              Real People.
              <br />
              Real <span className="highlight">Results.</span>
            </h1>
            <div className="hero__text">
              Our graduates come from different backgrounds,
              <br />
              but they all took action and built new income streams.
            </div>
            <div className="hero__note">
              <span className="check">✓</span>
              <div>
                Results take time, consistency and action. These are real
                QazancLab graduates.
              </div>
            </div>
          </div>

          <div className="bars">
            {[
              { bar: "sm", avatar: "sm" },
              { bar: "md", avatar: "md" },
              { bar: "lg", avatar: "lg" },
            ].map((step, i) => (
              <div className="bars__item" key={i}>
                <div className={`bars__avatar bars__avatar--${step.avatar}`}>
                  <Users size={20} />
                </div>
                <div className={`bars__bar bars__bar--${step.bar}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Suda nnado block pod blockom People */}
        <div className="stats">
          {stats.map(({ icon: Icon, value, label, sub }) => (
            <div className="stats__item" key={label}>
              <div className="Stats-icon">
                <span className="stats__icon">
                  <Icon size={18} />
                </span>
                <div>
                  <div className="stats__value">{value}</div>
                  <div className="stats__label">{label}</div>
                </div>
              </div>
              <div className="stats__sub">{sub}</div>
            </div>
          ))}
        </div>

        <div className="section-heading">
          <div className="section-heading__title">Graduate Success Stories</div>
          <div className="section-heading__sub">
            Different journeys. One goal: financial freedom.
          </div>
        </div>

        {/* i block qradeudet cerez map */}
        <div className="graduates">
          {graduates.map((g) => (
            <div className="grad-card" key={g.name}>
              <div className="grad-card__head">
                <img
                  src={g.avatar}
                  alt={g.name}
                  className="grad-card__avatar"
                />
                <div>
                  <div className="grad-card__name">{g.name}</div>
                  <div className="grad-card__track">{g.track}</div>
                  <div className="grad-card__location">
                    <MapPin size={12} />
                    {g.city}
                  </div>
                </div>
              </div>

              <div className="grad-card__metrics">
                <div>
                  <div className="grad-card__metric-label">Monthly Income</div>
                  <div className="grad-card__metric-value">₼{g.income}</div>
                </div>
                <div>
                  <div className="grad-card__metric-label">Time to Result</div>
                  <div className="grad-card__metric-value grad-card__metric-value--accent">
                    {g.time}
                  </div>
                </div>
              </div>

              <p className="grad-card__quote">"{g.quote}"</p>
            </div>
          ))}
        </div>

        <div className="see-more">
          <button className="btn btn--outline">
            See More Stories
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="cta-banner">
          <div className="cta-banner__left">
            <span className="cta-banner__icon">
              <GraduationCap size={26} />
            </span>
            <div>
              <div className="cta-banner__title">Your Story Could Be Next</div>
              <div className="cta-banner__text">
                Join QazancLab today and take the first step toward your own
                success.
              </div>
            </div>
          </div>
          <button className="btn btn--solid">
            Start Your Journey
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
