import React from 'react';

function Login() {
  return (
    <div className="login">
      <h1>Login</h1>
      <input type="email" data-testid="email-input" />
      <input type="password" data-testid="password-input" />
      <button data-testid="login-submit-btn">Entrar</button>
    </div>
  );
}

export default Login;
