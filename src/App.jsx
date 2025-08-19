import { useState } from 'react';
import { ButtonsMain , MenuBar , Title } from './index';

import './index.css';

function App() {
  const [windows, setWindows] = useState([]);

  function closeAllWindows() {
    setWindows([]); // clears all
  }

  return (
    <div>
      <MenuBar onAppleClick={closeAllWindows} />
      <Title />
      <ButtonsMain windows={windows} setWindows={setWindows} />
    </div>
  );
}

export default App;


{/* 
  need to do:
  -make animation for open and closing tabs 
  -maybe make windows not spawn on the buttons/dock

  ideas:
  chatbox thing:
  MAYBE MAKE IT CHATGPT
  this could be for a q&a about me
    - a bot (bestie) or sum asks you questions and i anwser eheh
    - maybe telegram or messages app or sum

  corkboard/sticky note board:
  for my hobbies and little notes
    - Photo pins with draggable Polaroid frames
    - Favorite songs or playlist display
    - Hobbies list with icons or post-it style
    - Random sticky notes with quotes or doodles
    - Moodboard collage of images
    - Fun fact or random message generator

    - Wobble on hover (like a sticker peeling off)
  
  */}