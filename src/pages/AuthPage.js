import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-box glass">
        <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>

        {isLogin ? <Login /> : <Signup />}

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <span onClick={() => setIsLogin(!isLogin)} className="link">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
