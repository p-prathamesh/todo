import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteTask, completeTask } from "../../redux/tasksSlice";
import AddComponent from "../../components/AddTask";
import ListView from "../../components/ListView";
import NavBar from "../../components/Navbar";
import Input from "../../components/Input";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todos = useSelector((state) => {
    return state.tasks;
  });

  const [list, setList] = useState(todos);

  const handleSearch = (val) => {
    val.trim().length !== 0
      ? setList(filterResults(todos, val))
      : setList(todos);
  };

  useEffect(() => {
    setList(todos);
  }, [todos]);

  const filterResults = (list, keyword) => {
    const res = list.filter((o) => o.name.includes(keyword));
    return res;
  };

  const handleRemove = (_id) => {
    dispatch(
      deleteTask({
        id: _id,
      })
    );
  };
  const handleComplete = (_id) => {
    dispatch(
      completeTask({
        id: _id,
      })
    );
  };

  const handleUpdate = (_id) => {
    let path = `/task/add?id=${_id}`;
    navigate(path);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 text-white">
            <NavBar userName="Mike" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-white">
            <Input fetchInput={handleSearch} placeholder="Search task" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-3 text-white">
            {list.length ? (
              list.map(({ id, name, isCompleted }) => {
                return (
                  <React.Fragment key={id}>
                    <ListView
                      pId={id}
                      taskName={name}
                      updateToRemove={handleRemove}
                      updateToComplete={handleComplete}
                      status={isCompleted}
                      updateToTask={handleUpdate}
                    />
                  </React.Fragment>
                );
              })
            ) : (
              <h6 className="no-content">No Task Added</h6>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-white mb-3">
            <AddComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
