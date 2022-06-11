import React from "react";
import DoneImg from "../../assets/correct.png";
import CancelImg from '../../assets/multiply.png';
import EditImg from '../../assets/edit.png';

import "./listView.css";

export default function ListView({ pId, taskName, updateToRemove, updateToComplete, status, updateToTask}) {
  
  return (
    <div className="card">
      <span>{taskName}</span>
      <div className="action-cta">
        {!status && <img src={EditImg} className="m-2" alt="edit" width={25} height={25} onClick={() => updateToTask(pId)} />}
        {!status && <img src={DoneImg} className="m-2" alt="done" width={25} height={25} onClick={() => updateToComplete(pId)}/>}
        <img src={CancelImg} className="m-2" alt="close" width={25} height={25} onClick={() => updateToRemove(pId)} />
      </div>
    </div>
  );
}
