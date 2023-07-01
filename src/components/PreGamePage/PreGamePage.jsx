import React, { useState, useEffect} from 'react';
import PopUpRules from '../PopUpRules/PopUpRules';
import './pregamepage.css';
import Tablero from '../TableroUsuario/TableroUsuario';
import { Link } from "react-router-dom";
import CreateTable from '../CreateTable/CreateTable';
function PreGamePage() {
    const [showRules, setShowRules] = useState(true);
    const [showRules2, setShowRules2] = useState(false);
    

    return (
        <main >
        <div className="bg-container"></div>
        <h1> Juego </h1>
        <div className='game-container'>
        <div className="centered">
        <CreateTable/>
        </div>
        <div className='button-container'>
        {showRules && !showRules2 && <PopUpRules show={true} onClose={() => setShowRules(false)}/>}
        <button className="button-71" id="ver-reglas" onClick={() => setShowRules2(!showRules2)}>Ver Reglas</button>
        {showRules2 && <PopUpRules show={true} onClose={() => setShowRules2(false)}/>}

        <Link className="button-71" to="/GamePage" >Jugar!</Link>
        
        <Link className="button-71 " to="/MainPage">
        Back
    </Link> 
    </div>
    </div>
    
        </main>
    )
    }
export default PreGamePage;