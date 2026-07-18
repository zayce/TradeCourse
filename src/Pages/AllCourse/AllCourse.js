import { useEffect, useMemo, useRef, useState } from "react";
import "./AllCourse.scss";

/* ---------- хук reveal-по-скроллу (тот же паттерн, что и в AboutUs) ---------- */
function useReveal(threshold = 0.15) {
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

/* ---------- данные (демо, замени на свои) ---------- */
const CATEGORIES = [
  "Все",
  "Маркетинг",
  "Трейдинг",
  "Разработка",
  "Дизайн",
  "Фриланс",
];

const COURSES = [
  {
    id: 1,
    title: "SMM с нуля до первых клиентов",
    category: "Маркетинг",
    level: "Начальный",
    duration: "6 недель",
    students: 214,
    price: "149 AZN",
    oldPrice: "249 AZN",
    rating: 4.9,
    tag: "Хит",
    color: "#7ed321",
  },
  {
    id: 2,
    title: "Трейдинг: основы технического анализа",
    category: "Трейдинг",
    level: "Средний",
    duration: "8 недель",
    students: 132,
    price: "199 AZN",
    oldPrice: null,
    rating: 4.7,
    tag: "Новый",
    color: "#5ad3d3",
  },
  {
    id: 3,
    title: "Frontend-разработка: React с нуля",
    category: "Разработка",
    level: "Начальный",
    duration: "10 недель",
    students: 301,
    price: "249 AZN",
    oldPrice: "329 AZN",
    rating: 5.0,
    tag: "Популярный",
    color: "#7ed321",
  },
  {
    id: 4,
    title: "UI/UX дизайн для начинающих",
    category: "Дизайн",
    level: "Начальный",
    duration: "5 недель",
    students: 178,
    price: "129 AZN",
    oldPrice: null,
    rating: 4.8,
    tag: null,
    color: "#e0a13c",
  },
  {
    id: 5,
    title: "Фриланс: как найти первых клиентов",
    category: "Фриланс",
    level: "Начальный",
    duration: "4 недели",
    students: 256,
    price: "99 AZN",
    oldPrice: "149 AZN",
    rating: 4.9,
    tag: "Хит",
    color: "#7ed321",
  },
  {
    id: 6,
    title: "Таргетированная реклама Instagram/FB",
    category: "Маркетинг",
    level: "Средний",
    duration: "6 недель",
    students: 189,
    price: "179 AZN",
    oldPrice: null,
    rating: 4.6,
    tag: null,
    color: "#5ad3d3",
  },
  {
    id: 7,
    title: "Криптотрейдинг: практический курс",
    category: "Трейдинг",
    level: "Продвинутый",
    duration: "8 недель",
    students: 97,
    price: "229 AZN",
    oldPrice: "299 AZN",
    rating: 4.7,
    tag: "Новый",
    color: "#e0a13c",
  },
  {
    id: 8,
    title: "Backend на Node.js: с нуля до API",
    category: "Разработка",
    level: "Средний",
    duration: "9 недель",
    students: 143,
    price: "259 AZN",
    oldPrice: null,
    rating: 4.8,
    tag: null,
    color: "#7ed321",
  },
];

/* ---------- звёзды рейтинга (только div) ---------- */
function Rating({ value }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="rating">
      {stars.map((s) => (
        <div
          className={`rating__star ${s <= Math.round(value) ? "rating__star--full" : ""}`}
          key={s}
        />
      ))}
      <div className="rating__value">{value.toFixed(1)}</div>
    </div>
  );
}

/* ---------- карточка курса ---------- */
function CourseCard({ course, index }) {
  const [ref, visible] = useReveal(0.2);

  return (
    <div
      ref={ref}
      className={`course-card ${visible ? "course-card--visible" : ""}`}
      style={{ "--delay": `${(index % 4) * 0.1}s`, "--accent": course.color }}
    >
      <div className="course-card__thumb">
        <div className="course-card__thumb-glow" />
        <div className="course-card__thumb-bars">
          <div className="course-card__thumb-bar course-card__thumb-bar--1" />
          <div className="course-card__thumb-bar course-card__thumb-bar--2" />
          <div className="course-card__thumb-bar course-card__thumb-bar--3" />
        </div>
        {course.tag && <div className="course-card__badge">{course.tag}</div>}
      </div>

      <div className="course-card__body">
        <div className="course-card__category">{course.category}</div>
        <div className="course-card__title">{course.title}</div>

        <div className="course-card__meta">
          <div className="course-card__meta-item">{course.level}</div>
          <div className="course-card__meta-dot" />
          <div className="course-card__meta-item">{course.duration}</div>
          <div className="course-card__meta-dot" />
          <div className="course-card__meta-item">
            {course.students} студентов
          </div>
        </div>

        <Rating value={course.rating} />

        <div className="course-card__footer">
          <div className="course-card__price">
            <div className="course-card__price-current">{course.price}</div>
            {course.oldPrice && (
              <div className="course-card__price-old">{course.oldPrice}</div>
            )}
          </div>
          <div className="course-card__button">
            <div className="course-card__button-label">Подробнее</div>
            <div className="course-card__button-arrow">→</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- основной компонент ---------- */
export const CoursesPage = () => {
  const [active, setActive] = useState("Все");
  const [headRef, headVisible] = useReveal(0.1);

  const filtered = useMemo(
    () =>
      active === "Все" ? COURSES : COURSES.filter((c) => c.category === active),
    [active],
  );

  return (
    <div className="courses">
      <div className="courses__breadcrumb">
        <div className="courses__breadcrumb-link">Home</div>
        <div className="courses__breadcrumb-sep">›</div>
        <div className="courses__breadcrumb-current">Courses</div>
      </div>

      {/* HEAD */}
      <div
        ref={headRef}
        className={`courses__head ${headVisible ? "courses__head--visible" : ""}`}
      >
        <div className="courses__eyebrow">Наши курсы</div>
        <div className="courses__title">
          Все курсы <div className="courses__title-accent">в одном месте</div>
        </div>
        <div className="courses__text">
          Выбери направление, которое интересно именно тебе, и начни строить
          свой доход уже сегодня.
        </div>
      </div>

      {/* FILTERS */}
      <div className="courses__filters">
        {CATEGORIES.map((cat) => (
          <div
            key={cat}
            className={`filter-pill ${active === cat ? "filter-pill--active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* GRID */}
      <div className="courses__grid">
        {filtered.map((course, i) => (
          <CourseCard course={course} index={i} key={course.id} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="courses__empty">Курсов в этой категории пока нет.</div>
      )}
    </div>
  );
};
