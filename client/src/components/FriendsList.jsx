import "../styles/friendsList.css";

const FriendsList = ({ friends }) => {
  return (
    <div className="friends-list">
      <h3>Mes amis</h3>
      {friends.length > 0 ? (
        friends.map((friend, index) => <p key={index}>{friend.friend}</p>)
      ) : (
        <p>Aucun ami pour le moment.</p>
      )}
    </div>
  );
};

export default FriendsList;
