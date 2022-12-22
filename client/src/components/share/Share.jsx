import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { DarkModeContext } from "../../context/darkModeContext";

const Share = ({ setModify }) => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const upload = async () => {
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
    let imgUrl = "";
    if (file) imgUrl = await upload();
    await makeRequest.post("/posts", { desc, img: imgUrl });
    setModify(prev => prev += 1);
    setDesc("");
    setFile(null);
  };

  return (
    <div className={`share theme-${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + currentUser.profilePic} alt="" />
            <input
              type="text"
              placeholder={`Bạn đang nghĩ gì ${currentUser.name}?`}
              onChange={(e) => setDesc(prev => e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Thêm hình ảnh</span>
              </div>
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="item">
              <img src={Map} alt="" />
              <span>Thêm địa điểm</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Bạn bè</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Chia sẻ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
