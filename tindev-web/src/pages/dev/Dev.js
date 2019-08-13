import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";
import itsamatch from "../../assets/itsamatch.png";
import api from "../../services/Api";
import io from "socket.io-client";
import "./Dev.css";


export default function Dev({ match }) {
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get("/devs", {
                headers : { user : match.params.id}
            });
            setUsers(response.data);
        }
        loadUsers();
        const socket = io("http://localhost:5000", {
            query : { user : match.params.id }
        });
        socket.on("match", dev => {
            setMatchDev(dev);
        });
    }, [match.params.id]);
    
    async function likeOnclick(id) {
        await api.post(`devs/${id}/likes`, null , {
            headers : { user : match.params.id }
        });
        setUsers(users.filter(user => user._id !== id));
    }    
    async function dislikeOnclick(id) {
        await api.post(`devs/${id}/dislikes`, null , {
            headers : { user : match.params.id }
        });
        setUsers(users.filter(user => user._id !== id));
    }
    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="tindev" />
            </Link>
            { users.length > 0 ? (
                <ul> 
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button type="button" onClick={() => dislikeOnclick(user._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button type="button" onClick={() => likeOnclick(user._id)}>
                                    <img src={like} alt={like} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : <div className="empty">Acabou... Aguarde mais devs..</div>}
            { matchDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="It's a match" />
                    <img className="avatar" src={matchDev.avatar} alt={match.name}/>
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button type="button" onClick={() => setMatchDev(null)}>FECHAR</button>
                </div>
            )}
        </div>
    );
}