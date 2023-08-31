import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
          `http://localhost:3000/characters?name=${search}&skip=${skip}&limit=${limit}`
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
            <Link key={character._id} to={`/character/${character._id}`}>
              <h2>{character.name}</h2>
              <p>{character.description}</p>
              <img
                src={
                  character.thumbnail.path + "." + character.thumbnail.extension
                }
                alt={
                  character.thumbnail.path + "." + character.thumbnail.extension
                }
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default Characters;
