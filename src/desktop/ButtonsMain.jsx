import React, { useState, useRef, useEffect } from 'react';
import { AboutMe, Skills, Contact, Projects, DragWindows } from '../index';
import { mailIcon, chromeIcon, terminalIcon, projectsIcon } from '../assets/images';

// each window's config: what component to render, what type it is, and what icon to show in the dock
const components = {
  win1: { title: 'AboutMe', component: AboutMe, type: 'email', icon: mailIcon },
  win2: { title: 'Skills', component: Skills, type: 'terminal', icon: terminalIcon },
  win3: { title: 'Contact', component: Contact, type: 'chrome', icon: chromeIcon },
  win4: { title: 'Projects', component: Projects, type: 'projects', icon: projectsIcon }
};

// convert the components object into an array so we can use .map()
const icons = Object.entries(components);
const maxScale = 1.8; // max scale for dock icon

function ButtonsMain({ windows, setWindows }) {
  const [topZ, setTopZ] = useState(5);      // tracks the highest zIndex so far
  const [scales, setScales] = useState([]); // stores the scale of each dock icon
  const dockRef = useRef();                 // ref to the dock bar element
  const iconRefs = useRef([]);              // refs to each individual icon button

  // create a ref for each icon button once on mount so we can measure their positions
  useEffect(() => {
    iconRefs.current = icons.map(() => React.createRef());
  }, []);

  // opens a window if it's not already open, otherwise just brings it to front
  function openWindow(id, title) {
    const existing = windows.find(win => win.id === id);
    if (!existing) {
      const { x, y } = getRandomPos();
      const type = components[id].type;
      setWindows(current => [...current, {
        id, title, type,
        spawnPos: { x, y },
        pos: { x, y }
      }]);
    } else {
      bringToFront(id);
    }
  }

  // removes the window with the given id from the windows array (closes window)
  function closeWindow(id) {
    setWindows(current => current.filter(win => win.id !== id));
  }

  // gives the target window the current highest zIndex, then increments topZ for next time
  function bringToFront(id) {
    setWindows(current => current.map(win =>
      win.id === id ? { ...win, zIndex: topZ } : win
    ));
    setTopZ(prev => prev + 1);
  }

// returns the scale for a single icon based on how far the cursor is from its center
function getIconScale(pointerX, iconRect, dockRect) { // pointerX: cursor x relative to dock, iconRect: icon bounds, dockRect: dock bounds
  const iconCenter = iconRect.left + iconRect.width / 2 - dockRect.left; // icon center relative to dock
  const dist = Math.abs(pointerX - iconCenter);                           // distance from cursor to icon center
  return Math.min(Math.max(1, maxScale - dist / 100), maxScale);                   // clamp scale between 1 and 1.8
}

// calculates how much to scale each dock icon based on cursor distance from icon center
const handleDockMouseMove = (e) => {
  const dockRect = dockRef.current.getBoundingClientRect(); // dock position on screen
  const pointerX = e.clientX - dockRect.left;              // cursor x relative to dock

  const newScales = iconRefs.current.map(ref => {
    const iconRect = ref.current?.getBoundingClientRect();  // icon position on screen
    if (!iconRect) return 1;                                // default to normal scale if icon not found
    return getIconScale(pointerX, iconRect, dockRect);
  });

  setScales(newScales); // trigger re-render with new scales
};

  return (
    <div>
      {/* dock bar */}
      <div
        ref={dockRef}
        className="button-row"
        onMouseMove={handleDockMouseMove}
        onMouseLeave={() => setScales([])} // reset scales when mouse leaves dock
      >
        {/* render a button for each window */}
        {icons.map(([id, { title, icon }], idx) => (
          <button
            key={id}
            ref={iconRefs.current[idx]}
            className="button-general"
            onClick={() => openWindow(id, title)}
            style={{
              transform: `scale(${scales[idx] || 1})`, // apply zoom scale
            }}
          >
            {/* show icon image if available, otherwise show title text */}
            {icon ? (
              <img src={icon} alt={title} className="button-icon" />
            ) : (
              title.toLowerCase()
            )}
          </button>
        ))}
      </div>

      {/* render each open window inside a DragWindows wrapper */}
      {windows.map(win => {
        const Component = components[win.id].component; // look up which component to render
        return (
          <DragWindows
            key={win.id}
            win={win}
            onClose={() => closeWindow(win.id)}
            bringToFront={() => bringToFront(win.id)}
            setPosition={newPos =>
              setWindows(current =>
                current.map(w => w.id === win.id ? { ...w, pos: newPos } : w)
              )
            }
            content={Component}
          />
        );
      })}
    </div>
  );
}

// calculates a random x/y position that keeps the window within the screen bounds
function getRandomPos(windowWidth = 500, windowHeight = 400, topPadding = 150, sidePadding = 10) {
  const buttonRowHeight = document.querySelector('.button-row')?.offsetHeight ?? 60; // get the dock height, if null use 60
  const maxX = window.innerWidth - windowWidth - sidePadding;
  const maxY = window.innerHeight - windowHeight - buttonRowHeight - topPadding;
  return {
    x: Math.floor(Math.random() * (maxX - sidePadding + 1)) + sidePadding,
    y: Math.floor(Math.random() * (maxY - topPadding + 1)) + 150,
  };
}

export default ButtonsMain;