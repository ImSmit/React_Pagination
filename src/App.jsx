
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="flex h-screen bg-[#ffffff]">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default App;
