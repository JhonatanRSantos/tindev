import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import api from "../../services/Api";
import "./Login.css";

export default function Login ({ history }) {
    const [username, setUsername] = useState("");
    async function submit(event) {
        event.preventDefault();
        const response = await api.post("/devs", {
            username
        });
        const { _id } = response.data;
        history.push(`/dev/${_id}`);
    }
    return (
        <div className="login-container">
            <img src={logo} alt="Tindev" />
            <form onSubmit={submit}>                
                <input 
                    type="text" 
                    placeholder="Digite seu usuário do Github"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}