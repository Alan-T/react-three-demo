import { useEffect, useState,useRef } from "react";
import "./Header.css";
import dayjs from "dayjs";
dayjs.locale('zh-cn')

function Header() {
  const [dateTime, setDatetime] = useState(dayjs());
  const intervalRef = useRef(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDatetime(dayjs());
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="header-container">
      <div className="left">
        <div className="time">{dateTime.format("HH:mm:ss")}</div>{" "}
        <div className="date">{dateTime.format("YYYY-MM-DD")}</div>
      </div>
      <div className="mid">智能仓储3D实时监控</div>
      <div className="right"></div>
    </div>
  );
}

export default Header;
