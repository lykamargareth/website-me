import { Typewriter } from 'react-simple-typewriter'

function Contact() {
  
  return (
    <div>
        <div className="content">
          <h1 className="chrome-name" >Moogle</h1>
          <div className="chrome-search-tab">
            <span className="chrome-search-word">
              <Typewriter 
                words={[
                  "plz talk to me", 
                  "hii!! i'm margareth <3",
                  "let's be friends!",
                  "🐮💖",
                  "sending u a virtual hug 🤍",
                  "hope ur having a sweet day 🍓",
                  "don’t forget to drink water 💧🌸",
                  "thinking kind thoughts for u 🌷",
                  "hope something makes u smile today ☁️",
                  "hi hi!! hope ur cozy 💗",
                  "wishing u a soft moment today ✨",
                  "slayyyyy",
                  "i'm glad u stopped by 🐇",
                  "sending comfort & calm 🫶",
                  "rest is good too 🌙",
                  "u r always welcome here 🍯"
                ]}
                loop={Infinity}
                cursor
                cursorStyle='|'
                typeSpeed={95}
                deleteSpeed={60}
                delaySpeed={1000}
                // onLoopDone={handleDone}
                // onType={handleType}
              />
  
            </span>

          </div>
          <div className="chrome-row-button">
            <button className="chrome-button" onClick={() => window.location.href = 'mailto:lykamargareth03@gmail.com'}>
              email
            </button>

            <a href="https://www.linkedin.com/in/margareth-sabate-46736625a" target="_blank" rel="noopener noreferrer">
              <button className="chrome-button" >
                linkedin
              </button>
            </a>

            <a href="https://discordapp.com/users/801344679156645898"  target="_blank" rel="noopener noreferrer">
              <button className="chrome-button" >
                discord
              </button>
            </a>

            <a href="https://github.com/lykamargareth"  target="_blank" rel="noopener noreferrer">
              <button className="chrome-button" >
                github
              </button>
            </a>
          </div>
        </div>
    </div>
  );
}

export default Contact;