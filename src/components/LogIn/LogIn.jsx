import React, { useState, useContext } from 'react';
import './LogIn.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import LogoutButton from '../../Logout';

function LogIn() {
    const [mail, setMail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [score, setScore] = useState(0);
    const [gameId, setGameId] = useState(0);
    const [mostrarLista, setMostrarLista] = useState(false);
    //const [token, setToken] = useContext(AuthContext);
    
    
    // agregamos estados para controlar la sesión y el nombre de usuario autenticado
    const { token, setToken, logout,isLoggedIn, setIsLoggedIn, authenticatedUsername, setAuthenticatedUsername, authenticatedUserId, setAuthenticatedUserId} = useContext(AuthContext);

    const handleMailChange = (event) => {
        setMail(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleScoreChange = (event) => {
        setScore(event.target.value);
    };


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    

    async function ListaUsuarios  ()  {
        try{
            let response  = null;
            response = await fetch(`http://localhost:3000/players`);
            const data = await response.json();
            mostrarUsuarios(data);
            setMostrarLista(true);
        }
        catch(error){
            console.log(error);
        }
    }

    const mostrarUsuarios = (data) => {
        setUsuarios(data);
    }

    async function handleSubmit(event) {
      event.preventDefault();
      
      try {
        axios.post('http://localhost:3000/players', {
          username, 
          password, 
          mail
        }).then((response) => {
          console.log(response);
          const access_token = response.data.access_token;
          setToken(access_token);
          setIsLoggedIn(true);
          setAuthenticatedUsername(username);
    
          // Obtiene el ID del jugador de la respuesta JSON
          
          setAuthenticatedUserId(response.data.id);
    
           // Restablece los campos del formulario
          setUsername('');
          setPassword('');
          setMail('');
        }).catch((error) => {
          console.log(error);
        });
      
      } catch (error) {
        console.log('Error al realizar el inicio de sesión:', error);
      }
    }
    

    async function handleLogin(event) {
      event.preventDefault();
    
      try {
        // Realiza la solicitud de inicio de sesión al servidor

        axios.post(`http://localhost:3000/players/login`, {
          username, 
          password, 
          mail
        }).then((response) => {
          console.log(response);
          const access_token = response.data.access_token;
          setToken(access_token);
          setIsLoggedIn(true);
          setAuthenticatedUsername(username);
    
          // Obtiene el ID del jugador de la respuesta JSON
          
          setAuthenticatedUserId(response.data.id);
    
           // Restablece los campos del formulario
          setUsername('');
          setPassword('');
          setMail('');
        }).catch((error) => {
          console.log(error);
        });
      
      } catch (error) {
        console.log('Error al realizar el inicio de sesión:', error);
      }
    }
    
    

      return (
        <main>
          <div className='bg-container'></div>
      
          {isLoggedIn ? (
            <div className='container'>
              <h1>Bienvenido, {authenticatedUsername}!</h1>
              
              {/* <button className='button' onClick={() => logout}>
                Cerrar sesión
              </button> */}
              <LogoutButton />
            </div>
          ) : (
            <div className='container'>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className='label'>Username:</label>
                  <input
                    className='input'
                    type="username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div>
                  <label className='label'>Password:</label>
                  <input
                    className='input'
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div>
                  <label className='label'>Mail:</label>
                  <input
                    className='input'
                    type="mail"
                    value={mail}
                    onChange={handleMailChange}
                  />
                </div>
      
                <div>
                  <button className='button' type="submit">
                    Registrarse
                  </button>
                  <button className='button' onClick={handleLogin}>
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
          )}
      
          <button className='button cente' onClick={() => ListaUsuarios()}>
            Mostrar Usuarios Registrados
          </button>
          <div className='center'>
            {mostrarLista && (
              <div className="user-list">
                <h2>Usuarios Registrados:</h2>
                <ul>
                  {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                      <div>Id: {usuario.id}</div>
                      <div>Nombre: {usuario.username}</div>
                      <div>Mail: {usuario.mail}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
      );
      
}

export default LogIn;