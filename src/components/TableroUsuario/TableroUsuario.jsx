import React from "react";
import './tablerousuario.css';
import { Link } from "react-router-dom";
import nave from '../../assets/nave3.png'
import nave1 from '../../assets/rocket_logo.png'
import explosion from '../../assets/explosion.png'
import {createContext, useState, useEffect, useContext} from "react";
import nave2 from '../../assets/cohete.png'
import nave3 from '../../assets/spaceship.png'
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

const Cell = ({ onClick, rocket }) => {
  const getRocketImage = (rocketName) => {
    switch (rocketName) {
      case 'Rocket1':
        return nave1;
      case 'Rocket2':
        return nave2;
      case 'Rocket3':
        return nave3;
      default:
        return null;
    }
  };
  

  const image = rocket ? getRocketImage(rocket.name) : null;
  console.log(rocket)
  if (rocket) {
    console.log("buena", getRocketImage(rocket.name))
  }

  return (
    <div className="cell" onClick={onClick}>
      {image && <img src={image} alt="Cell Image" className="Cohete" />}
    </div>
  );
};



const BoardUser = () => {
  const [boardState, setBoardState] = useState(() => Array.from({ length: 5 }, () => Array(5).fill(null)));
  const [mostrarLista, setMostrarLista] = useState(false);
  const [info, setInfo] = useState({});
  const [orientacion, setOrientacion] = useState("H");
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState();

  // agregamos estados para controlar la sesión y el nombre de usuario autenticado
  const { isLoggedIn, setIsLoggedIn, authenticatedUsername, setAuthenticatedUsername, authenticatedUserId, setAuthenticatedUserId } = useContext(AuthContext);

  const getRocketImage = (rocketId) => {
    console.log(rocketId);
    switch (rocketId) {
      case 1:
        return nave1;
      case 2:
        return nave2;
      case 3:
        return nave3;
      default:
        return null;
    }
  };

  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/players/rocketsData/${authenticatedUserId}`)
      .then((response) => {
        const data = response.data;
        if (data && data.rockets) {
          setBoardState((prevBoardState) => {
            const newBoardState = Array.from(prevBoardState, (row) => [...row]);
            const rockets = {};
            data.rockets.map((rocket) => {
              newBoardState[rocket.x][rocket.y] = rocket;
              rockets[rocket.id] = rocket;
            });
            setInfo((prevInfo) => ({
              ...prevInfo,
              ...rockets
            }));
            return newBoardState;
          });
        } else {
          console.log('La respuesta no contiene la propiedad "rockets"');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  // busco un cohete específico del jugador
  const buscarRocket = (x, y) => {
    const rocketIds = Object.keys(info);
    for (const rocketId of rocketIds) {
      const rocket = info[rocketId];
      if (rocket.x === x && rocket.y === y) {
        console.log("Cohete encontrado:", rocket);
        return rocket;
      }
    }
    return null;
  };
  
  

  const handleCellClick = () => {
    // Lógica para manejar el clic en una celda
  };

  return (
    <div>
      <h3>Player: {authenticatedUsername}</h3>
      <div className="board">
        {/* Rendering the board */}
        {boardState.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {/* Rendering the cells within each row */}
            {row.map((cell, colIndex) => {
  
              const rocket = buscarRocket(rowIndex, colIndex);
              const hasRocket = !!rocket;

              return (
                <div key={colIndex} className="column">
                  <Cell onClick={handleCellClick} rocket={rocket} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardUser;
