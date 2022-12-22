import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { currentUser, login } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser != null) {
      navigate("/");
    }
  }, [navigate, currentUser])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Bạn chưa có tài khoản?</span>
          <Link to="/register">
            <button>Đăng ký</button>
          </Link>
        </div>
        <div className="right">
          <h1>Log in</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>Đăng Nhập</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
