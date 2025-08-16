import { useState } from 'react';
import { AboutMe, Skills, Contact, Funzies } from './windows';
import { default as DragWindows } from './dragWindows';



function ButtonsMain () {
    const [windows, setWindows] = useState([]); 
    const [topZ, setTopZ] = useState(5);


    const components = {
        win1: { title: 'AboutMe', component: AboutMe, type: 'email' },
        win2: { title: 'Skills', component: Skills, type: 'terminal' },
        win3: { title: 'Contact', component: Contact, type: 'chrome' },
        win4: { title: 'Funzies', component: Funzies, type: 'funzies' }
    };

    function getRandomPos ( windowWidth = 500 , windowHeight = 400 ) {

        const padding = 10;
        const maxX = window.innerWidth - windowWidth - padding;
        const maxY = window.innerHeight - windowHeight - padding;

        const x = Math.floor(Math.random() * (maxX - padding + 1)) + padding;
        const y = Math.floor(Math.random() * (maxY - padding + 1)) + padding;

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