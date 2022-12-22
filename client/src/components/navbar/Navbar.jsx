import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={`navbar theme-${darkMode ? 'dark' : 'light'}`}>
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>socialApp</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <HomeOutlinedIcon />
        </Link>

        {darkMode ? (
          <WbSunnyOutlinedIcon className="theme-mode" onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon className="theme-mode" onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none", color: "inherit" }} >
          <div className="user">
            <img
              src={"/upload/" + currentUser?.profilePic}
              alt=""
            />
            <span>{currentUser?.name}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
