import { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable'; // package for draggable windows


function DragWindows({ onClose, bringToFront, win, content: Content }) {
  const nodeRef = useRef(null); // ref to the draggable DOM element
  const [isClosing, setIsClosing] = useState(false); // triggers closing CSS animation
  const [position, setPosition] = useState(win.pos); // tracks window position
  const [maximized, setMaximized] = useState(false); // toggles fullscreen mode

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
    // outer wrapper handles centering when maximized so it doesnt conflict with draggable's transform
    <div className={maximized ? 'maximized-overlay' : ''}>
      <Draggable 
        key={maximized ? 'max' : 'normal'} // remounts on toggle, clears internal offset
        handle=".title-bar" 
        nodeRef={nodeRef} 
        position={maximized ? { x: 0, y: 0 } : position} // lock to corner when maximized
        // defaultPosition={position}           
        disabled={maximized} // cant drag when maximized
        onDrag={(e, data) => {
          void e; // i dont need this e 
          setPosition({ x: data.x, y: data.y });
        }}
        onStart={bringToFront} 
      >
        <div
          className={`window-main ${win.type || 'default'}-window ${isClosing ? 'closing' : ''} ${maximized ? 'maximized' : ''}`}
          ref={nodeRef}
          onMouseDown={bringToFront}
          onPointerDown={bringToFront}
          style={{ zIndex: win.zIndex || 1 }}
        >
          <div className="title-bar">
            <span>{win.type.toLowerCase()}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {/* toggles between maximize and restore */}
              <button className='maximize-button' onClick={() => setMaximized(m => !m)}>
                {maximized ? '⊡' : '⛶'}
              </button>
              <button className='close-button' onClick={handleClose}>X</button>
            </div>
          </div>

          <div className={`window-body ${maximized ? 'window-body-maximized' : ''}`}>
            <Content handleClose={handleClose} />
          </div>

        </div>
      </Draggable>
    </div>
  );
}

export default DragWindows;

// what you need to do: make multiple dragWind for each thing u want
// maybe make it so the button thing is in its own file