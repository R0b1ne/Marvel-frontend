import Cookies from "js-cookie";
import { useState } from "react";

const Favorites = () => {
  // const [favorites, setFavorite] = useState(
  //   Cookies.get(JSON.parse("favorites")) || null
  // );

  const savedFavorites = Cookies.get("favorites");
  const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

  return (
    <div className="favorites-container">
      <h1>Vos favoris (Work in progress)</h1>
      {favorites.length === 0 ? (
        <p>Vous n'avez pas encore de favoris.</p>
      ) : (
        <div>
          {favorites.map((characterId) => (
            <div key={characterId}>{characterId}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
