import React, { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import Tablero from "../Tablero/Tablero";
import './popup_rules.css'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '50%',
      height: '80%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#2e2c2c',
    },
  };

function PopUpRules(props) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(props.show);
    }, [props.show])

    const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
    

    const rules = [
        "Número de jugadores: 2 (mínimo y máximo)",
        "Una vez posicionas tus cohetes y comienzas la partida, no podrás volver a cambiarlos de posición",
        "Podrás atacar a cualquier casilla del tablero de tu oponente, salvo en las que ya has atacado",
        "No podrás deshacer ataques propios ni de tus oponentes",
        "Es un juego por turnos: haces tu ataque, si es espacio, el turno pasa a tu oponente; si invades a un cohete enemigo, vuelves a atacar",
        "Tienes un tiempo límite de 15 segundos para realizar tu ataque, si se pasa el tiempo y no has hecho tu movimiento, pierdes tu turno",
        "La partida acaba cuando un jugador ha invadido todos los cohetes enemigos. Comenzará una nueva partida para ambos en 5 segundos",
        "Si un jugador abandona la partida, esta finaliza y tienes que empezar otra nueva"
      ];
    
    const hasNextRule = currentRuleIndex < rules.length - 1;

    const onNextRule = () => {
        if (currentRuleIndex < rules.length - 1) {
            setCurrentRuleIndex(currentRuleIndex + 1);
        }
    };

    return (
        <div>
        <ReactModal
        isOpen={isOpen}
        contentLabel="Reglas"
        style={customStyles}
        onRequestClose={() => setIsOpen(false)}
        >
        <button className="button-popup" id="close" onClick={() => setIsOpen(false)}>X</button>
        <div className="popup-rules">
        <h1 id="titulo-rules"> Reglas RocketInvasion</h1>
        <h2>Regla nº{currentRuleIndex+1}</h2>
        <p>{rules[currentRuleIndex]}.</p>
        {hasNextRule ? (
        <button className="button-popup" id="final" onClick={onNextRule}>Siguiente Regla</button>
        ) : (
            <button className="button-popup" id="final" onClick={() => setIsOpen(false)}>Empezar a Jugar</button>
        )}
        </div>
        </ReactModal>
        </div>
    )
  }
  
  export default PopUpRules;