import DebtsContainer from "../../features/Debts";
import FriendsContainer from "../../features/Friends";

function Bills() {
  return (
    <div className="bills">
      <FriendsContainer />
      <DebtsContainer />
    </div>
  );
}

export default Bills;
