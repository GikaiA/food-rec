import React from "react";
import "./Landing.css";
// import herobg from "../images/hero-bg.jpg";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaServer } from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";

function Landing() {
  return (
    <div className="landing">
      <div className="parallax-bg">
        <div className="parallax"></div>
      </div>
      <div className="hero-section">
        {/* <img src={herobg} alt="hero-bg" className="hero-bg" /> */}
        <div className="hero-title">
          <h2>Find your next favorite meal — tailored to you. </h2>
        </div>
      </div>
      <div className="about">
        <h1 className="about-title">So How Does FoodRec WorK?</h1>
        <div className="step-section">
          <div className="step">
            <p className="number">1</p>
            <IoPhonePortraitOutline className="icon" />
            <p className="explanation">
              You send in your preferences for what restaurants you want.
            </p>
          </div>
          <div className="step">
            <p className="number">2</p>
            <FaServer className="icon" />
            <p className="explanation">
              The server will then calculate your preferences to give you
              restaurants based on your location
            </p>
          </div>
          <div className="step">
            <p className="number">3</p>
            <IoRestaurant className="icon" />
            <p className="explanation">
              The restaurants will be able to be viewed with their ratings,
              photos and directions to that resturants so they can enjoy their
              delicious food!
            </p>
          </div>
        </div>
      </div>
      <div className="values">
        <h1 className="values-title">Values & Benefits</h1>
        <div className="card-section">
          <div className="card">
            <p>Card info</p>
            <p>Card info</p>
          </div>
          <div className="card">
            <p>Card info</p>
            <p>Card info</p>
          </div>
          <div className="card">
            <p>Card info</p>
            <p>Card info</p>
          </div>
          <div className="card">
            <p>Card info</p>
            <p>Card info</p>
          </div>
          <div className="card">
            <p>Card info</p>
            <p>Card info</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
