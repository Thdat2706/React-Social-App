import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import "./home.scss"
import { useContext } from "react"
import { DarkModeContext } from "../../context/darkModeContext"

const Home = () => {
  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={`home theme-${darkMode ? 'dark' : 'light'}`}>
      <Stories />
      <Posts />
    </div>
  )
}

export default Home