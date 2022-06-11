import React from "react";
import MenuImg from "../../assets/menu.png";
import TaskList from "../../assets/task.png";
import { Link } from "react-router-dom";
import './navbar.css'

export default function NavBar({userName}) {
  return (
    <>
      <nav className="navbar navbar-expand-lg m-3">
        <div>
          <img src={MenuImg} alt="Menu" width={30} height={30} />
          <Link className="text-white navbar-brand brand" to={'/'}>{userName}</Link>
        </div>
        <img src={TaskList} alt="Menu" width={40} height={40} />
      </nav>
    </>
  );
}
