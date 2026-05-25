import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Chat.css";

const Chat = () => {
  const [message, setMessage] = useState("I would like to inspect this product and chat with the farmer.");
  const [myRequests, setMyRequests] = useState([]);
  const [statusText, setStatusText] = useState("");
  const [loadingRequests, setLoadingRequests] = useState(true);

  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Read selected fruit from URL query params.
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const fruitId = queryParams.get("fruitId");
  const fruitName = queryParams.get("fruitName") || "Selected Item";

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: "/chat" } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Load already sent chat requests for history table.
  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const { data } = await api.get("/api/chat/my-requests");
        setMyRequests(data.chatRequests || []);
      } catch (error) {
        setStatusText("Login required to view your chat requests.");
      } finally {
        setLoadingRequests(false);
      }
    };

    if (isAuthenticated) {
      fetchMyRequests();
    } else {
      setLoadingRequests(false);
    }
  }, [isAuthenticated]);

  // Send request to backend chat route.
  const handleSendRequest = async (event) => {
    event.preventDefault();

    if (!fruitId) {
      setStatusText("Please open chat from a fruit card to select a farmer.");
      return;
    }

    try {
      const { data } = await api.post("/api/chat/request", {
        fruitId,
        message,
      });

      setStatusText(data.message || "Request sent successfully.");

      const refreshed = await api.get("/api/chat/my-requests");
      setMyRequests(refreshed.data.chatRequests || []);
    } catch (error) {
      setStatusText(error.response?.data?.message || "Failed to send request.");
    }
  };

  if (authLoading) {
    return <p>Loading chat page...</p>;
  }

  return (
    <section className="chat-page">
      <div className="chat-request-box">
        <h2>Farmer Inspection Chat Request</h2>
        <p>
          Product: <strong>{fruitName}</strong>
        </p>

        <form onSubmit={handleSendRequest}>
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={4} required />
          <button type="submit">Send Request to Farmer</button>
        </form>

        {statusText ? <p className="chat-status">{statusText}</p> : null}
      </div>

      <div className="chat-history-box">
        <h3>My Sent Requests</h3>

        {loadingRequests ? (
          <p>Loading request history...</p>
        ) : myRequests.length === 0 ? (
          <p>No requests yet.</p>
        ) : (
          <div className="history-list">
            {myRequests.map((request) => (
              <article key={request._id} className="history-item">
                <p>
                  <strong>Fruit:</strong> {request.fruit?.name}
                </p>
                <p>
                  <strong>Farmer:</strong> {request.farmerName}
                </p>
                <p>
                  <strong>Status:</strong> {request.status}
                </p>
                <p>
                  <strong>Message:</strong> {request.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Chat;
