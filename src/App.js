import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/Home/Home";
import { Submit } from "./pages/Submit/Submit";
import { Tags } from "./pages/Tags/Tags";
import { About } from "./pages/About/About";
import { Word } from "./pages/Word/Word";
import { Profile } from "./pages/Profile/Profile";
import { Tag } from "./pages/Tag/Tag";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/about" element={<About/>} />
          <Route path="/word/:cardId" element={<Word />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/tag/:tagName" element={<Tag />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
