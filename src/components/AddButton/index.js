import React from "react";
import "./addButton.css";

export default function AddButton({addToStore, cta}) {
  return (
    <>
      <button type="button" className="mt-3 btn btn-success submit" onClick={() => addToStore()}>
        {cta}
      </button>
    </>
  );
}
