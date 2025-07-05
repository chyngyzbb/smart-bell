import { FaRegStopCircle } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { muzAllStop, muzOnePlay, muzTwoPlay } from "../../store/slice/muzSlice";
import './Footer.css'

const Footer = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <footer className="footer">
        <p>
          <FaRegCirclePlay
            className="icon-footer"
            onClick={() => dispatch(muzOnePlay())}
          />
          Кирүү
        </p>
        <p>
          <FaRegStopCircle
            className="icon-footer"
            onClick={() => dispatch(muzAllStop())}
          />
          Токтотуу
        </p>
        <p>
          <FaRegCirclePlay
            className="icon-footer"
            onClick={() => dispatch(muzTwoPlay())}
          />
          Чыгуу
        </p>
      </footer>
    </div>
  );
};

export default Footer;
