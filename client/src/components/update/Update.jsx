import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext, useState } from "react";

import { makeRequest } from "../../axios";
import { DarkModeContext } from "../../context/darkModeContext";
import "./update.scss";

const Update = ({ setOpenUpdate, user, setModify }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const { darkMode } = useContext(DarkModeContext);

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const upload = async (file) => {
    console.log(file)
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;
    const updatedUser = { ...texts, coverPic: coverUrl, profilePic: profileUrl };
    await makeRequest.put("/users", updatedUser);
    setModify(prev => prev += 1);
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  }

  return (
    <div className={`update theme-${darkMode ? 'dark' : 'light'}`}>
      <div className="wrapper">
        <h1>Cập nhật hồ sơ của bạn</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <div className="userInfo">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={texts.email}
              name="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="userInfo">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              value={texts.password}
              name="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="userInfo">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={texts.name}
              name="name"
              id="name"
              onChange={handleChange}
            />
          </div>
          <div className="userInfo">
            <label htmlFor="country">Country / City</label>
            <input
              type="text"
              name="city"
              id="country"
              value={texts.city}
              onChange={handleChange}
            />
          </div>
          <div className="userInfo">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              name="website"
              id="website"
              value={texts.website}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleClick}>Cập nhật</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};


export default Update;