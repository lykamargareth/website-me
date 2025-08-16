import { useState, useEffect } from 'react';

function Skills() {
  const [activeTab, setActiveTab] = useState('software');
  const [terminalLines, setTerminalLines] = useState([]);


  const skillsData = {
    software: [
      "C/C++",
      "Python",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "MATLAB",
      "Solidworks/CAD",
      "Circuitmaker",
      "LTSpice",
      "CNC - G Code",
      "KiCad",
      "SCARA Robot Programming"
    ], 
    hardware: [
      "Welding",
      "Soldering",
      "Machining (lathes, milling, drilling)",
      "Oscilloscope",
      "Multimeter",
      "Basic electronic components",
      "Breadboarding",
      "Arduino / microcontrollers",
      "Plastics (vacuum & injection forming)"
    ] 
  };

  const terminalPrompt = "lyka@cozy-pc:~$";
  const otherTab = Object.keys(skillsData).find(tab => tab !== activeTab);


  useEffect(() => {
    setTerminalLines(skillsData[activeTab].map(skill => `- ${skill}`));
  }, [activeTab]);


  return (
    <div className="terminal-body">
      {/* top: showing current active tab */}
      <div className="terminal-active-tab">
        {terminalPrompt} [{activeTab}] skills
      </div>

      {/* output skills */}
      <div className="terminal-output">
        {terminalLines.map((line, i) => (
          <div key={i} className="terminal-line">{line}</div>
        ))}
      </div>

      {/* bottom: button to switch to the other tab*/}
      <div className="terminal-bottom">
      
        <div style={{ display: 'inline-flex'}}>
          <span className="terminal-output">{terminalPrompt} </span>
          
          <button 
            className="terminal-command-button under-hover"
            onClick={() => setActiveTab(otherTab)}
          >
            <span>show {otherTab} skills</span>
            <span className="terminal-cursor">&nbsp;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Skills;
