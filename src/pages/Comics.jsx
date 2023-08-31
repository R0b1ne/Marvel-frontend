import { useEffect, useState } from "react";
import axios from "axios";

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
          `hhttps://site--marvel-backend--zqz8bqcfkwlv.code.run/comics?title=${search}&skip=${skip}&limit=${limit}`
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
        <div>
          <input
            type="text"
            value={search}
            placeholder="Search a Comic"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <div className="pagination-buttons">
            <button onClick={handlePreviousPage}>Previous</button>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </div>
      </section>
      <section className="classic-second-section">
        {data.results.map((comic) => {
          return (
            <article key={comic._id}>
              <h2>{comic.title}</h2>
              <p>{comic.description}</p>
              <img
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                alt={comic.thumbnail.path + "." + comic.thumbnail.extension}
              />
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Comics;
