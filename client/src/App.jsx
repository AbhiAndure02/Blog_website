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

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path ="/" element ={<Home />} />
      <Route path ="/about" element ={<About />} />
      <Route path ="/project" element ={<Project />} />
      <Route path ="/signin" element ={<SignIn />} />
      <Route path ="/signup" element ={<SignUp />} />
      <Route element = {<PrivateRoute />}>
      <Route path ="/dashboard" element ={<Dashboard />} />
      </Route>
    </Routes>
    <FooterComponent />
    </BrowserRouter>
  )
}