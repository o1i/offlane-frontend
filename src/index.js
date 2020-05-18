import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { SusPage } from "./sus/SusPage";
import { getEnrolments } from "./sus/susApi";


export const UserContext = React.createContext();

const App = () => {

    const [user, setUser] = useState({id: -1, type: "sus"});

    // SuS
    const [susInfo, setSusInfo] = useState({slots: [], kws: [], lbInstances: []});


    useEffect(()=>{
        setSusInfo(getEnrolments(user));
    }, []);


    return(
        <UserContext.Provider value={user}>
            {user.type === "sus" && 
                <SusPage {...susInfo}/>
            }
        </UserContext.Provider>
    );
}



ReactDOM.render(
    <App />,
    document.querySelector("#root")
)