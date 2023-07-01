import React, {useContext, useState} from 'react';
import './components/LogIn/LogIn.css';
import { AuthContext } from './AuthContext';

const LogoutButton = () => {
  const {logout} = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const handleLogout = () => {
    logout();
    setMsg("Has hecho logout con éxito!")
  }

  return (
    <>
        {msg.length > 0 && <div className="successMsg"> {msg} </div>}
        <button className = "button" onClick={handleLogout}>
        Cerrar sesión
        </button>
    </>
  );
}

export default LogoutButton;