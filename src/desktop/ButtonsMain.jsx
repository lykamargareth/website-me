import React, { useState, useRef, useEffect } from 'react';
import { AboutMe, Skills, Contact, Funzies, DragWindows } from '../index';
import TerminalIcon from '../assets/Terminal-icon.png';
import MailIcon from '../assets/Mail-icon.png';
import ChromeIcon from '../assets/Chrome-icon.png';

function ButtonsMain({ windows, setWindows }) {
  const [topZ, setTopZ] = useState(5);
  const dockRef = useRef();
  const [scales, setScales] = useState([]);
  const iconRefs = useRef([]);

  const components = {
    win1: { title: 'AboutMe', component: AboutMe, type: 'email', icon: MailIcon },
    win2: { title: 'Skills', component: Skills, type: 'terminal', icon: TerminalIcon },
    win3: { title: 'Contact', component: Contact, type: 'chrome', icon: ChromeIcon },
    win4: { title: 'Funzies', component: Funzies, type: 'funzies', icon: null }
  };

  const icons = Object.entries(components);

  // Initialize refs (only once)
  useEffect(() => {
    iconRefs.current = icons.map(() => React.createRef());
  }, []);

  function getRandomPos(windowWidth = 500, windowHeight = 400, topPadding = 150, sidePadding = 10) {
    const buttonRow = document.querySelector('.button-row');
    const buttonRowHeight = buttonRow ? buttonRow.offsetHeight : 60;
    const maxX = window.innerWidth - windowWidth - sidePadding;
    const maxY = window.innerHeight - windowHeight - buttonRowHeight - topPadding;
    const x = Math.floor(Math.random() * (maxX - sidePadding + 1)) + sidePadding;
    const y = Math.floor(Math.random() * (maxY - topPadding + 1)) + 150;
    return { x, y };
  }

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

  function closeWindow(id) {
    setWindows(current => current.filter(win => win.id !== id));
  }

  function bringToFront(id) {
    setWindows(current => current.map(win =>
      win.id === id ? { ...win, zIndex: topZ } : win
    ));
    setTopZ(prev => prev + 1);
  }

  // 🎯 Mouse move scaling logic
  const handleMouseMove = (e) => {
    const dockRect = dockRef.current.getBoundingClientRect();
    const pointerX = e.clientX - dockRect.left;

    const newScales = iconRefs.current.map(ref => {
      const iconRect = ref.current?.getBoundingClientRect();
      if (!iconRect) return 1;
      const iconCenter = iconRect.left + iconRect.width / 2 - dockRect.left;
      const dist = Math.abs(pointerX - iconCenter);
      const scale = Math.max(1, 1.8 - dist / 100); // adjust falloff
      return Math.min(scale, 1.8);
    });

    setScales(newScales);
  };

  return (
    <div>
      <div
        ref={dockRef}
        className="button-row"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setScales([])}
      >
        {icons.map(([id, { title, icon }], idx) => (
          <button
            key={id}
            ref={iconRefs.current[idx]}
            className="button-general"
            onClick={() => openWindow(id, title)}
            style={{
              transform: `scale(${scales[idx] || 1})`,
            }}
          >
            {icon ? (
              <img src={icon} alt={title} className="button-icon" />
            ) : (
              title.toLowerCase()
            )}
          </button>
        ))}
      </div>

      {windows.map(win => {
        const Component = components[win.id].component;
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

export default ButtonsMain;