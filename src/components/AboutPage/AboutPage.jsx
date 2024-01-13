import React from 'react';
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <h1 className='title'>About</h1>
      <div>
        <div className = 'aboutBox'>
          <h1 className = 'category'> Tech Stack </h1>
          <p>This project uses the following languages/technologies:</p>
          <ul>
            <li>CSS</li>
            <li>HTML</li>
            <li>Bootstrap 5.0</li>
            <li>Javascript</li>
            <li>Node.js</li>
            <li>React.js</li>
          </ul>

          <p>API: <a href={'https://overfast-api.tekrop.fr/'}>OverFast API</a></p>
          <br/>
          <h1 className = 'category'>Next Steps</h1>
          <ul>
            <li>MyStack leaderboards</li>
            <li>Add average stats</li>
            <li>Friend system overhaul</li>
            <li>Create a friend feed for posting clips and highlight reels</li>
          </ul>
          <br/>
          <h1 className = 'category'>Special Thanks</h1>
          <p>I'd like to give a huge thank you to Matt, Dane, Key, and Dev, as well as my other instructors, mentors, and fellow
            classmates at Prime Digital Academy, whose support made this entire project possible. I would also like to thank my friends
            who gave me feedback and advice on OverStack and what features to implement. Thank you!!!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
