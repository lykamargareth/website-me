import { useState } from "react";
import { capstoneCloseShot, capstoneGroupPhoto, capstonePrinterShot, capstoneTimelapse, angleMonitor,
         capstoneReport, PLCreport, pianoReport
      } from '../assets/images';


const projects = [
  {
    id: 1,
    name: "non-planar 3D printer",
    date: "jan - may 2026",
    type: "capstone",
    size: "5-DoF",
    content: (
      <div>
        <h3 style={{ marginBottom: '0' }}>✨BCIT mechatronics and robotics final capstone✨</h3>
        <p style={{ marginTop: '0' }} >margareth sabate, keaton westcott, kassia ferguson</p>

        <img src={capstonePrinterShot} alt="3D Printer" style={{ width: '60%', borderRadius: '6px' }} />
        <p>
          this capstone project was sponsored by BCIT's additive manufacturing group, who challenged us to 
          design a 5-DoF non-planar 3D printing system as a stepping stone towards metal printing in the future. 
          traditional 3D printers need support structures for overhanging shapes, which is especially painful 
          in metal printing because the supports fuse to the part and are a nightmare to remove. non-planar 
          printing solves this by tilting the build plate so the nozzle always prints perpendicular to the surface.
        </p>

        <img src={capstoneCloseShot} alt="3D Printer" style={{ width: '60%', borderRadius: '6px' }} />
        <p>
          we were given an existing CoreXY printer and added a custom turntable that tilts and rotates the print bed, 
          a modified slicer, and a real-time monitoring system. this lets the printer handle complex overhanging 
          shapes without any support structures.
        </p>

        <img src={angleMonitor} alt="3D Printer" style={{ width: '60%', borderRadius: '6px' }} />
        <p>
          i led the angle monitoring system, a system to ensure the bed was always at the 
          right angle during printing. we built a safety system that tracks the bed's tilt in real time and 
          alerts the user if something goes wrong. it's displayed on both the printer's built in web interface and a custom live 
          3D dashboard that's connected over WiFi. the printer ran for 3 to 4 hour sessions with zero issues.
        </p>

        <img src={capstoneGroupPhoto} alt="3D Printer" style={{ width: '60%', borderRadius: '6px' }} />
        <p style={{ marginBottom: '30px' }}>
          P.S. thank you to the BCIT photography team for these AMAZING photos
        </p>

        <p>
          ALSO if you wanna get more into the technical side of out project,
          feel free to take a look at our report linked below ↓
        </p>
        <a href={capstoneReport} target="_blank" rel="noreferrer">📄click here for the report</a>

        <p style={{ marginTop: '50px' }}>
          PLEASEE enjoy this timelapse of our printer printing :)
        </p>

        <video 
          src={capstoneTimelapse} 
          controls 
          style={{ width: '95%', borderRadius: '6px' }} 
        />
      </div>
    ),
  },
  {
    id: 2,
    name: "four-floor elevator PLC system",
    date: "mar - apr 2026",
    type: "PLC",
    size: "4 floors",
    content: (
      <div>
        <h3 style={{ marginBottom: '0' }}>✨ BCIT PLC applications project ✨</h3>
        <p style={{ marginTop: '0' }}>margareth sabate</p>

        <p>
          this project was a four-floor elevator controller built using an allen-bradley CompactLogix PLC. 
          the elevator handles multiple floor calls at once, manages its own doors, queues requests 
          intelligently, and has a full emergency stop system with two different behaviors depending on 
          whether the elevator is moving or stopped at a floor.
        </p>

        <p>
          i also added a bonus feature that adds a PIN-protected penthouse floor that's only accessible through 
          an HMI touchscreen. once you enter the correct code, only then the elevator take you to floor 4. 
          i got a perfect score on all 9 parts :)
        </p>

        <p>
          for more info about this project or wanna go through all 
          my lines of ladder logic for FUN!
          everythings linked below ↓
        </p>
        <a href={PLCreport} target="_blank" rel="noreferrer">📄click here for the report</a>
        <br />
        <a href="/Elevator.zip" download>📦 download ladder logic zip</a>
      </div>
    ),
  },
  {
    id: 3,
    name: "555 piano circuit",
    date: "may 2025",
    type: "circuit",
    size: "12 keys",
    content: (
      <div>
        <h3 style={{ marginBottom: '0' }}>✨ BCIT digital and electronic circuits project ✨</h3>
        <p style={{ marginTop: '0' }}>margareth sabate</p>

        <p>
          a 12-key piano circuit built on a breadboard using 555 timer chips. each button plays a 
          different musical note by switching resistor values to output different frequencies, 
          with a toggle switch that shifts the piano up or down an octave. 
          i calculated the resistor combinations for all 12 chromatic 
          notes to keep the frequencies as accurate as possible.
        </p>

        <p>
          i also tried adding a sound modulation feature to make the notes sound more robotic using 
          an AND gate, it was partially successful and a fun experiment to try :)
        </p>
        <p>
          I sadly don't have any photos of my circuit :( but ill link my report
          with the schematic below if you REALLY wanna build it yourself :)))
        </p>
        <a href={pianoReport} target="_blank" rel="noreferrer">📄click here for the report</a>

      </div>
    ),
  },
];

