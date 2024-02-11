import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import FooterComponent from "./components/FooterComponent";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminprivateRoute from "./components/OnlyAdminprivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Header />
    <Routes>
      <Route path ="/" element ={<Home />} />
      <Route path ="/about" element ={<About />} />
      <Route path ="/project" element ={<Project />} />
      <Route path ="/signin" element ={<SignIn />} />
      <Route path ="/signup" element ={<SignUp />} />
      <Route path="/search" element ={<Search />} />
      <Route element = {<PrivateRoute />}>
      <Route path ="/dashboard" element ={<Dashboard />} />
      </Route>
      <Route element = {<OnlyAdminprivateRoute />}>
      <Route path ="/create-post" element ={<CreatePost />} />
      <Route path ="/update-post/:postId" element ={<UpdatePost />} />
      </Route>
      <Route path ="/post/:postSlug" element ={<PostPage />} />
    </Routes>
    <FooterComponent />
    </BrowserRouter>
  )
}