import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { SusPage } from "./sus/SusPage";
import { LpPage } from "./lp/LpPage";
import { getEnrolments } from "./sus/susApi";


export const UserContext = React.createContext();

const App = () => {

    const [user, setUser] = useState({id: -1, type: "lp"});

    // SuS
    const [susInfo, setSusInfo] = useState({slots: [], kws: [], lbInstances: []});

    // Lp
    const [lpInfo, setLpInfo] = useState({});


    useEffect(()=>{
        console.log("enrolments");
        console.log(getEnrolments(user));
        setSusInfo(getEnrolments(user));
        console.log("showing susinfo");
        console.log(susInfo);
    }, []);


    return(
        <UserContext.Provider value={user}>
            {user.type === "sus" && 
                <SusPage {...susInfo} susInfoState={[susInfo, setSusInfo]}/>
            }
            {user.type === "lp" &&
                <LpPage {...lpInfo} /> 
            }
        </UserContext.Provider>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)