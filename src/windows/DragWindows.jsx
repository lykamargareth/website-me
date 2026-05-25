import { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable'; // package for draggable windows


function DragWindows({ onClose, bringToFront, win, content: Content }) {
  const nodeRef = useRef(null); // ref to the draggable DOM element
  const [isClosing, setIsClosing] = useState(false); // triggers closing CSS animation
  const [position, setPosition] = useState(win.pos); // tracks window position

  // bring window to front when it first opens
  useEffect(() => {
    bringToFront();
  }, []);

  // triggers CSS fade-out animation then removes the window after 300ms
  const handleClose = () => {
    setIsClosing(true);           
    setTimeout(() => onClose(), 300); 
  };

  return (
    <Draggable 
      handle=".title-bar" 
      nodeRef={nodeRef} 
      position={position} 
      // defaultPosition={position}           
      onDrag={(e, data) => {
        void e; // i dont need this e 
        setPosition({ x: data.x, y: data.y });
      }}
      onStart={bringToFront} 
    >
      <div
        className={`window-main ${win.type || 'default'}-window ${isClosing ? 'closing' : ''}`}
        ref={nodeRef}
        onMouseDown={bringToFront}
        onPointerDown={bringToFront}
        style= {{ 
        zIndex: win.zIndex || 1  , 
        }}
      >
        <div className="title-bar">
          <span>{win.type.toLowerCase()}</span>
          <button className='close-button' onClick={handleClose}>X</button>
        </div>

        <div className="window-body">
          <Content handleClose={handleClose} />
        </div>

      </div>
    </Draggable>
  );
}

export default DragWindows;

// what you need to do: make multiple dragWind for each thing u want
// maybe make it so the button thing is in its own file