function Projects() {
  const [openId, setOpenId] = useState(null);
  const VISIBLE = 3;

  function handleFolderClick(id) {
    setOpenId(prev => (prev === id ? null : id));
  }

  function handlePrev() {
    if (openId === null) {
      setOpenId(projects[projects.length - 1].id); // go to last if nothing open
    } else {
      const currentIndex = projects.findIndex(p => p.id === openId);
      if (currentIndex > 0) setOpenId(projects[currentIndex - 1].id);
    }
  }

  function handleNext() {
    if (openId === null) {
      setOpenId(projects[0].id); // go to first if nothing open
    } else {
      const currentIndex = projects.findIndex(p => p.id === openId);
      if (currentIndex < projects.length - 1) setOpenId(projects[currentIndex + 1].id);
    }
  }

  function handleClose() {
    setOpenId(null);
  }

  const openProject = projects.find(p => p.id === openId);
  const currentIndex = projects.findIndex(p => p.id === openId);

  return (
    <div className="projects-container">

      {/* toolbar */}
      <div className="explorer-toolbar">
        <button
          className={`explorer-toolbar-btn ${openId && currentIndex === 0 ? 'explorer-toolbar-btn-disabled' : ''}`}
          onClick={handlePrev}
        >←</button>
        <button
          className={`explorer-toolbar-btn ${openId && currentIndex === projects.length - 1 ? 'explorer-toolbar-btn-disabled' : ''}`}
          onClick={handleNext}
        >→</button>
        <button
          className={`explorer-toolbar-btn ${!openId ? 'explorer-toolbar-btn-disabled' : ''}`}
          onClick={handleClose}
        >✖</button>
        <span className="explorer-toolbar-divider" />
        <span className="explorer-path">lykamargareth / projects {openId ? `/ ${openProject.name}` : ''}</span>
        <span className="explorer-toolbar-right">🔍 search projects</span>
      </div>

      {/* column headers */}
      <div className="explorer-header">
        <span className="col-name">Name</span>
        <span className="col-date">Date</span>
        <span className="col-type">Type</span>
        <span className="col-size">Size</span>
      </div>

      {/* folder list */}
      <div className="folder-list scrollable-section">
        {projects.map(project => (
          <div
            key={project.id}
            className={`folder-row ${openId === project.id ? 'folder-open' : ''}`}
            onClick={() => handleFolderClick(project.id)}
          >
            <span className="col-name">
              <span className="folder-icon">{openId === project.id ? '📂' : '📁'}</span>
              {project.name}
            </span>
            <span className="col-date">{project.date}</span>
            <span className="col-type">{project.type}</span>
            <span className="col-size">{project.size}</span>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="explorer-footer">
        {projects.length} items
        {openId && <span style={{ marginLeft: '8px', color: '#555' }}>| {currentIndex + 1} of {projects.length}</span>}
      </div>

      {/* preview panel */}
      {openProject && (
        <div className="folder-preview">
          <div className="folder-preview-header">
            📂 {openProject.name}
          </div>
          <div className="folder-preview-content scrollable-section">
            {openProject.content}
          </div>
        </div>
      )}

    </div>
  );
}

export default Projects;