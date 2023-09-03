import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--zqz8bqcfkwlv.code.run/comics?title=${search}&skip=${skip}&limit=${limit}`
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
        <h1>Comics</h1>
        <div className="classic-search">
          <label>
            <span>Comics </span> search bar
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
      <section className="classic-second-section">
        {data.results.map((comic) => {
          return (
            <div className="card" key={comic._id}>
              <div>
                <h3>{comic.title}</h3>
                <img
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                  alt={comic.thumbnail.path + "." + comic.thumbnail.extension}
                />
                <div>
                  {comic.description ? (
                    <p>{comic.description}</p>
                  ) : (
                    <p>Description will come soon...</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Comics;
