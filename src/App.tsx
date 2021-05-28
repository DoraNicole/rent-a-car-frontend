import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from "./components/Login/Login";
import useToken from './useToken';

function setToken(userToken: any) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    let tokenString = sessionStorage.getItem('token');
    let userToken;
    if (tokenString != null) {
        userToken = JSON.parse(tokenString);
    }
    return userToken?.token
}

function App() {
    const { token, setToken } = useToken();

    // const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
      <div className="wrapper">
        <h1>Application</h1>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/preferences">
              <Preferences />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
