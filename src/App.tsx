import "./css/style.css";
import Navigation from "./features/Navigation";
import Friends from "./features/Friends";
import Debts from "./features/Debts";

function App() {
  return (
    <div>
      <Navigation />
      <Friends />
      <Debts />
    </div>
  );
}

export default App;
