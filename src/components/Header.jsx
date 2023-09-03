import Marvel_Logo from "../assets/Marvel_Logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <img src={Marvel_Logo} alt="logo" />
        {/* <div>
          <input
            type="text"
            value={search}
            placeholder="Search bar"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div> */}
        <div>
          <Link className="header-button" to="/">
            Characters
          </Link>
          <Link className="header-button" to="/comics">
            Comics
          </Link>
          <Link className="header-button" to="/favorites">
            Favorites
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
