import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from './Components/Header/Header';
import { ApplicationViews } from './Components/ApplicationView';
import { useEffect } from 'react';
import Authorize from './Components/Auth/Authorize';
import 'semantic-ui-css/semantic.min.css';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);


    useEffect(() => {
        if (!localStorage.getItem("userProfile")) {
            setIsLoggedIn(false)

        }
    }, [isLoggedIn])

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn ?
                <ApplicationViews />
                :
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            }
        </Router>
    );
}

export default App;