import "./style.css";

interface Props {
  friend: any;
}

export function FriendCard(props: Props) {
  const { friend } = props;

  return (
    <div className="friend-card">
      <h5>{friend.name}</h5>

      <form>
        <input value={friend.expense} type="number"></input>
      </form>
    </div>
  );
}
