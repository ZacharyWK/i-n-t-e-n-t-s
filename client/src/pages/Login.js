import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import "./css/login.css"
import Auth from '../utils/auth';



const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main classname="logWrap">
      <div >
      <h1 className="title">
            in<b>TENTS</b>
          </h1>
          <div className="logInput">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} className="loginForm">
                <div>
                <input
                  className="form-input"
                  placeholder="LOGIN EMAIL"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="***password***"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className=""
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Login
                </button>
                </div>
                <Link className="signUpButton" to="/signup">Signup</Link>
              </form>
            )}

            {error && (
              <div className="">
                {error.message}
              </div>
            )}
          </div>

          </div>
    </main>
  );
};

export default Login;
