import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { KwItem } from  './KwItem';
import { SusInfo, Block, Kw, LbInstance } from "../common/objects";
import { getStart } from "../common/functions";
import { getWeek } from "../common/functions";
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

export const SusPage = ({blocks, kws, lbInstances, susInfoState}: {blocks: Block[], kws: Kw[], lbInstances: LbInstance[], susInfoState: [SusInfo, (susInfo: SusInfo) => void]}) => {
  const classes = useStyles();

  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [dialogueOptions, setDialogueOptions] = useState<LbInstance[]>([]);

  const handleDialogueClose = () =>{
    setDialogueOpen(false);
  }
  const setOptionsAndOpen = (lbInstances: LbInstance[]) => {
    setDialogueOptions(lbInstances);
    setDialogueOpen(true);
  }

  const slotRows = blocks.map((block: Block) => (
    {
      block: block,
      lbInstances: kws.map((kw) => (
        susInfoState[0].lbInstances.find((lbInstance) => (getWeek(new Date(lbInstance.start * 1000)) === kw.index) && (lbInstance.lb.block.id === block.id)) || 
        {lb: {name: "Unbelegt", lehrer: "", ort: "", block: {id: block.id}}, status: "open", id: -1, start: getStart(block.weekDay, block.start, kw.index)} as LbInstance
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
