import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CharacterFocus = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();

  //Fetch all comics
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--zqz8bqcfkwlv.code.run/character/${characterId}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="character-focus-container">
      <section className="character-information">
        <div>
          <h3>{data.character.name} </h3>
          <img
            src={
              data.character.thumbnail.path +
              "." +
              data.character.thumbnail.extension
            }
            alt={
              data.character.thumbnail.path +
              "." +
              data.character.thumbnail.extension
            }
          />
          <p>{data.character.description}</p>
        </div>
      </section>
      <section className="character-comics-list">
        <h2>Comics linked to {data.character.name} </h2>
        <div>
          {data.comics.map((comic, index) => {
            return (
              <div className="card" key={index}>
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
        </div>
      </section>
    </div>
  );
};

export default CharacterFocus;
