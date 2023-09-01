import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

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

  const favoriteTab = [];
  const favoriteClick = (character_id) => {
    favoriteTab.push(character_id);
    Cookies.set("favorites", favoriteTab, { expires: 365 });
    // console.log(favoriteTab);
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="classic-container">
      <section className="classic-first-section">
        <h1>Maracters</h1>
        <div>
          <input
            type="text"
            value={search}
            placeholder="Search a Maracters"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        <div className="pagination-buttons">
          <button onClick={handlePreviousPage}>Previous</button>
          <button onClick={handleNextPage}>Next</button>
        </div>
      </section>
      <section className="classic-second-section">
        {data.results.map((character) => {
          return (
            <div key={character._id}>
              <Link to={`/character/${character._id}`}>
                <h2>{character.name}</h2>
                <p>{character.description}</p>
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
              </Link>
              <button
                onClick={() => favoriteClick(character._id)}

                // onClick={() => {
                //   Cookies.set(character.name, character._id, { expires: 365 });
                // }}
              >
                Favoris
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Characters;
