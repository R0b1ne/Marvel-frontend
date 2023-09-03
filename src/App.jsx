import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Characters from "./pages/Characters";
import CharacterFocus from "./pages/CharacterFocus";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";

//Components
import Header from "./components/Header";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretRight,
  faCaretLeft,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
library.add(faCaretLeft, faCaretRight, faStar);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:characterId" element={<CharacterFocus />} />

        <Route path="/comics" element={<Comics />} />
        <Route path="favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
