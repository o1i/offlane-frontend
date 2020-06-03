import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { SusPage } from "./sus/SusPage";
import { LpPage } from "./lp/LpPage";
import { getEnrolments } from "./sus/susApi";

import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const AntSwitch = withStyles((theme) =>
  createStyles({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }),
)(Switch);


export const UserContext = React.createContext();

const App = () => {

    const [user, setUser] = useState({id: -1, type: "lp"});
    const [switchLp, setSwitchLp] = useState(false);
    const switchSusLp = () => {
        setSwitchLp(!switchLp)
        setUser({id: -1, type: (switchLp ? "lp" : "sus")})
    };

    // SuS
    const [susInfo, setSusInfo] = useState({blocks: [], kws: [], lbInstances: []});

    // Lp
    const [lpInfo, setLpInfo] = useState({});


    useEffect(()=>{
        setSusInfo(getEnrolments(user));
    }, []);


    return(
        <UserContext.Provider value={user}>
            <FormGroup>
                <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Lp</Grid>
                    <Grid item>
                    <AntSwitch checked={switchLp} onChange={switchSusLp} name="susLpSwitch" />
                    </Grid>
                    <Grid item>SuS</Grid>
                </Grid>
                </Typography>
            </FormGroup>
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