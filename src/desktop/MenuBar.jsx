import { useState , useEffect } from "react";
import { useBattery , useInterval } from 'react-use';
import HeartIcon from '../assets/Heart-icon.png';

function MenuBar({ onHeartClick }) {
  // const [time, setTime] = useState("");

  function Time() {
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    const [time, setTime] = useState(new Date().toLocaleTimeString([] , options));

    useInterval(() => {
      setTime(new Date().toLocaleTimeString([], options)); 
    }, 60000); 

    return <span>🕒 {time}</span>;
  }

  function BatteryStatus() {
    const batteryState = useBattery();

    if (!batteryState.supported) return <span>100%</span>;

    const batteryPercentage = Math.round(batteryState.level * 100);

    return <span>{batteryPercentage}%</span>;
  }

  
  return (
    <div className="menu-bar">
      <div className="menu-left">
        <div className="menu-item" onClick={onHeartClick}>
          <img src={HeartIcon} alt="heart" className="Heart-icon" style={{ width: '30px', height: '30px' }} />
        </div>
        {/* <div className="menu-item"><strong>finder</strong></div>
        <div className="menu-item">file</div>
        <div className="menu-item">edit</div>
        <div className="menu-item">view</div>
        <div className="menu-item">go</div>
        <div className="menu-item">window</div>
        <div className="menu-item">help</div> */}
      </div>
      <div className="menu-right">
        <div className="menu-item"><BatteryStatus /></div>
        <div className="menu-item"><Time /></div>
      </div>
    </div>
  );
}

export default MenuBar;
