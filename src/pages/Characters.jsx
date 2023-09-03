import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Captain from "../assets/Captain.png";

const Characters = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);

  //Fetch all characters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--zqz8bqcfkwlv.code.run/characters?name=${search}&skip=${skip}&limit=${limit}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [search, skip, limit]);

  //Pagination
  const handlePreviousPage = () => {
    if (skip >= limit) {
      setSkip(skip - limit);
    }
  };
  const handleNextPage = () => {
    setSkip(skip + limit);
  };

  const favoriteClick = (character_id) => {
    const existingFavorites = Cookies.get("favorites");
    const favoriteTab = existingFavorites ? JSON.parse(existingFavorites) : [];
    favoriteTab.push(character_id);
    Cookies.set("favorites", JSON.stringify(favoriteTab), { expires: 365 });
    // console.log(favoriteTab);
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="classic-container">
      <section className="classic-first-section">
        <h1>Maracters</h1>
        <div className="classic-search">
          <label>
            <span>Characters </span> search bar
          </label>
          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        <div className="pagination-buttons">
          <button onClick={handlePreviousPage}>
            <FontAwesomeIcon icon="fa-caret-left" />
          </button>
          <button onClick={handleNextPage}>
            <FontAwesomeIcon icon="fa-caret-right" />
          </button>
        </div>
      </section>
      <section
        className="classic-second-section"
        // style={{
        //   backgroundImage: `url(${Captain})`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        // }}
      >
        {data.results.map((character) => {
          return (
            <div className="card" key={character._id}>
              <Link
                to={`/character/${character._id}`}
                style={{ textDecoration: "none" }}
              >
                <h3>{character.name}</h3>
                <img
                  src={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                  alt={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                />
                <div>
                  {character.description ? (
                    <p>{character.description}</p>
                  ) : (
                    <p>Description will come soon...</p>
                  )}
                </div>
              </Link>
              <button
                title="Add it to your favorites"
                onClick={() => favoriteClick(character._id)}
              >
                <FontAwesomeIcon icon="fa-star" />
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Characters;
