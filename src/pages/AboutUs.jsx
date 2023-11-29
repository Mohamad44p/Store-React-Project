// React component for the card
import React from 'react';
import '../Styles/AboutUs.css'; 
import Mohamad from '../Assets/Mohamad.jpeg'
import chatgpt from '../Assets/chatgpt.png'
import elonmusk from '../Assets/elon-musk.webp'
const AboutUs = () => {
  return (
    <div className="Hello">
       <div className="cards">
      <div className="card-image-container">
        <img src={chatgpt} alt="Profile" className="card-image" />
      </div>
      <div className="card-content">
        <h1 className="card-title">Elon Musk</h1>
        <p className="card-text">
        I am the personal assistant of this great programmer and I can help everyone in anything I am waiting for you and thank you  😉
        </p>
        <button className="card-button">Contact Me</button>
      </div>
    </div>


    <div className="cards">
      <div className="card-image-container">
        <img src={Mohamad} alt="Profile" className="card-image" />
      </div>
      <div className="card-content">
        <h1 className="card-title">Elon Musk</h1>
        <p className="card-text">
        I am the programmer who did the very great project that topped the talk of the whole world yes it's me Mohamad Thank you for the warm applause. I am ashamed of these moments. 🧛‍♂️
        </p>
        <button className="card-button">Contact Me</button>
      </div>
    </div>

   


    <div className="cards">
      <div className="card-image-container">
        <img src={elonmusk} alt="Profile" className="card-image" />
      </div>
      <div className="card-content">
        <h1 className="card-title">Elon Musk</h1>
        <p className="card-text">
        I am the financial supporter and financial contributor to this project that is like no other, may God protect the great programmer💸       </p>
        <button className="card-button">Contact Me</button>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
