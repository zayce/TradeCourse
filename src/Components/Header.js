import "./Header.scss";
import { NavLink } from "react-router-dom";
export const Header = () => {
  return (
    <>
      <div className="Wrapper-Header">
        <div className="Inner-Header">
          <div className="Inner-Header-Logo"></div>
          <ul className="Inner-Header-Menu">
            <NavLink to="/">
              <li className="Inner-Header-Menu-items">Home</li>
            </NavLink>
            <NavLink to="/about">
              <li className="Inner-Header-Menu-items">About</li>
            </NavLink>
            <NavLink to="/courses">
              <li className="Inner-Header-Menu-items">Courses</li>
            </NavLink>
            <li className="Inner-Header-Menu-items">Contact</li>
            <li className="Inner-Header-Menu-items">Blog</li>
            <NavLink to="/achievements">
              <li className="Inner-Header-Menu-items">Achievements</li>
            </NavLink>
          </ul>

          <NavLink to="/login">
            <button className="Inner-Header-Button">Login/Sign Up </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
