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
          <Link to="/">Characters</Link>
          <Link to="/comics">Comics</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>
      ;
    </header>
  );
};
export default Header;
