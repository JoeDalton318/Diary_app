import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import "../styles/main.css";

const Main = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
      <SearchBar />
        
        
        <div className="content">{children}</div>
        
      </div>
      <Footer />
    </div>
  );
};

export default Main;
