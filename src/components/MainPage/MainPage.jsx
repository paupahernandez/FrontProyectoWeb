import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import './mainpage.css'
import alien from '../../assets/alien.png'
import rocket_logo from '../../assets/rocket_logo.png'
import PopUpRules from "../PopUpRules/PopUpRules";
import GamePage from "../GamePage/GamePage";
import PreGamePage from "../PreGamePage/PreGamePage";

function MainPage() {
  const [showRules, setShowRules] = useState(true);
  
  return (
    <main >
      <div className="bg-container"></div>
      <div className="content_mainpage">
      <div className="mainpage_header">
      <h1>Rocket Invasion</h1>
      <img src={rocket_logo} alt="nave" className="Cohete" />
      </div>
  
      <div className="grid">
      <div className="column_2">
      <h3> Objetivo </h3>
      <p><br /> El objetivo del juego es invadir todos los cohetes del oponente antes de que el oponente invada todos los tuyos.</p>
      <h3><br /> Tableros </h3>
      <p><br /> Cada jugador tendrá dos tableros, uno de su zona de la galaxia, y el otro de la zona de su oponente. </p>
      </div>
      <div className="column_2">
      <h3> Desarrollo del juego </h3>
      <p> <br />Para comenzar, cada jugador deberá colocar estratégicamente sus cohetes en el primer tablero. 
        Luego, comenzarán los ataques por turno.
        Cada jugador seleccionará la casilla del segundo tablero en donde quiere atacar a su oponente. 
        Si hay un cohete en la casilla seleccionada, un alien <img src={alien} alt="alien" className="alien" /> "invadirá" ese espacio del cohete contrario. El jugador volverá a intentar invadir hasta que falle: 
        la casilla no esté ocupada. En este caso, el jugador perderá su turno de ataque y será el turno del oponente.</p>
      </div>
      </div>
      </div>
      
      <div className="divbotones">
        <Link className="button-71" to="/PreGamePage">
          ¡A jugar!
      </Link>  
      
      <Link className="button-71" to="/LeaderBoard">
          LeaderBoard
      </Link>  
    </div>
    </main>
  )
}

  export default MainPage;