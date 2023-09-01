import Cookies from "js-cookie";
import { useState } from "react";

const Favorites = () => {
  const [favorites, setFavorite] = useState(Cookies.get("favorites") || null);

  return (
    <div className="favorites-container">
      <h1>Favoris</h1>
      {favorites.length === 0 ? (
        <p>Vous n'avez pas encore de favoris.</p>
      ) : (
        <ul>
          {favorites.map((characterId) => (
            <li key={characterId}>{characterId}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
