import "./SmartBell.css";
import { useEffect, useState, useRef } from "react";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Stack,
  Switch,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocal,
  getLocalTwo,
  setLocal,
  setLocalTwo,
} from "../../store/slice/smartSlice";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { muzAllStop, muzOnePlay, muzTwoPlay } from "../../store/slice/muzSlice";
import ListOne from "../../component/ListOne/ListOne";
import ListTwo from "../../component/ListTwo/ListTwo";
import komuz from "../../assets/muz/komuz-kyrgyzstan--zhay-leto.mp3";
import komuz2 from "../../assets/muz/sarynzhy-bokoy-komuz-sarynzhy-bokoy-komuz.mp3";

function SmartBell() {
  const dispatch = useDispatch();
  const { loading, smart, smartTwo } = useSelector((state) => state.smart);
  const { muzOne, muzTwo, muzPause } = useSelector((state) => state.muz);
  const [smartState, setSmartState] = useState([]);
  const [smartStateTwo, setSmartStateTwo] = useState([]);
  const [systems, setSystems] = useState(false);
  const [number] = useState(25000);
  const [started, setStarted] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  const audioRef = useRef(null);
  const [audioSrcTwo, setAudioSrcTwo] = useState(null);
  const audioRefTwo = useRef(null);
  const audio = useRef(new Audio(komuz));
  const audio2 = useRef(new Audio(komuz2));

  const StartSmartObj = [
    {
      id: "1",
      name: "1-сабак",
      start_time: "08",
      start_min: "00",
      end_time: "08",
      end_min: "45",
    },
    {
      id: "2",
      name: "2-сабак",
      start_time: "08",
      start_min: "50",
      end_time: "09",
      end_min: "35",
    },
    {
      id: "3",
      name: "3-сабак",
      start_time: "09",
      start_min: "40",
      end_time: "10",
      end_min: "25",
    },
    {
      id: "4",
      name: "4-сабак",
      start_time: "10",
      start_min: "35",
      end_time: "11",
      end_min: "20",
    },
    {
      id: "5",
      name: "5-сабак",
      start_time: "11",
      start_min: "25",
      end_time: "12",
      end_min: "10",
    },
    {
      id: "6",
      name: "6-сабак",
      start_time: "12",
      start_min: "15",
      end_time: "13",
      end_min: "00",
    },
  ];

  const StartSmartObjTwo = [
    {
      id: "1",
      name: "1-сабак",
      start_time: "13",
      start_min: "30",
      end_time: "14",
      end_min: "15",
    },
    {
      id: "2",
      name: "2-сабак",
      start_time: "14",
      start_min: "20",
      end_time: "15",
      end_min: "05",
    },
    {
      id: "3",
      name: "3-сабак",
      start_time: "15",
      start_min: "10",
      end_time: "15",
      end_min: "55",
    },
    {
      id: "4",
      name: "4-сабак",
      start_time: "16",
      start_min: "05",
      end_time: "16",
      end_min: "50",
    },
    {
      id: "5",
      name: "5-сабак",
      start_time: "16",
      start_min: "55",
      end_time: "17",
      end_min: "40",
    },
    {
      id: "6",
      name: "6-сабак",
      start_time: "17",
      start_min: "45",
      end_time: "18",
      end_min: "30",
    },
  ];
  // Баштапкы абалга келтирүү
  function startSmartFunc() {
    dispatch(setLocalTwo(StartSmartObjTwo));
    dispatch(setLocal(StartSmartObj));
    dispatch(getLocal());
    dispatch(getLocalTwo());
  }

  // Коңгуроону иштетүү функциялары
  function startSystem(e) {
    dispatch(muzAllStop())
    setSystems(e);
    setStarted(e);
    audioRef.current?.play();
    audioRefTwo.current?.play();
    audioRef.current?.pause();
    audioRefTwo.current?.pause();
  }

  console.log("started: ", started);
  console.log("system: ", systems);

  //   Коңгуроону токтотуу
  useEffect(() => {
    if (muzPause) {
      audioRef.current?.pause();
      audioRefTwo.current?.pause();
      audio.current.pause();
      audio2.current.pause();

      // setStarted(false);
      // oneMin();
    }
  }, [muzPause, muzOne, muzTwo]);

  function oneMin() {
    setTimeout(() => {
      setStarted(true);
    }, 40000);
  }
  // Убакытты текшүү
  useEffect(() => {
    if (!systems) return;
    if (!started) return;
    const interval = setInterval(() => {
      const h = new Date().getHours();
      const m = new Date().getMinutes();
      const hour = String(h).length == 1 ? "0" + String(h) : String(h);
      const min = String(m).length == 1 ? "0" + String(m) : String(m);
      console.log(hour, min);
      console.log(smartState);
      if (smartState.length > 0) {
        smartState.map((el) => {
          if (
            String(el.start_time) == String(hour) &&
            String(el.start_min) == String(min)
          ) {
            dispatch(muzOnePlay());
          } else if (
            String(el.end_time) == String(hour) &&
            String(el.end_min) == String(min)
          ) {
            dispatch(muzTwoPlay());
          } else {
            console.log("Убакыт туура келген жок 1");
          }
        });
      }

      if (smartStateTwo.length > 0) {
        smartStateTwo.map((el) => {
          if (
            String(el.start_time) == String(hour) &&
            String(el.start_min) == String(min)
          ) {
            dispatch(muzOnePlay());
          } else if (
            String(el.end_time) == String(hour) &&
            String(el.end_min) == String(min)
          ) {
            dispatch(muzTwoPlay());
          } else {
            console.log("Убакыт туура келген жок 2");
          }
        });
      }
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smartState, started, smartStateTwo]);

  //  Музыканы ойнотуу
  useEffect(() => {
    const savedAudio = localStorage.getItem("saved-audio");
    const savedAudioTwo = localStorage.getItem("saved-audioTwo");
    if (savedAudio) {
      setAudioSrc(savedAudio);
    }
    if (savedAudioTwo) {
      setAudioSrcTwo(savedAudioTwo);
    }
  }, [muzOne, muzTwo, muzPause]);

  useEffect(() => {
    if(!systems) return
    if (muzOne) {
      if (audioSrc !== null) {
        audioRef.current?.pause();
        audioRefTwo.current?.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setStarted(false);
        setTimeout(() => {
          audioRef.current?.pause();
          oneMin();
        }, number);
      } else {
        audio.current.currentTime = 0;
        audio.current.play();
        console.log("no 1");
        setStarted(false);
        setTimeout(() => {
          audio.current.pause();
          oneMin();
        }, number);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muzOne, muzPause, muzTwo]);

  useEffect(() => {
    if(!systems) return
    if (muzTwo) {
      // if (audioRefTwo.current) {
      if (audioSrcTwo !== null) {
        audioRef.current?.pause();
        audioRefTwo.current?.pause();
        audioRefTwo.current.currentTime = 0;
        audioRefTwo.current.play();
        setStarted(false);
        setTimeout(() => {
          audioRefTwo.current?.pause();
          oneMin();
        }, number);
      } else {
        audio2.current.currentTime = 0;
        audio2.current.play();
        console.log("no 2");
        setStarted(false);
        setTimeout(() => {
          audio2.current.pause();
          oneMin();
        }, number);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muzTwo, muzPause, muzOne]);
  // console.log(muzOne,muzTwo);
  // console.log(audioRefTwo.current.src);
  // console.log(audioRef.current.src);

  useEffect(() => {
    setSmartState(smart);
    setSmartStateTwo(smartTwo);
  }, [dispatch, smart, smartTwo]);
  // console.log(systems);

  if (loading)
    return (
      <div id="smart">
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          <CircularProgress color="success" />
        </Stack>
      </div>
    );
  return (
    <>
      <Header />
      <div id="smart">
        <Button
          style={{ display: `${smart.length > 3 ? "none" : "block"}` }}
          onClick={() => startSmartFunc()}
          variant="contained"
          color="success"
        >
          <div>
            <audio
              style={{ display: "none" }}
              ref={audioRef}
              src={audioSrc}
              controls
            />
            <audio
              style={{ display: "none" }}
              ref={audioRefTwo}
              src={audioSrcTwo}
              controls
            />
          </div>
          Ишке киргизүү
        </Button>
        <ListOne />
        <ListTwo />
        <FormControlLabel
          className="switch"
          control={
            <Switch checked={systems} onClick={() => startSystem(!systems)} />
          }
          label="Күйгүзүү"
        />
        <Footer />
        
      </div>
    </>
  );
}
export default SmartBell;
