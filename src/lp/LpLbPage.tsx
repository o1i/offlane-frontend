import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getLpLbInfo } from "./lpApi";
import { LbBelegungRow } from "./LbBelegungRow";
import { LbInstance, User, LpLbBelegungRow } from "../common/objects";

const useStyles = makeStyles({
  
});

export const LpLbPage = () => {
  const classes = useStyles();
  const lp = 1;
  const [lbState, setLbState] = useState(getLpLbInfo(lp))

  
  return (
    <>
    {
      lbState.map((oneInstance)=> {
        return(
          <LbBelegungRow lbBelegung={oneInstance}/>
        );
      })
    }
    </>
  );
}
