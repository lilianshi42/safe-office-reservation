import "./Profile.css";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "bootstrap";

const ProfilePage = () => {
  const [error, setError] = useState("");
  const { currentUser, logOut } = useAuth();
  const navigate = Navigate();

  return (
    <div className="profile">
      <h1>Hello Welcome</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="profile-links">
        {currentUser ? (
          <div
            className="link-to-other-feature"
            onClick={() => {
              try {
                logOut();
                navigate("/login");
              } catch {
                setError("Failed to log out");
              }
            }}
          >
            LOG OUT
          </div>
        ) : (
          ""
        )}
        <div
          className="link-to-other-feature"
          onClick={() => {
            navigate("/setting");
          }}
        >
          SETTINGS
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
