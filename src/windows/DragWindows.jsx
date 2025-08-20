import { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';


function DragWindows({ onClose, bringToFront, win, content: Content }) {
  const nodeRef = useRef(null); // Ref for the draggable element
  const [isClosing, setIsClosing] = useState(false);
  const [position, setPosition] = useState(win.pos);

  useEffect(() => {
    bringToFront();
  }, []);

  const handleClose = () => {
    setIsClosing(true);           // trigger CSS fade
    setTimeout(() => onClose(), 300); // remove after animation
  };

  
  return (
    <Draggable 
      handle=".title-bar" 
      nodeRef={nodeRef} 
      position={position} 
      // defaultPosition={position}           
      onDrag={(e, data) => {
        void e; // i dont need this e shit
        setPosition({ x: data.x, y: data.y });
      }}
      onStart={bringToFront} 
    >
      <div
        className={`window-main ${win.type || 'default'}-window ${isClosing ? 'closing' : ''}`}
        ref={nodeRef}
        onMouseDown={bringToFront}
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
