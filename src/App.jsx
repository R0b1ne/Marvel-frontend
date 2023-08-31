import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Characters from "./pages/Characters";
import CharacterFocus from "./pages/CharacterFocus";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";

//Components
import Header from "./components/Header";

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
