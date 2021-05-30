import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Preferences from './components/Preferences/Preferences';
import Login from "./components/Login/Login";
import useToken from './useToken';
import Register from "./components/Register/Register";
import HomePage from './components/HomePage';
import CarList from './components/CarList';

function App() {
    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route path="/">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <HomePage/>
                            <br/>
                            <CarList/>
                        </div>
                    </Route>
                    <Route path="/preferences">
                        <Preferences />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login setToken={setToken} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
