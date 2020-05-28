import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getLpLbInfo } from "./lpApi";
import { LbBelegungRow } from "./LbBelegungRow";
import { LbInstance, User, LpLbBelegungRow } from "../common/objects";
import { LpAddSusDialog } from "./LpAddSusDialog";

const useStyles = makeStyles({
  
});

export const LpLbPage = () => {
    const classes = useStyles();
    const lp = 1;
    const [lbState, setLbState] = useState(getLpLbInfo(lp) as {lbInstance: LbInstance, sus: User[]}[][])

    

    const [dialogState, setDialogState] = useState(false);
    const [dialogUsers, setDialogUsers] = useState([] as User[]);
    const [dialogLb, setDialogLb] = useState({} as LbInstance)

    const closeDialog = () => setDialogState(false);
    
    return (
      <>
      <LpAddSusDialog open={dialogState} onClose={closeDialog} suses={dialogUsers} lbInstance={dialogLb} getState={lbState} setState={setLbState}/>
      {
        lbState.map((oneInstance)=> {
          return(
            <LbBelegungRow lbBelegung={oneInstance} getState={lbState} setState={setLbState} key={oneInstance[0].lbInstance.id} setDialogUsers={setDialogUsers} setDialogLb={setDialogLb} setDialogState={setDialogState}/>
          );
        })
      }
      </>
    );
}
