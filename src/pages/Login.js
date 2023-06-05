import React, { useState, useEffect } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [atived, setAtived] = useState(true);

  const minimo = 7;
  const senhaCorreta = password.length >= minimo;
  const emailCorreto = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
  const disabled = !(senhaCorreta && emailCorreto);

  useEffect(() => {
    setAtived(disabled);
  }, [disabled]);

  return (
    <div className="login">
      <h1>Login</h1>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          id="email"
          data-testid="email-input"
          placeholder="digite seu emal"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          id="password"
          data-testid="password-input"
          placeholder="digite sua senha de 7 ou mais digitos"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button data-testid="login-submit-btn" disabled={ atived }>Entrar</button>
    </div>
  );
}

export default Login;
