import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";

import "./profile.scss";
import Posts from "../../components/posts/Posts";
import Update from "../../components/update/Update";
import { makeRequest } from "../../axios";
import { DarkModeContext } from "../../context/darkModeContext";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [user, setUser] = useState({});
  const [relationship, setRelationship] = useState([]);
  const [modify, setModify] = useState(1);
  console.log("rerender")

  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const location = useLocation();
  const userId = parseInt(location.pathname.split("/")[2]);

  useEffect(() => {
    // fetching user 
    const getUser = async () => {
      try {
        const res = await makeRequest.get("/users/find/" + userId);
        setUser(res.data);
      }
      catch (err) {
        console(err);
      }
    }
    getUser();
  }, [userId, modify]);

  useEffect(() => {
    // fetching relationships 
    const getRelationship = async () => {
      try {
        const res = await makeRequest.get("/relationships?followedUserId=" + userId);
        setRelationship(res.data);
        console.log(res.data);
      }
      catch (err) {
        console(err);
      }
    }
    getRelationship();
  }, [userId, modify]);

  const handleFollow = async (e) => {
    e.preventDefault();
    if (relationship.includes(currentUser.id)) {
      // unfollowing
      console.log("unfollowing")
      await makeRequest.delete("/relationships?userId=" + userId);
      setModify(prev => prev += 1);
    }
    else {
      //following
      console.log("following")
      await makeRequest.post("/relationships", { userId });
      setModify(prev => prev += 1);
    }
  };

  return (
    <div className={`profile theme-${darkMode ? 'dark' : 'light'}`}>
      {/*  isLoading ? (
         "loading"
       ) : ( */}
      <>
        <div className="images">
          <img src={"/upload/" + user.coverPic} alt="" className="cover" />
          <img src={"/upload/" + user.profilePic} alt="" className="profilePic" />
        </div>
        <div className="profileContainer">
          <div className="uInfo">
            <div className="left">
              <a href="http://facebook.com">
                <FacebookTwoToneIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <InstagramIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <TwitterIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <LinkedInIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <PinterestIcon fontSize="large" />
              </a>
            </div>
            <div className="center">
              <span>{user.name}</span>
              <div className="info">
                <div className="item">
                  <PlaceIcon />
                  <span>{user.city}</span>
                </div>
                <div className="item">
                  <LanguageIcon />
                  <span>{user.website}</span>
                </div>
              </div>
              {
                userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>Cập nhật</button>
                ) :
                  relationship.includes(currentUser.id)
                    ? (<button onClick={handleFollow}>Đang theo dõi</button>)
                    : (<button onClick={handleFollow}>Theo dõi</button>)
              }
            </div>
            <div className="right">
              <EmailOutlinedIcon />
              <MoreVertIcon />
            </div>
          </div>
          <Posts userId={userId} />
        </div>
      </>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={user} setModify={setModify} />}
    </div>
  );
};

export default Profile;
