import "./css/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./features/Navigation";
import Landing from "./pages/Landing";
import Bills from "./pages/Bills";

function App() {
  return (
    <div className="parent-container">
      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/bills" element={<Bills />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
