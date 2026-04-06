import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import './AppLayout.css';

export default function AppLayout(){
// so basically this file is created to be act as boilerplate, which will help in showing navabr,footer etc on every page
    return(
    <>
    <div className="appLayout">
    <Navbar/>
    <div className="mainContent">
    {/* whenever we go to new route it will its file will come b/w navbar & footer */}
    <Outlet/> 
    </div>
    <Footer/>
    </div>
    </>
    )
}