'use client';

import { useState } from 'react';
import {
  loginController,
  registerController,
} from '@/app/controllers/auth.controller';

import './AuthForm.css';

type AnimationState = 'idle' | 'explode' | 'assemble';

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);

  const [animation, setAnimation] =
    useState<AnimationState>('idle');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const switchForm = () => {
    if (animation !== 'idle') return;

    setAnimation('explode');

    setTimeout(() => {
      setIsRegister((prev) => !prev);

      setUsername('');
      setPassword('');
      setFullName('');
      setRememberMe(false);

      setError('');
      setMessage('');

      setAnimation('assemble');

      setTimeout(() => {
        setAnimation('idle');
      }, 750);
    }, 600);
  };

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError('');
    setMessage('');

    if (!username.trim() || !password.trim()) {
      setError(
        'Please enter your username and password.'
      );
      return;
    }

    try {
      const response = await loginController({
        username,
        password,
      });

      localStorage.setItem(
        'access_token',
        response.access_token
      );

      setMessage('Login successful.');

      console.log('Login successful:', response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Login failed.'
      );
    }
  };

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError('');
    setMessage('');

    if (
      !fullName.trim() ||
      !username.trim() ||
      !password.trim()
    ) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await registerController({
        username,
        password,
        fullName,
      });

      setMessage(
        response.message ||
          'Account created successfully.'
      );

      setFullName('');
      setUsername('');
      setPassword('');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Registration failed.'
      );
    }
  };

  return (
    <main className="authContainer">

      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="background">

        <div className="bgGrid" />

        <div className="bgGlow bgGlow1" />
        <div className="bgGlow bgGlow2" />
        <div className="bgGlow bgGlow3" />

        <div className="bgParticles">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

      </div>


      {/* =========================================
          FORM TRANSITION PARTICLES
      ========================================= */}

      <div className={`particles ${animation}`}>

        <span className="particle p1" />
        <span className="particle p2" />
        <span className="particle p3" />
        <span className="particle p4" />
        <span className="particle p5" />
        <span className="particle p6" />
        <span className="particle p7" />
        <span className="particle p8" />
        <span className="particle p9" />
        <span className="particle p10" />
        <span className="particle p11" />
        <span className="particle p12" />
        <span className="particle p13" />
        <span className="particle p14" />
        <span className="particle p15" />
        <span className="particle p16" />
        <span className="particle p17" />
        <span className="particle p18" />
        <span className="particle p19" />
        <span className="particle p20" />

      </div>


      {/* =========================================
          AUTH CARD
      ========================================= */}

      <div className={`authCard ${animation}`}>

        {/* =======================================
            LOGIN
        ======================================= */}

        {!isRegister && (
          <section className="authFace loginFace">

            <h1 className="title">
              Welcome!
            </h1>

            <p className="subtitle">
              Please Sign In
            </p>

            <form
              className="form"
              onSubmit={handleLogin}
            >

              <div className="inputGroup">

                <label htmlFor="loginUsername">
                  User Name
                </label>

                <input
                  id="loginUsername"
                  type="text"
                  placeholder="User Name"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  autoComplete="username"
                />

              </div>


              <div className="inputGroup">

                <label htmlFor="loginPassword">
                  Password
                </label>

                <input
                  id="loginPassword"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  autoComplete="current-password"
                />

              </div>


              <div className="checkboxGroup">

                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(
                      event.target.checked
                    )
                  }
                />

                <label htmlFor="rememberMe">
                  Save my user name
                </label>

              </div>


              {error && (
                <div className="error">
                  {error}
                </div>
              )}


              {message && (
                <div className="message">
                  {message}
                </div>
              )}


              <button
                type="submit"
                className="button"
              >
                Login
              </button>

            </form>


            <div className="switchArea">

              <span className="switchText">
                Don't have an account?
              </span>

              <button
                type="button"
                className="switchButton"
                onClick={switchForm}
              >
                Register
              </button>

            </div>

          </section>
        )}


        {/* =======================================
            REGISTER
        ======================================= */}

        {isRegister && (
          <section className="authFace registerFace">

            <h1 className="title">
              Create Account
            </h1>

            <p className="subtitle">
              Please fill in the details below
            </p>

            <form
              className="form"
              onSubmit={handleRegister}
            >

              <div className="inputGroup">

                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(
                      event.target.value
                    )
                  }
                  autoComplete="name"
                />

              </div>


              <div className="inputGroup">

                <label htmlFor="registerUsername">
                  User Name
                </label>

                <input
                  id="registerUsername"
                  type="text"
                  placeholder="Enter user name"
                  value={username}
                  onChange={(event) =>
                    setUsername(
                      event.target.value
                    )
                  }
                  autoComplete="username"
                />

              </div>


              <div className="inputGroup">

                <label htmlFor="registerPassword">
                  Password
                </label>

                <input
                  id="registerPassword"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  autoComplete="new-password"
                />

              </div>


              {error && (
                <div className="error">
                  {error}
                </div>
              )}


              {message && (
                <div className="message">
                  {message}
                </div>
              )}


              <button
                type="submit"
                className="button"
              >
                Register
              </button>

            </form>


            <div className="switchArea">

              <span className="switchText">
                Already have an account?
              </span>

              <button
                type="button"
                className="switchButton"
                onClick={switchForm}
              >
                Login
              </button>

            </div>

          </section>
        )}

      </div>

    </main>
  );
}