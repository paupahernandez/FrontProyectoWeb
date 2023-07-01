
import React, { useState, useEffect, useContext} from 'react';
import PopUpRules from '../PopUpRules/PopUpRules';
import './gamepage.css';
import Tablero from '../TableroUsuario/TableroUsuario';
import { Link } from "react-router-dom";
import { AuthContext } from '../../AuthContext';
import CreateTable from '../CreateTable/CreateTable';
import TableroUsuario from '../TableroUsuario/TableroUsuario';
import TableroOponente from '../TableroOponente/TableroOponente';

function GamePage() {
    const [showRules, setShowRules] = useState(false);
    const [showRules2, setShowRules2] = useState(false);
    const [mail, setMail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [playerId, setPlayerId] = useState();

    // agregamos estados para controlar la sesión y el nombre de usuario autenticado
    const { isLoggedIn, setIsLoggedIn, authenticatedUsername, setAuthenticatedUsername, authenticatedUserId, setAuthenticatedUserId} = useContext(AuthContext);
    

    return (
        <div>
        <div className="bg-container"></div>

        <h1> Juego </h1>
        <h1> Cohetes de {authenticatedUsername} </h1>
        <div className='game-container'>
        </div>
        <div>
            
            <div className='right'>
                {showRules && !showRules2 && <PopUpRules show={true} onClose={() => setShowRules(false)}/>}
                <button className="button-71" id="ver-reglas" onClick={() => setShowRules2(!showRules2)}>Ver Reglas</button>
                {showRules2 && <PopUpRules show={true} onClose={() => setShowRules2(false)}/>}
            </div>
            </div>

        <div className="centered">
            <div className='Tablero'>
                <TableroUsuario />
            </div>
            <div className='Tablero'>
                <TableroOponente />
            </div>
        </div>
        <div >
            
            <div style={{margin: "20px"}}>
                <Link className="button-71 " to="/MainPage">
                Back
                </Link> 
            </div>
        </div>
    
    
        </div>
        
    )
    }
export default GamePage;