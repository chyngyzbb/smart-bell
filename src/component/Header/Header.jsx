import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import './Header.css'
const Header = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [min, setMin] = useState("");
  const [hour, setHour] = useState("");

  function getDate() {
    const mins = new Date().getMinutes();
    const hours = new Date().getHours();
    const days = new Date().getDay();
    const months = new Date().getMonth();
    const years = new Date().getFullYear();
    setMin(mins)
    setHour(hours)
    setDay(days);
    setMonth(months);
    setYear(years);
  }

  useEffect(() => {
    getDate();
  });
  return (
    <div>
      <header id="header">
          <div className="header">
          <div className="logo">
            <img width={190} src={logo} alt="img" />
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
              {String(hour).length > 1 ? hour : "0"+String(hour) }:{String(min).length > 1 ? min : "0"+ String(min)}
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
