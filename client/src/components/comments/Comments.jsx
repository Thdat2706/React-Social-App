import { useContext, useEffect, useState } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import moment from 'moment';
import { DarkModeContext } from '../../context/darkModeContext';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState('');
  const [modify, setModify] = useState(1);

  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(
    () => {
      // fetching comments
      const getComments = async () => {
        try {
          const res = await makeRequest.get('/comments?postId=' + postId);
          setComments(res.data);
        } catch (err) {
          console(err);
        }
      };
      getComments();
    },
    [modify, postId]
  );

  const handleClick = async e => {
    e.preventDefault();
    if (desc !== '') {
      const newComment = { desc, postId };
      await makeRequest.post('/comments', newComment);
      setModify(prev => (prev += 1));
      setDesc('');
    }
  };

  return (
    <div className={`comments theme-${darkMode ? 'dark' : 'light'}`}>
      <div className="write">
        <img src={'/upload/' + currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>
          Send
        </button>
      </div>
      {// error
        //   ? "Something went wrong"
        //   : isLoading
        //     ? "loading"
        //     :
        comments.map(comment => (
          <div className="comment" key={comment.id}>
            <img src={'/upload/' + comment.profilePic} alt="" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          </div>
        ))
      }
    </div >
  );
};

export default Comments;
