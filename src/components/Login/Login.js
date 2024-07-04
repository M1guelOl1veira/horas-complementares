import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import firebase from '../../firebase/firebaseConfig';
import emailIcon from '../../assets/Icons/envelope-regular.svg';
import passwordIcon from '../../assets/Icons/lock-alt-solid.svg';
import Loading from './Loading';
import './Login.css'; 
import '../../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser)
        setLoading(false);
        navigate('/registrarAtividade');
        setError(false);
        setErrorMsg('');
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="form-wrap">
      <form className="login" onSubmit={signIn}>
        {loading && <Loading />}
        <p className="login-register">
          Não tem uma conta?
          <Link className="router-link" to="/registrar">Registre-se</Link>
        </p>
        <h2>Entre no Site</h2>
        <div className="inputs">
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
        <Link className="forgot-password" to="/forgot-password">Esqueceu sua senha?</Link>
        <button type="submit">Entrar</button>
        <div className="angle"></div>
      </form>
      <div className="background"></div>
    </div>
  );
};

export default Login;