import React from "react";
import { Link } from "react-router-dom";
import AddImg from "../../assets/plus.png";

import "./add.css";

export default function AddComponent() {
  return (
    <>
      <Link to="/task/add">
        <img
          src={AddImg}
          alt="add"
          width={60}
          height={60}
          className="add-cta"
        />
      </Link>
    </>
  );
}
