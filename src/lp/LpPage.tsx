import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { LpLbPage } from "./LpLbPage";
import { LpSusPage } from "./LpSusPage";

const useStyles = makeStyles({
  selectorTab: {
    "margin-bottom": 10
  }
});

export const LpPage = () => {
  const classes = useStyles();

  const [tabState, setTabState] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabState(newValue);
    console.log(tabState);
  };
  
  return (
    <>
        <Paper square className={classes.selectorTab}>
            <Tabs
                value={tabState}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
            >
                <Tab label="Lernbüros"/>
                <Tab label="SuS"/>
            </Tabs>
        </Paper>
        {(tabState === 0) && <LpLbPage/>}
        {(tabState === 1) && <LpSusPage/>}
    </>
  );
}
