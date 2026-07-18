import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Header } from "./Components/Header";
import { Achievements } from "./Pages/Home/Achivements/Achievements";
import { CryptoTrading } from "./Pages/CryptoTraiding/CryptoTraiding";
import { AboutUs } from "./Pages/AboutUs/AboutUs";
import { CoursesPage } from "./Pages/AllCourse/AllCourse";
import { AuthPage } from "./Components/Login/Authpage";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App-Wrapper">
        <Header />

        <Routes>
          {/* Здесь буuдут твои страницы */}
          <Route path="/" element={<Home />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/cryptotrading" element={<CryptoTrading />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/login" element={<AuthPage />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
