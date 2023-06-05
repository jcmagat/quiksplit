import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/bills");

  return (
    <div className="landing">
      <div>Easily split expenses with your friends</div>
      <div>
        Whether you're splitting a restaurant bill, a hotel room, or a utility
        bill, QuikSplit can do it for you
      </div>
      <div>No account needed</div>
      <div>More features when you sign up for an account</div>
      <button onClick={handleClick}>Split a bill</button>
    </div>
  );
}

export default Landing;
