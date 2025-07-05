import React, { useEffect, useState } from "react";
import { FaMusic } from "react-icons/fa6";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RiAlarmWarningFill } from "react-icons/ri";
import { setLocal } from "../../store/slice/smartSlice";
import SettingsMuz from "../SettingsMuz/SettingsMuz";
import { MdEdit } from "react-icons/md";
import { muzAllStop, muzOnePlay, muzTwoPlay } from "../../store/slice/muzSlice";
import './ListOne.css'

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
const styleTwo = {
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

function ListOne() {
  const dispatch = useDispatch();
  const { smart } = useSelector((state) => state.smart);
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
  const [min, setMin] = useState("");
  const [hour, setHour] = useState("");
  const [counter, setCounter] = useState("");

  // Модалдык терезе

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openTwo, setOpenTwo] = React.useState(false);
  const handleOpenTwo = (e) => {
    setCounter(e);
    setOpenTwo(true);
  };
  const handleCloseTwo = () =>{
    dispatch(muzOnePlay())
    dispatch(muzTwoPlay())
         setOpenTwo(false);
// setTimeout(()=>{
    dispatch(muzAllStop())
// },100)
  }


  //  Маалыматты localStorage ге сактоо жана өзгөртүү функциялары
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
    const res = smartState.filter((el) => el.id !== newSmart.id);
    res.push(newSmart);
    res.sort((a, b) => a.id - b.id);
    dispatch(setLocal(res));
    handleClose();
  }

  useEffect(() => {
      setInterval(() => {
    const hours = new Date().getHours();
    const mins = new Date().getMinutes();
    setHour(hours);
    setMin(mins);
      }, 3000);
  }, []);

  useEffect(() => {
    setSmartState(smart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, smart.length, saveSmart]);

  return (
    <div className="list-one">
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
      <div>
        <Modal
          open={openTwo}
          onClose={handleCloseTwo}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleTwo}>
            <SettingsMuz counter={counter} />
          </Box>
        </Modal>
      </div>
      <h3 className="list-one-title">Түшкө чейинки сабактар</h3>
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
              <RiAlarmWarningFill style={{ color: "rgb(244, 224, 42)" }} />
            </th>
            <th className="th">Чыгуу</th>
            <th className="th">
              <RiAlarmWarningFill style={{ color: "rgb(244, 224, 42)" }} />
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
                  <td style={{}} className="td">
                    <FaMusic
                      onClick={() => dispatch(muzOnePlay())}
                      style={{
                        marginRight: "20px",
                        cursor: "pointer",
                        color: "palevioletred",
                      }}
                    />
                    <MdEdit
                      onClick={() => handleOpenTwo(1)}
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
                  <td style={{}} className="td">
                    <FaMusic
                      onClick={() => dispatch(muzTwoPlay())}
                      style={{
                        marginRight: "20px",
                        cursor: "pointer",
                        color: "palevioletred",
                      }}
                    />
                    <MdEdit
                      onClick={() => handleOpenTwo(2)}
                      style={{ cursor: "pointer", color: "palevioletred" }}
                    />
                  </td>
                </tr>
              </tbody>
            ))
          : ""}
      </table>
    </div>
  );
}
export default ListOne;
