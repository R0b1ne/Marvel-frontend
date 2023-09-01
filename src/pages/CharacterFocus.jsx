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
    <div className="character-focus">
      <section className="character-information">
        <p>{data.character.name}</p>
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
        <p>{data.description}</p>
      </section>
      <section className="character-comics-list">
        {data.comics.map((comic, index) => {
          return (
            <div key={index}>
              <div>{comic.title}</div>
              <img
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                alt={comic.thumbnail.path + "." + comic.thumbnail.extension}
              />
              <div>{comic.description}</div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default CharacterFocus;
