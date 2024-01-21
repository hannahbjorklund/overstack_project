import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="container">
      <h1 className='title'>About</h1>
      <div>
        <div className = 'aboutBox'>
        <h1 className = 'category'>About the Creator</h1>
          <p>Hi! My name is Hannah. I am a fullstack software developer, gamer, and flexbox enthusiast from Minneapolis, MN.
            I first discovered my love for coding while I was studying physics in college. Since then, I've thrown myself
            into the realm of software development and have loved every minute of it {`:-)  `}
          </p>
          <br/>
          <p>

            Overstack is my first fullstack solo project! If you would like to check out the repo, you can visit <a href="https://github.com/hannahbjorklund/overstack_project">my GitHub. </a>
            You can also find me on <a href="https://www.linkedin.com/in/hannah-l-bjorklund/">LinkedIn.</a>
          </p>
          <br/>
          <p>
            I've been playing Overwatch 2 for over a year now, and meeting new friends in game has changed my life. I love playing
            support and five stacking comp with my friends. Brigitte mains unite! 
            <a href="https://emoji.gg/emoji/2351-brigittesmile"><img src="https://cdn3.emoji.gg/emojis/2351-brigittesmile.png" width="48px" height="48px" alt="BrigitteSmile"/></a>
          </p>
          <br/>
          <h1 className = 'category'> Tech Stack </h1>
          <p> This project uses the following languages/technologies:</p>
          <ul>
            <li>Node</li>
            <li>Javascript</li>
            <li>Axios</li>
            <li>Express</li>
            <li>Redux-Saga</li>
            <li>Passport</li>
            <li>React</li>
            <li>Bootstrap 5.0</li>
            <li>CSS</li>
            <li>HTML</li>
          </ul>

          <p>API: <a href={'https://overfast-api.tekrop.fr/'}>OverFast API</a></p>
          <br/>
          <h1 className = 'category'>Next Steps</h1>
          <ul>
            <li>Forgot password and user email</li>
            <li>Friend system overhaul</li>
            <li>Friend feed for posting clips and highlight reels</li>
            <li>Achievements and gamification</li>
          </ul>
          <br/>
          <h1 className = 'category'>Credits</h1>
          <p>Overstack utilizes many visual assests and statistics from Blizzard's game <a href="https://overwatch.blizzard.com/en-us/">Overwatch 2. </a> I do not claim to own these assets.

          </p>
          <br/>
          <h1 className = 'category'>Special Thanks</h1>
          <p>I'd like to give a huge thank you to my instructors Matt, Dane, Key, and Dev, as well as my mentors, and fellow
            classmates at Prime Digital Academy, whose support made this entire project possible. I would also like to thank my friends
            who gave me feedback and advice on Overstack and what features to implement. Thank you!!!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
