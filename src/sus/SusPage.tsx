import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { KwItem } from  './KwItem';
import { SusInfo, Slot, Kw, LbInstance } from "../common/objects";
import Grid from '@material-ui/core/Grid';
import { OneSlot } from "./OneSlot";
import { LbSelectDialog } from "./LbSelectDialog"

const useStyles = makeStyles({
  slot: {
    fontSize: 11,

  },
  row: {
    minWidth: 500,
  },
  header: {
    height: 50,
  }
});

export const SusPage = ({slots, kws, lbInstances, susInfoState}: {slots: Slot[], kws: Kw[], lbInstances: LbInstance[], susInfoState: [SusInfo, (susInfo: SusInfo) => void]}) => {
  const classes = useStyles();

  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [dialogueOptions, setDialogueOptions] = useState([] as LbInstance[]);

  const handleDialogueClose = () =>{
    setDialogueOpen(false);
  }
  const setOptionsAndOpen = (lbInstances: LbInstance[]) => {
    setDialogueOptions(lbInstances);
    setDialogueOpen(true);
  }

  const slotRows = slots.map((slot: Slot) => (
    {
      slot: slot,
      lbInstances: kws.map((kw) => (
        lbInstances.find((lbInstance) => (lbInstance.kw === kw.index) && (lbInstance.slot === slot.id)) ?? {name: "Unbelegt", lehrer: "", ort: "", status: "open", slot: slot.id, kw: kw.index, id: -1} as LbInstance
      ))
    }
  ))

  return (
    <>
      <Grid container direction="row" justify="flex-start" spacing={1} wrap="nowrap" className={classes.row}>
          <Grid item xs={1}></Grid>
          {kws.map((oneInstance, key) => 
          <Grid item key={key} xs={4}>
              <KwItem kw={oneInstance}/>
          </Grid>
          )}
      </Grid>
      {slotRows.map((oneInstance, index) => 
      <OneSlot slotRow={oneInstance} optionSetter={setOptionsAndOpen} key={index}/>)}
      <LbSelectDialog open={dialogueOpen} onClose={handleDialogueClose} lbInstances={dialogueOptions} susInfoState={susInfoState}/>
    </>
  );
}
