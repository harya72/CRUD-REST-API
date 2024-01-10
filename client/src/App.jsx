import NavBar from "./components/NavBar";
import Form from "./components/Form";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
