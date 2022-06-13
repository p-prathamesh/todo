import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";

import NavBar from "../../components/Navbar";
import Input from "../../components/Input";
import AddButton from "../../components/AddButton";
import TimeInput from "../../components/TimeInput";
import CalendarImg from "../../assets/calendar.png";
import CalendarComponent from "../../components/Calendar";
import { addTask, updateTask } from "../../redux/tasksSlice";

import useDeviceDetect from "../../utils/browserDetectHook";

const CreateTask = () => {
  const { isMobile } = useDeviceDetect();

  const [selectedTime, setSelectedTime] = useState("now");
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState(new Date());
  const [cta, setCta] = useState("Add Task");
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchId = searchParams.get("id");

  const todos = useSelector((state) => {
    return state.tasks;
  });

  useEffect(() => {
    if (searchId) {
      setCta("Update Task");
      const editRecord = todos.filter(({ id }) => {
        return id === searchId;
      });
      setData(editRecord);
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      handleChange(data[0].name);
      handleGetTime(data[0].createdTime);
      handleDate(new Date(data[0].createdDate));
    }
  }, [data]);

  const handleChange = useCallback(
    (val) => {
      setTaskName(val);
    },
    [taskName]
  );

  const handleGetTime = useCallback(
    (e) => {
      setSelectedTime(e);
    },
    [selectedTime]
  );

  const handleDate = useCallback(
    (e) => {
      setDate(e);
    },
    [date]
  );

  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  const onSubmit = () => {
    if (taskName.trim().length === 0) {
      alert("Enter a task before adding !!");
      setTaskName("");
      return;
    }

    dispatch(
      addTask({
        id: Math.random().toString(16).slice(2),
        task: taskName,
        createdDate: format(date, "yyyy-MM-dd"),
        createdTime: selectedTime,
        isCompleted: false,
      })
    );

    routeChange();
  };

  const onUpdate = () => {
    if (taskName.trim().length === 0) {
      alert("Enter a task before adding !!");
      setTaskName("");
      return;
    }

    dispatch(
      updateTask({
        id: searchId,
        name: taskName,
        createdDate: format(date, "yyyy-MM-dd"),
        createdTime: selectedTime,
        isCompleted: false,
      })
    );

    routeChange();
  };

  return (
    <>
      {isMobile ? (
        <div className="container">
          <div className="row">
            <div className="col-12 text-white">
              <NavBar userName="Mike" />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-white">
              <Input
                fetchInput={handleChange}
                value={taskName}
                placeholder="Enter task name"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-8 text-white">
              <TimeInput getTime={handleGetTime} time={selectedTime} />
            </div>
            <div className="col-3 text-white">
              <img
                src={CalendarImg}
                alt="Calendar"
                width={30}
                height={30}
                className="calendar"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12 text-white">
              <CalendarComponent setDate={handleDate} selected={date} />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-white text-center">
              <AddButton
                addToStore={searchId ? onUpdate : onSubmit}
                cta={cta}
              />
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-white notify">Please open in mobile</h1>
      )}
    </>
  );
}

export default CreateTask;
