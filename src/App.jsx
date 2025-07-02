import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { FaMusic, FaRegCirclePlay } from "react-icons/fa6";
import { Box, Button, CircularProgress, Modal, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSmart, putSmart } from "./API/api";
import { RiAlarmWarningFill } from "react-icons/ri";
import { FaRegStopCircle } from "react-icons/fa";
import komuz from "./assets/muz/komuz-kyrgyzstan--zhay-leto.mp3";
import komuz2 from "./assets/muz/sarynzhy-bokoy-komuz-sarynzhy-bokoy-komuz.mp3";
import logo from "./assets/logo.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const dispatch = useDispatch();
  const { loading, smart } = useSelector((state) => state.smart);
  const [smartState, setSmartState] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [start_time, setStart_time] = useState("");
  const [start_min, setStart_min] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [end_min, setEnd_min] = useState("");
  const [valTime, setValTime] = useState("");
  const [valMin, setValMin] = useState("");
  const [valNum, setValNum] = useState("");
  const [open, setOpen] = React.useState(false);
  const [number] = useState(35000);
  const [started, setStarted] = useState(true);
  const [min, setMin] = useState("");
  const [hour, setHour] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const audio = useRef(new Audio(komuz));
  const audio2 = useRef(new Audio(komuz2));

  // Модальдык терезе

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //  Маалыматты сактоо жана өзгөртүү функциялары

  function changeFunc(e, a) {
    if (valNum == 1 && a == 1) {
      setStart_time(e);
      setValTime(e);
    } else if (valNum == 1 && a == 2) {
      setStart_min(e);
      setValMin(e);
    } else if (valNum == 2 && a == 1) {
      setEnd_time(e);
      setValTime(e);
    } else if (valNum == 2 && a == 2) {
      setEnd_min(e);
      setValMin(e);
    }
  }

  function editSmart(el, a) {
    setId(el.id);
    setName(el.name);
    setStart_time(el.start_time);
    setStart_min(el.start_min);
    setEnd_time(el.end_time);
    setEnd_min(el.end_min);
    setValNum(a);
    handleOpen();
    if (a == 1) {
      setValTime(el.start_time);
      setValMin(el.start_min);
    } else if (a == 2) {
      setValTime(el.end_time);
      setValMin(el.end_min);
    }
  }

  function saveSmart() {
    const newSmart = {
      id,
      name,
      start_time,
      start_min,
      end_time,
      end_min,
    };
    dispatch(putSmart(newSmart));
    handleClose();
  }

  // Коңгуроону иштетүү функциялары

  function startSystem() {
    audio2.current.pause();
    audio.currentTime = 0;
    audio.current.play();
    setStarted(false);
    setTimeout(() => {
      audio.currentTime = 0;
      audio.current.pause();
      oneMin();
    }, number);
  }
  function startSystem2() {
    audio.current.pause();
    audio2.currentTime = 0;
    audio2.current.play();
    setStarted(false);
    setTimeout(() => {
      audio2.currentTime = 0;
      audio2.current.pause();
      oneMin();
    }, number);
  }
  function stopSystem() {
    setStarted(false);
    audio.currentTime = 0;
    audio2.currentTime = 0;
    audio.current.pause();
    audio2.current.pause();
    oneMin();
  }

  function oneMin() {
    setTimeout(() => {
      setStarted(true);
    }, 60000);
  }
  function getDate() {
    const days = new Date().getDay();
    const months = new Date().getMonth();
    const years = new Date().getFullYear();
    setDay(days);
    setMonth(months);
    setYear(years);
  }
  useEffect(() => {
    setInterval(() => {
      const hours = new Date().getHours();
      const mins = new Date().getMinutes();
      setHour(hours);
      setMin(mins);
    }, []);
  }, []);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      const hour = new Date().getHours();
      const min = new Date().getMinutes();
      if (smartState.length > 0) {
        smartState.filter((el) => {
          if (el.start_time == hour && el.start_min == min) {
            playMuz();
          } else if (el.end_time == hour && el.end_min == min) {
            playMuz2();
          } else {
            console.log("Убакыт туура келген жок");
          }
        });
      }
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smartState, started]);

  function playMuz() {
    audio.currentTime = 0;
    audio.current.play();
    setStarted(false);
    setTimeout(() => {
      audio.currentTime = 0;
      audio.current.pause();
      oneMin();
    }, number);
  }
  function playMuz2() {
    audio2.currentTime = 0;
    audio2.current.play();
    setStarted(false);
    setTimeout(() => {
      audio2.currentTime = 0;
      audio2.current.pause();
      oneMin();
    }, number);
  }

  useEffect(() => {
    getDate();
    setSmartState(smart);
    dispatch(fetchSmart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, smart.length]);

  if (loading)
    return (
     <div id="smart">
       <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="success" />
      </Stack>
     </div>
    );
  return (
    <div id="smart">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: "10px",
              width: "200px",
            }}
            sx={style}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                defaultValue={valTime}
                onChange={(e) => changeFunc(e.target.value, 1)}
                value={valTime}
                type="number"
                style={{ width: "70px" }}
                label="Саат"
                variant="filled"
                color="success"
                focused
              />
              <p>:</p>
              <TextField
                defaultValue={valMin}
                onChange={(e) => changeFunc(e.target.value, 2)}
                value={valMin}
                type="number"
                style={{ width: "70px" }}
                label="Минута"
                variant="filled"
                color="success"
                focused
              />
            </div>
            <Button
              onClick={() => saveSmart()}
              variant="contained"
              color="success"
            >
              Сактоо
            </Button>
          </Box>
        </Modal>
      </div>
      <header id="header">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="img" />
          </div>
          <div className="title">
            <h1 className="title-text">АКЫЛДУУ КОҢГУРОО</h1>
          </div>
          <div className="name">
            <p>А. Сулайманов атындагы орто мектеби</p>
            <span>
              {day.length > 1 ? day - 1 : "0" + (day - 1)}.
              {month.length > 1 ? month + 1 : "0" + (month + 1)}.{year}
            </span>
            <span>
              {hour}:{min}
            </span>
          </div>
        </div>
      </header>
      <table
        style={{
          background: "white",
          border: "solid 1px green",
          boxShadow: "0px 0px 10px #0fa4017a",
        }}
        border="1"
        cellSpacing="0"
        cellPadding="28"
      >
        <thead>
          <tr>
            <th className="th">Сабактардын ирети</th>
            <th className="th">Кирүү</th>
            <th className="th">
              <RiAlarmWarningFill style={{ color: "rgb(201, 182, 17)" }} />
            </th>
            <th className="th">Чыгуу</th>
            <th className="th">
              <RiAlarmWarningFill style={{ color: "rgb(201, 182, 17)" }} />
            </th>
          </tr>
        </thead>
        {smartState && smartState.length > 0
          ? smartState.map((el) => (
              <tbody key={el.id}>
                <tr
                  style={{
                    background: `${
                      (el.start_time == hour && el.start_min == min) ||
                      (el.end_time == hour && el.end_min == min)
                        ? "yellow"
                        : ""
                    }`,
                  }}
                  className="tr"
                >
                  <td className="td">{el.name}</td>
                  <td
                    className="td"
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => editSmart(el, 1)}
                  >
                    {el.start_time}:{el.start_min}
                  </td>
                  <td className="td">
                    <FaMusic
                      onClick={() => startSystem2()}
                      style={{ cursor: "pointer", color: "palevioletred" }}
                    />
                  </td>
                  <td
                    className="td"
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => editSmart(el, 2)}
                  >
                    {el.end_time}:{el.end_min}
                  </td>
                  <td className="td">
                    <FaMusic
                      onClick={() => startSystem()}
                      style={{ cursor: "pointer", color: "palevioletred" }}
                    />
                  </td>
                </tr>
              </tbody>
            ))
          : ""}
      </table>
      <div className="btns">
        <p>
          <FaRegCirclePlay
            className="icon-footer"
            onClick={() => startSystem()}
          />
          Чыгуу
        </p>
        <p>
          <FaRegStopCircle
            className="icon-footer"
            onClick={() => stopSystem()}
          />
          Токтотуу
        </p>
        <p>
          <FaRegCirclePlay
            className="icon-footer"
            onClick={() => startSystem2()}
          />
          Кирүү
        </p>
      </div>
    </div>
  );
}
export default App;
