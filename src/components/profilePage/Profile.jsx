import { Button } from "antd";
import "./Profile.css";

const ProfilePage = ()=>(
    <div className="profile">
      <h1>Hello Welcome</h1>
      <div className="buttons">
        <Button type="default" size="large" block>
          LOG OUT
        </Button>
        <Button type="default" size="large" block>
          SETTINGS
        </Button>
      </div>
    </div>
)

export default ProfilePage;