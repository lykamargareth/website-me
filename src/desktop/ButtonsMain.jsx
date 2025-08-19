import { useState } from 'react';
import { AboutMe, Skills, Contact, Funzies, DragWindows } from '../index';


function ButtonsMain({ windows, setWindows }) {
    const [topZ, setTopZ] = useState(5);


    const components = {
        win1: { title: 'AboutMe', component: AboutMe, type: 'email' },
        win2: { title: 'Skills', component: Skills, type: 'terminal' },
        win3: { title: 'Contact', component: Contact, type: 'chrome' },
        win4: { title: 'Funzies', component: Funzies, type: 'funzies' }
    };


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
        const existingWindow = windows.find(win => win.id === id);

        // Check if this window is already open
        if (!existingWindow) {

            const { x, y } = getRandomPos();
            const type = components[id].type;

            setWindows(current => [
            ...current,
            { 
                id, 
                title,
                type,
                spawnPos: { x , y }, // store random position
                pos: { x, y }, 
            }
            ]);
        } else {
            bringToFront(id);
        }
    }

    function closeWindow(id) {
    setWindows(current => current.filter(win => win.id !== id));
    }

    function bringToFront(id) {
    setWindows(current =>
        current.map(win =>
        win.id === id ? { ...win, zIndex: topZ } : win
        )
    );
    setTopZ(prev => prev + 1);
    }


    return (
    <div>
        <div className="button-row">
            {Object.entries(components).map(([id, { title }]) => (
                <button
                    key={id}
                    className="button-general"
                    onClick={() => openWindow(id, title)}
                >
                    {title.toLowerCase()}
                </button>
            ))}
        </div>

        {windows.map(win => {
        const Component = components[win.id].component; // .component so it passes the id not the whole object
        return (
            <DragWindows
            key={win.id}
            win={win} // pass the window object
            onClose={() => closeWindow(win.id)}
            bringToFront={() => bringToFront(win.id)}
            // style={{ zIndex: win.zIndex || 1 }}
            setPosition={newPos =>
            setWindows(current =>
            current.map(w => w.id === win.id ? { ...w, pos: newPos } : w)
                )
            }
            content= {Component}
            />
        );
        })}
    </div>
    );

}

export default ButtonsMain