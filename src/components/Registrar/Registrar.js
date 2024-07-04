import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import emailIcon from '../../assets/Icons/envelope-regular.svg';
import passwordIcon from '../../assets/Icons/lock-alt-solid.svg';
import userIcon from '../../assets/Icons/user-alt-light.svg';
import './Registrar.css';
import firebase from '../../firebase/firebaseConfig';
import '../../App.css';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        if (email && password && firstName && lastName && username) {
            setError(false);
            setErrorMsg('');
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
                firebase.firestore().collection("users").add({
                        id: userCredential.user.uid,
                        firstName,
                        lastName,
                        username,
                        email,
                    });
                });
                navigate('/registrarAtividade');
            } catch (err) {
                setError(true);
                setErrorMsg(err.message);
            }
        } else {
            setError(true);
            setErrorMsg('Please fill out all the fields!');
        }
    };

    return (
        <div className="form-wrap">
            <form className="register" onSubmit={register}>
                <p className="login-register">
                    Já tem uma conta?
                    <Link className="router-link" to="/">Entrar</Link>
                </p>
                <h2>Cria Sua Conta</h2>
                <div className="inputs">
                    <div className="input">
                        <input
                            type="text"
                            placeholder="Nome"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <img src={userIcon} alt="User" className="icon" />
                    </div>
                    <div className="input">
                        <input
                            type="text"
                            placeholder="Sobrenome"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <img src={userIcon} alt="User" className="icon" />
                    </div>
                    <div className="input">
                        <input
                            type="text"
                            placeholder="Usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <img src={userIcon} alt="User" className="icon" />
                    </div>
                    <div className="input">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <img src={emailIcon} alt="Email" className="icon" />
                    </div>
                    <div className="input">
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <img src={passwordIcon} alt="Password" className="icon" />
                    </div>
                    {error && <div className="error">{errorMsg}</div>}
                </div>
                <button type="submit">Criar conta</button>
                <div className="angle"></div>
            </form>
            <div className="background"></div>
        </div>
    );
};

export default Register;