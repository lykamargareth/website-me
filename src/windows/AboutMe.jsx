function AboutMe() {
  return (
    <div className="email-window" style={{ paddingBottom: "0px" }}>

      {/* Top bar with the dots on the right */}
      <div className="title-bar-send">
        <div className="title-bar-icons-container">
          <p className="title-bar-icons">●</p>
          <p className="title-bar-icons">●</p>
          <p className="title-bar-icons">●</p>
        </div>
      </div>

      {/* Email header info (To, From, Subject) */}
      <div
        className="email-window-top"
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-start" 
        }}
      >
        <div className="title-bar-text" style={{ margin: 0 }}>
          to: <span className="under-hover"> you</span> 💖 <br />
          from: <span className="under-hover"> me</span> 🫶 <br />
          subject: a lil intro :)
        </div>

        <p className="title-bar-date" >
          date: april 10, 2003
        </p>
      </div>

      {/* Email body */}
      <div className="email-window-email scrollable-section">
        {/* <h2>Margareth Sabate</h2> */}
        {/* <h3>
          a mechatronics & robotics student blending tech projects with a love for
          creative art
        </h3> */}

        <p>
          dear future friend, ✨ <br /><br />
          i’m margareth, <br />
          an aspiring uni graduate with a whole life ahead of her, <br />
          full of robots, crafts, and cozy vibes &lt;3<br /><br />
          here’s a lil more about me :)
        </p>

        <h2>✨ education ✨</h2>
        <p>
          <strong>mechatronics & robotics diploma</strong> (present) - BCIT
        </p>

        <h2>🎨 hobbies and interests 🎨 </h2>
        <ul>
          <li>crafts hehe (crochet, sewing, drawing/painting, ceramics)</li>
          <li>binge watching tv shows and movies</li>
          <li>food (mostly eating, sometimes baking)</li>
          <li>fashion! (thrifting)</li>
        </ul>

        <p>
          <br/>
          with love,<br/>
          <br />
          <br />
          Margareth S
        </p>
      </div>
    </div>
  );
}

export default AboutMe;
