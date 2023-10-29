
import React from "react";

import './home.css'
import { Link } from "react-router-dom";

export const Home=()=>
{
    return( <section id="homeSection" className="home-section">

        <div className="home-section-conten-box">
            <div className="home-section-content">
                <p className="section-title">
                    By, Biswajit Deori
                </p>
                <h1 className="home-section-title">
                    <span className="home-section-title-color">
                        Nutration Details
                    </span>
                </h1>
                <p className="home-section-description">
                Nutration Details appliction display all the nutraion details like carbs, protine just by capturing the eatible object. 
                <br/>
                </p>
            </div>
            <Link to="/camera">
            <button class='glowing-btn'><span class='glowing-txt'>L<span class='faulty-letter'>U</span>NCH</span></button>
            </Link>
        </div>
        <div className="home-section-img">
            <img className="cover-image" src='https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.webp?b=1&s=170667a&w=0&k=20&c=RKgGJW8aIINIPpisynZ2x6UWFiMZ0afmEN32gmbYvVI=' alt="Logo"/>

        </div>

    </section>)

};


