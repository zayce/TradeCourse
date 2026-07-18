import "../Home/Home.scss";
import { FiArrowRight, FiCheckCircle, FiCheck } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import {
  PiShoppingCartLight,
  PiCurrencyBtcLight,
  PiLaptopLight,
} from "react-icons/pi";
import Block from "./Block.png";
import { LuTarget, LuFlag } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const courses = [
  {
    icon: <PiShoppingCartLight />,
    title: "Dropshipping",
    desc: "Launch an online store without holding inventory.",
  },
  {
    icon: <PiCurrencyBtcLight />,
    title: "Crypto Trading",
    desc: "Learn market analysis, risk management and trading fundamentals.",
  },
  {
    icon: <PiLaptopLight />,
    title: "Freelancing",
    desc: "Find clients and monetize your digital skills.",
  },
];

const whyUs = [
  {
    icon: <LuTarget />,
    title: "Practical First",
    desc: "No unnecessary theory.",
  },
  {
    icon: <FiUser />,
    title: "Beginner Friendly",
    desc: "Start from zero experience.",
  },
  {
    icon: <BsWallet2 />,
    title: "Affordable Access",
    desc: "One payment, all materials included.",
  },
  {
    icon: <LuFlag />,
    title: "Built for Azerbaijan",
    desc: "Localized examples and explanations.",
  },
];

const stats = [
  { value: "3+", label: "Courses" },
  { value: "20+", label: "Lessons" },
  { value: "Lifetime", label: "Access" },
  { value: "₼49", label: "One-Time Payment" },
];

const pricingFeatures = [
  "All current courses",
  "Future updates",
  "Community access",
  "Lifetime access",
];

export const Home = () => {
  return (
    <>
      <div className="Wrapper-Home">
        <div className="Inner-Home">
          <div className="Home-Desc-Banner">
            <div className="Home-Desc-Banner-Info">
              <div className="Home-Desc-Banner-Info-Title">
                Learn Modern Online Income <span className="Span">Skills</span>
              </div>
              <div className="Home-Desc-Banner-Info-Opis">
                Practical courses on Dropshipping, Crypto Trading and more
                digital income opportunities — designed for Azerbaijan.
              </div>
              <div className="Home-Desc-Banner-Info-Buttons">
                <button className="Home-Desc-Banner-Info-Buttons-Primary">
                  Explore Courses
                  <FiArrowRight />
                </button>
                {/* <button className="Home-Desc-Banner-Info-Buttons-Secondary">
                  Watch Preview
                  <FaPlay />
                </button> */}
              </div>
              <div className="Home-Desc-Banner-Info-Links">
                <div>
                  <FiCheckCircle />
                  Affordable access
                </div>
                <div>
                  <FiCheckCircle />
                  Lifetime access
                </div>
                <div>
                  <FiCheckCircle />
                  Azerbaijani community
                </div>
              </div>
            </div>

            {/* preview video block */}

            <div className="Home-Desc-Banner-Image">
              <img src={Block} alt="QazancLab" />
            </div>
          </div>

          <div className="Home-OurCourses-Block">
            <div className="Home-OurCourses-Block-Header">
              <div className="Home-OurCourses-Block-Header-Title">
                Our Courses
              </div>
              <div className="Home-OurCourses-Block-Header-Opis">
                Step-by-step knowledge. Real skills. Practical results.
              </div>
            </div>

            <div className="Home-OurCourses-Block-List">
              {courses.map((course, index) => (
                <NavLink to={"/cryptotrading"}>
                  <div className="Home-OurCourses-Block-List-Item" key={index}>
                    <div className="Home-OurCourses-Block-List-Item-Icon">
                      {course.icon}
                    </div>
                    <div className="Home-OurCourses-Block-List-Item-Title">
                      {course.title}
                    </div>
                    <div className="Home-OurCourses-Block-List-Item-Opis">
                      {course.desc}
                    </div>
                    <button className="Home-OurCourses-Block-List-Item-Link">
                      Learn More
                      <FiArrowRight />
                    </button>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          {/* <div className="Home-WhyUs-Block">
            <div className="Home-WhyUs-Block-Title">Why QazancLab?</div>
            <div className="Home-WhyUs-Block-List">
              {whyUs.map((item, index) => (
                <div className="Home-WhyUs-Block-List-Item" key={index}>
                  <div className="Home-WhyUs-Block-List-Item-Icon">
                    {item.icon}
                  </div>
                  <div className="Home-WhyUs-Block-List-Item-Title">
                    {item.title}
                  </div>
                  <div className="Home-WhyUs-Block-List-Item-Opis">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* <div className="Home-Info-Block">
            <div className="Home-Info-Block-List">
              {stats.map((stat, index) => (
                <div className="Home-Info-Block-List-Item" key={index}>
                  <div className="Home-Info-Block-List-Item-Value">
                    {stat.value}
                  </div>
                  <div className="Home-Info-Block-List-Item-Label">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          <div className="Home-LearnAbout-Block">
            <div className="Home-LearnAbout-Block-Info">
              <div className="Home-LearnAbout-Block-Info-Eyebrow">
                Get to Know QazancLab
              </div>
              <div className="Home-LearnAbout-Block-Info-Title">
                See What You&apos;ll Learn Before Joining
              </div>
              <div className="Home-LearnAbout-Block-Info-Opis">
                Watch this short introduction to learn more about who we are,
                what you&apos;ll learn and who these courses are for.
              </div>
              <button className="Home-LearnAbout-Block-Info-Button">
                Watch Preview
                <FaPlay />
              </button>
            </div>
            <div className="Home-LearnAbout-Block-Video">
              <img src="/video-preview.jpg" alt="QazancLab Founder" />
              <button className="Home-LearnAbout-Block-Video-Play">
                <FaPlay />
              </button>
              <div className="Home-LearnAbout-Block-Video-Caption">
                <div className="Home-LearnAbout-Block-Video-Caption-Name">
                  QazancLab
                </div>
                <div className="Home-LearnAbout-Block-Video-Caption-Role">
                  Founder
                </div>
              </div>
            </div>
          </div>

          <div className="Home-CoursePaket-Block">
            <div className="Home-CoursePaket-Block-Header">
              <div className="Home-CoursePaket-Block-Header-Title">
                Simple Pricing
              </div>
              <div className="Home-CoursePaket-Block-Header-Opis">
                One simple payment. Lifetime value.
              </div>
            </div>
            <div className="Home-CoursePaket-Block-Card">
              <div className="Home-CoursePaket-Block-Card-Label">
                Full Access
              </div>
              <div className="Home-CoursePaket-Block-Card-Price">₼49</div>
              <div className="Home-CoursePaket-Block-Card-Features">
                {pricingFeatures.map((feature, index) => (
                  <div
                    className="Home-CoursePaket-Block-Card-Features-Item"
                    key={index}
                  >
                    <FiCheck />
                    {feature}
                  </div>
                ))}
              </div>
              <button className="Home-CoursePaket-Block-Card-Button">
                Get Access
              </button>
            </div>
          </div>

          {/* <div className="Home-Join-Block">
            <div className="Home-Join-Block-Title">
              Start Building Skills That Can Create New Income Opportunities
            </div>
            <div className="Home-Join-Block-Opis">
              Invest once. Learn at your own pace.
              <br />
              Apply the knowledge whenever you&apos;re ready.
            </div>
            <button className="Home-Join-Block-Button">
              Join QazancLab
              <FiArrowRight />
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};
