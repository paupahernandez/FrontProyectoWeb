import React from "react";
import './tablero.css';
import { Link } from "react-router-dom";
import nave from '../../assets/nave3.png'
import rocket_logo from '../../assets/rocket_logo.png'
import explosion from '../../assets/explosion.png'
import {createContext, useState, useEffect} from "react";


const Board = () => {
    const [boardState, setBoardState] = useState(Array(5).fill(Array(5).fill(null)));
    const [mostrarLista, setMostrarLista] = useState(false);
    const [info, setInfo] = useState([]);
  
    const handleClick = (row, col) => {
      const newBoardState = Array.from(boardState, (row) => [...row]);;
      if (newBoardState[row][col] === rocket_logo) {
        newBoardState[row][col] = explosion; // Aquí deberías insertar la URL de la nueva imagen
      } else {
        newBoardState[row][col] = rocket_logo;
        ActualizarRocket(1, row, col) 
      }// Aquí deberías insertar la URL de la imagen que quieras mostrar
      setBoardState(newBoardState);
    }

    async function ActualizarRocket  (numero, row, col)  {
      event.preventDefault();
      let response = null;
      // Aquí puedes agregar la lógica para procesar el inicio de sesión
      // por ejemplo, hacer una solicitud a un servidor para autenticar al usuario
      response = await fetch(`http://localhost:3000/rockets/update/${numero}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ X: row, Y: col, direction: "H"})
          });
      const respuesta = await response.json();
      
      showRocket(numero);
      setMostrarLista(true);
      console.log('respuesta:', respuesta);


    };
    async function showRocket  (data) {
      let response = null;
      try{
        response = await fetch(`http://localhost:3000/rockets/show/${data}`);
        const data2 = await response.json();
        console.log('data2:', data2);
        setInfo(data2);
      }
      catch(error){
        console.log(error);
      }
      

    };
  
  // mostrar respuesta dentro del tablero
  const ShowRocketActualizado = (data) => {
    
  }
  
  return (
    <div>
    <div class="centrar">
      <div className="board">
        {/* Rendering the board */}
        {boardState.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {/* Rendering the cells within each row */}
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="column">
                <Cell onClick={() => handleClick(rowIndex, colIndex)} image={cell} />
              </div>
            ))}
          </div>
        ))}
      </div>
      </div>
      <div className="centrar">
      {/* Rendering the user list conditionally */}
      {mostrarLista && (<div className="rocket-update">
      <h2>Rockets Actualizados</h2>
        <div>Id: {info.id}</div>
        <div>Name: {info.name}</div>
        <div> Health: {info.health}</div>
        <div>X: {info.x}</div>
        <div>Y: {info.y}</div>
        </div>)}
      </div>

      </div>
    
  )
 
  
  
  
  
  
  
  
  }
  
  const Cell = ({ onClick, image }) => {
    return (
      <div className="cell" onClick={onClick}>
        {image && <img src={image} alt="Cell Image" className="Cohete"/>}
      </div>
    );
  }

export default Board;

