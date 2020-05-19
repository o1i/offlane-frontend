import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { SusPage } from "./sus/SusPage";
import { getEnrolments } from "./sus/susApi";
import { SusInfo } from "./common/objects";


export const UserContext = React.createContext();

const App = () => {

    const [user, setUser] = useState({id: -1, type: "sus"});

    // SuS
    const [susInfo, setSusInfo] = useState({slots: [], kws: [], lbInstances: []});


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
        </UserContext.Provider>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)