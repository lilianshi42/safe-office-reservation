import "./Profile.css";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";

function ProfilePage() {
  const [error, setError] = useState("");
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const { email } = currentUser;

  return (
    <div className="profile">
      <h1>Hello Welcome! user {email}</h1>
      {error && <Alert message={error} type="warning" closable />}
      <div className="profile-links">
        {currentUser ? (
          <div
            className="link-to-other-feature"
            onClick={() => {
              try {
                logOut();
                navigate("/");
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
}

export default ProfilePage;
