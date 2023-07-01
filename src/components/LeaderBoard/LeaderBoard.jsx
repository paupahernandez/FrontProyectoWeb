import React from "react";
import './leaderboard.css';
import logo from "../../assets/trofeo.png";
import clock from "../../assets/clock.png";
import { Link } from "react-router-dom";
import {createContext, useState, useEffect} from "react";
function LeaderBoard() {
  const [info, setInfo] = useState([]);

  async function buscarPlayer  (number) {
    try{
      let response = null;
    response = await fetch(`http://localhost:3000/players`);
    const data2 = await response.json();
    console.log('data2:', data2);
    setInfo(data2);
    }
    catch(error){
      console.log(error);
    }
    
    

    

  }
  
    return (
      <main>

        <div className="bg-container"></div>
        <div className="content_leaderboard">
        <div className="leaderboard-header">
          <h1>Leader Board</h1>
          <img src={logo} alt="my-gif" className="img2"/>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Jugador</th>
                <th>Puntaje</th>
                <th><img src={clock} alt="clock" id="clock" /></th>
              </tr>
            </thead>
            <tbody>

            
            {info.map((usuario) => (
                <tr key={usuario.id}>
                <td > {usuario.id}</td>
                <td > {usuario.username}</td>
                <td className="td_puntaje"> {usuario.score}</td>
                </tr>
            ))}
            

              
            </tbody>
        </table>
        <button className="button-17" onClick={() => buscarPlayer(1)}><span>Click Buscar Jugadores</span></button>
        </div>
        
          <Link className="button-71" to="/MainPage">
                Back
            </Link>
            </div>
          </main>
    )
  }
  
  export default LeaderBoard;

