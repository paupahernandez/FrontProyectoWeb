import React from "react";
import './createtable.css';
import { Link } from "react-router-dom";
import nave from '../../assets/nave3.png'
import rocket_logo from '../../assets/rocket_logo.png'
import explosion from '../../assets/explosion.png'
import {createContext, useState, useEffect, useContext} from "react";
import nave2 from '../../assets/cohete.png'
import nave3 from '../../assets/spaceship.png'
import { AuthContext } from '../../AuthContext';
import axios from 'axios';


const Board = () => {
    const [boardState, setBoardState] = useState(Array(5).fill(Array(5).fill(null)));
    const [mostrarLista, setMostrarLista] = useState(false);
    const [info, setInfo] = useState([]);
    const [orientacion, setOrientacion] = useState("H");
    const [pusoRocket1, setPusoRocket1] = useState(false);
    const [pusoRocket2, setPusoRocket2] = useState(false);
    const [pusoRocket3, setPusoRocket3] = useState(false);
    const [rocketAMostrar, setRocketAMostrar] = useState(rocket_logo);
    const [hayCohetesParaMostrar, setHayCohetesParaMostrar] = useState(true);
    //const [playerId, setPlayerId] = useState();

    //manejo sesión
    const [mail, setMail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [playerId, setPlayerId] = useState();

    // agregamos estados para controlar la sesión y el nombre de usuario autenticado
    const { isLoggedIn, setIsLoggedIn, authenticatedUsername, setAuthenticatedUsername, authenticatedUserId, setAuthenticatedUserId} = useContext(AuthContext);
    

    const actualizarrocketAMostrar = () => {
      if (!pusoRocket1){
        setRocketAMostrar(nave2);
        setPusoRocket1(true);}
      else if (!pusoRocket2 && pusoRocket1){
        setRocketAMostrar(nave3);
        setPusoRocket2(true);}
      else if (!pusoRocket3 && pusoRocket2 && pusoRocket1){
        setRocketAMostrar(null);
        setPusoRocket3(true);

    }
      }

    // eliminamos cohetes existentes de usuario para partir tablero nuevo
    useEffect(() => {
      axios.get(`http://localhost:3000/players/rocketsData/${authenticatedUserId}`)
        .then((response) => {
          const data = response.data;
          if (data && data.rockets) {
            const rocketIds = data.rockets.map((rocket) => rocket.id);
            deleteRockets(rocketIds);
          } else {
            console.log('No se encontraron rockets para el jugador');
          }
        })
        .catch((error) => {
          console.log('Error al obtener los rockets:', error);
        });
    }, []);
    
    const deleteRockets = (rocketIds) => {
      axios.delete(`http://localhost:3000/rockets/delete/${rocketIds.join(',')}`)
        .then((response) => {
          console.log('Rockets eliminados correctamente');
          // Realizar cualquier otra acción necesaria después de eliminar los rockets
        })
        .catch((error) => {
          console.log('Error al eliminar los rockets:', error);
        });
    };
    


    // ve cómo muestro cohete en la tabla
    const handleClick = (row, col) => {
      if (isLoggedIn){
      // en el caso de que tenga rockets de juegos pasados, los eliminamos
      const newBoardState = Array.from(boardState, (row) => [...row]);;
      if (newBoardState[row][col] === nave3 || newBoardState[row][col] === nave2 ||
         newBoardState[row][col] === rocket_logo) {
        newBoardState[row][col] = explosion; // Aquí deberías insertar la URL de la nueva imagen
      } else {
        newBoardState[row][col] = rocketAMostrar;
        console.log('row:', row , 'col:', col);
        ActualizarRocket(row, col); 
        actualizarrocketAMostrar();
        
      }
      setBoardState(newBoardState);
    }
    else {
      alert('Debes iniciar sesión para jugar');
    }
    }

    async function ActualizarRocket  (row, col)  {
    event.preventDefault();
    let response = null;
    let numero = null;
    console.log('row:', row , 'col:', col)
    if (!pusoRocket1) numero = 1;
    if (!pusoRocket2 && pusoRocket1) numero = 2;
    if (!pusoRocket3 && pusoRocket2 && pusoRocket1) numero = 3;
      response = await fetch(`http://localhost:3000/rockets`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: "Rocket" + numero,
            health: 10,
            x: row, 
            y: col, 
            orientation: orientacion,
            playerId: authenticatedUserId,
        })
          });
      const respuesta = await response.json();
      
      
      showRocket(numero);
      setMostrarLista(true);
      console.log('respuesta:', respuesta);


    };

    const rotarRocket = () => {
      if (orientacion == "H"){
        setOrientacion("V");
        nave1.style.transform = "rotate(90deg)";
        
      }
      if (orientacion == "V"){
        setOrientacion("H");
        nave1.style.transform = "rotate(-90deg)";
      }
    }

    async function BorrarRockets() {
        try {
          let response = null;
          response = await fetch('http://localhost:3000/rockets/delete', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div >
    <div className="centrar">
      <h2> Tablero de {authenticatedUsername} </h2>
    <br></br>
    
      <div className="left-panel">
        <div style={{"marginTop": '30px'}}>
        <h2>Selecciona la celda en donde poner el cohete</h2>      
        </div>
        <div style={{padding: '50px'}}>
        {hayCohetesParaMostrar && (
        <Cell2  image={rocketAMostrar}/>
          )}
        </div>

        <div style={{"paddingleft": "20px"}}>

        </div>
        <button className="button-71" onClick={() => BorrarRockets()}>Borrar Cohetes</button>
      </div>



      <div className="board-create">
        {/* Rendering the board */}
        {boardState.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {/* Rendering the cells within each row */}
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="column">
                {/* ojo orden row col */}
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
        <div>Direction: {info.orientation}</div>
        </div>)}
      </div>
      </div>

      
    
  )
 
  
  
  
  
  
  
  
  }
  
  const Cell = ({ onClick, image }) => {
    return (
      <div className="cell1" onClick={onClick}>
        {image && <img src={image} alt="Cell Image" className="Cohete"/>}
      </div>
    );
  }
  const Cell2 = ({ onClick, image }) => {
    return (
      <div className="cell2" onClick={onClick}>
        {image && <img src={image} id = "imagencelda2" alt="Cell Image" className="Cohete"/>}
      </div>
    );
  }

export default Board;

