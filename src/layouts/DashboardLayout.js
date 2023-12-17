import { Outlet } from "react-router-dom";
import Header from "../components/header";

export default function GlobalLayout(props) {
  return (
    <div className="global-layout">
      <Header />

      <div className="container my-3">{props.children}
	  
	  <Outlet/>
	  </div>
    </div>
  );
}
