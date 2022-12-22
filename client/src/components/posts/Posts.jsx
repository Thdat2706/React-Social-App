import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./posts.scss";

const Posts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [modify, setModify] = useState(1);

  useEffect(() => {
    // fetching posts 
    const getPosts = async () => {
      try {
        const res = await makeRequest.get("/posts?userId=" + userId);
        setPosts(res.data);
      }
      catch (err) {
        console(err);
      }
    }
    getPosts();
  }, [modify, userId]);

  return (
    <div className="posts">
      <Share setModify={setModify} />
      {posts.map((post) => <Post post={post} key={post.id} setModify={setModify} />)}
    </div>
  );
};

export default Posts;
