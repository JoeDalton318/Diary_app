import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import PhotoDetail from "../pages/PhotoDetail";
import Search from "../pages/Search";
import Friends from "../pages/Friends";

import Footer from "../components/Footer";
import Main from "../components/Main";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
     
      {!isAuthPage && <Main>{children}</Main>}
      {isAuthPage && <div className="auth-container">{children}</div>}
      {!isAuthPage && <Footer />}
    </>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/photo/:id" element={<Layout><PhotoDetail /></Layout>} />
        <Route path="/search" element={<Layout><Search /></Layout>} />
        <Route path="/friends" element={<Layout><Friends /></Layout>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
