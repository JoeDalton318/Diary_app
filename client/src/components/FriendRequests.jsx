import "../styles/friendRequests.css";

const FriendRequests = ({ pendingRequests, handleAcceptRequest }) => {
  return (
    <div className="pending-requests">
      <h3>Demandes d'amis en attente</h3>
      {pendingRequests.length > 0 ? (
        pendingRequests.map((request, index) => (
          <div key={index} className="request-card">
            <p>{request.from}</p>
            <button onClick={() => handleAcceptRequest(request.from)}>Accepter</button>
          </div>
        ))
      ) : (
        <p>Aucune demande en attente.</p>
      )}
    </div>
  );
};

export default FriendRequests;
