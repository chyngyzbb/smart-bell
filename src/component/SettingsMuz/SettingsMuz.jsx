import { useEffect, useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
function SettingsMuz({ counter }) {
  const [audioSrc, setAudioSrc] = useState(null);
  const audioRef = useRef(null);
  const [audioSrcTwo, setAudioSrcTwo] = useState(null);
  const audioRefTwo = useRef(null);
  //  Колдонуучу файл тандаганда
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      //  base64 кылып окуу
      reader.onload = function (event) {
        const base64String = event.target.result;
        //  localStorage'ке сактоо
        if (counter == 1) {
          setAudioSrc(base64String);
          localStorage.setItem("saved-audio", base64String);
        } else {
          setAudioSrcTwo(base64String);
          localStorage.setItem("saved-audioTwo", base64String);
        }
      };

      reader.readAsDataURL(file); // <-- base64 форматка окулат
    }
  };

  //  useEffect аркылуу localStorage'тен окуу
  useEffect(() => {
    const savedAudio = localStorage.getItem("saved-audio");
    const savedAudioTwo = localStorage.getItem("saved-audioTwo");
    if (savedAudio) {
      setAudioSrc(savedAudio);
    }
    if (savedAudioTwo) {
      setAudioSrcTwo(savedAudioTwo);
    }
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <h4>
        Музыка жүктөп, {counter == 1 ? "кирүүчү" : "чыгуучу"} коңгуроо оордуна
        колдонуңуз
      </h4>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      {counter == 1
        ? audioSrc && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <audio ref={audioRef} src={audioSrc} controls />
              <div
                style={{ marginTop: "10px", display: "flex", gap: "10px" }}
              ></div>
            </div>
          )
        : audioSrcTwo && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <audio ref={audioRefTwo} src={audioSrcTwo} controls />
              <div
                style={{ marginTop: "10px", display: "flex", gap: "10px" }}
              ></div>
            </div>
          )}
    </div>
  );
}

export default SettingsMuz;
