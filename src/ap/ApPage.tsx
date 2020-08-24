import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ApStundenplanPage } from "./ApStundenplanPage";
import { ApPeoplePage } from "./ApPeoplePage";

const useStyles = makeStyles({
  selectorTab: {
    "margin-bottom": 10
  }
});

export const ApPage = ({token}: {token: string}) => {
  const classes = useStyles();

  const [tabState, setTabState] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabState(newValue);
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
                <Tab label="Stundenplan"/>
                <Tab label="Personen"/>
            </Tabs>
        </Paper>
        {(tabState === 0) && <ApStundenplanPage token={token}/>}
        {(tabState === 1) && <ApPeoplePage/>}
    </>
  );
}

