import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactDOM from "react-dom";
import { SusPage } from "./sus/SusPage";
import { LpPage } from "./lp/LpPage";
import { ApPage } from "./ap/ApPage";
import { AuthDialog } from "./auth/auth";
import { getEnrolments } from "./sus/susApi";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export const UserContext = React.createContext();

const useStyles = makeStyles({
  selectorTab: {
    "margin-bottom": 10
  }
});

const App = () => {
    const classes = useStyles();
    const [user, setUser] = useState({id: -1, type: "lp"});
    const [userLevel, setUserLevel] = useState("")
    const [token, setToken] = useState("")
    const [tabState, setTabState] = useState(0)

    // SuS
    const [susInfo, setSusInfo] = useState({blocks: [], kws: [], lbInstances: []});

    // Lp
    const [lpInfo, setLpInfo] = useState({});


    useEffect(()=>{
        setSusInfo(getEnrolments(user));
    }, [user]);


    const logOut = () => {setUserLevel("");}

    console.log(token);
    console.log(userLevel);

    return(
        <UserContext.Provider value={user}>
            <div align="right" onClick={logOut}>Log Out</div>
            <AuthDialog setToken={setToken} authShow={userLevel==""} setUserLevel={setUserLevel}/>
            {userLevel === "sus" && 
                <SusPage {...susInfo} susInfoState={[susInfo, setSusInfo]}/>
            }
            {userLevel === "lp" &&
                <LpPage {...lpInfo} /> 
            }
            {userLevel === "ap" &&
                <ApPage/> 
            }
        </UserContext.Provider>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)