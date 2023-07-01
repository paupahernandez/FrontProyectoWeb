import React from "react";
import { Link } from "react-router-dom";
import './landing.css'
import logo from '../../assets/giphy.gif'

function LandingPage() {
  return (
    <main className = "grid">
    <div className="landing_content">
      <h1>Bienvenidos a <span className="name"> RocketInvasion</span></h1>
      <h4> En este juego, tendrás que adivinar la ubicación de los cohetes enemigos para invadirlos... mientras no te invadan todos tus cohetes primero. <br /> ¿Estás listo?</h4>
      <Link className="button-71 agrandar" to="/MainPage">
        Ingresar
    </Link>
        
        
    </div>
    <div className="landing_content">
    <div className="gif">
        <img src={logo} alt="my-gif" />
    </div>
    </div>
    <div className="bg-container"></div>
    </main>
  )
}

export default LandingPage;