import React from "react";
import './aboutus.css';
import { Link } from "react-router-dom";
import perfildefault from '../../assets/perfil.default.webp'
import fotopaula from '../../assets/foto_paula.png'
import fotofelipe from '../../assets/foto_felipe.png'
// Aqui Mete lo que querai poner de foto de perfil, siguiendo el formato de arriba.
function AboutUs() {
    return (
      <main>
      <div className="bg-container"></div>
      <div className="content_aboutus">
      <h1> About Us</h1>
      <div className="grid">
      <div className="Perfil">
      <img src={fotopaula} alt="logo-image" className="fotoperfil" />
      <h1>Paula Hernández</h1>
      <ul>
        <li>Carrera: Ingeniería Civil</li>
        <li>Año: 4to</li>
        <li>Major: Software</li>
        <li>Minor: Industrial</li>
        <li>Hobbies: Hockey y leer</li>
      </ul>

      </div>
      <div className="Perfil">
      <img src={fotofelipe} alt="logo-image" className="fotoperfil" />
      <h1>Felipe Guzmán</h1>
      <ul>
        <li>Carrera: Ingeniería Civil</li>
        <li>Año: 4to</li>
        <li>Major: Software</li>
        <li>Minor: Industrial</li>
        <li>Hobbies: Fútbol</li>
      </ul>
      </div>
      </div>
      <Link className="button-71" to="/MainPage">
        Back
      </Link>
      </div>
      </main>
    )
  }
  
  export default AboutUs;