import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";
import { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import "./post.scss";
import Comments from "../comments/Comments";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from "../../context/darkModeContext";

const Post = ({ post, setModify }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(null)

  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    // fetching likes 
    const getLikes = async () => {
      try {
        const res = await makeRequest.get("/likes?postId=" + post.id);
        setLikes(prev => res.data);
      }
      catch (err) {
        console(err);
      }
    }
    getLikes();
  }, [liked, post.id]);

  const handleLike = async () => {
    if (likes.includes(currentUser.id)) {
      await makeRequest.delete("/likes?postId=" + post.id);
      setLiked(prev => false);
    }
    else {
      await makeRequest.post("/likes", { postId: post.id });
      setLiked(prev => true);
    }
  };

  const handleDelete = async () => {
    await makeRequest.delete("/posts/" + post.id);
    setModify(prev => prev += 1);
  };

  return (
    <div className={`post theme-${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/" + post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>Xóa bài đăng</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {
              // isLoading ? (
              //   "loading"
              // ) : 
              likes.includes(currentUser.id) ? (
                <FavoriteOutlinedIcon
                  style={{ color: "red" }}
                  onClick={handleLike}
                />
              ) : (
                <FavoriteBorderOutlinedIcon onClick={handleLike} />
              )}
            {likes?.length} Lượt thích
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            Xem bình luận
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Chia sẻ
          </div>
        </div>
        {commentOpen && <Comments key={post.id} postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
