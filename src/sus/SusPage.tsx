import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { KwItem } from  './KwItem';
import { SusInfo, Block, Kw, LbInstance } from "../common/objects";
import { getStart } from "../common/functions";
import { getWeek } from "../common/functions";
import Grid from '@material-ui/core/Grid';
import { OneSlot } from "./OneSlot";
import { LbSelectDialog } from "./LbSelectDialog";
import { getEnrolments, getEnrolmentOptions } from './susApi';


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

export const SusPage = ({token}: {token: string}) => {


  const url_get_enrolments = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "sus/enrolment"

  const [susInfo, setSusInfo] = useState({blocks: [] as Array<Block>, kws: [] as Array<Kw>, lbInstances: [] as Array<LbInstance>});

  useEffect(()=>{
      getEnrolments(token, setSusInfo);
  }, []);

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

  const getOptionsAndOpen = () =>  {
    return ((kw_index: number, block_id: number) => {
      getEnrolmentOptions(token, setDialogueOptions, kw_index, block_id);
      setDialogueOpen(true);
    })
  }

  const slotRows = susInfo.blocks.map((block: Block) => (
    {
      block: block,
      lbInstances: susInfo.kws.map((kw) => (
        susInfo.lbInstances.find((lbInstance) => (getWeek(new Date(lbInstance.start * 1000)) === kw.index) && (lbInstance.lb.block_id === block.id)) || 
        {lb: {name: "Unbelegt", lehrer: "", ort: "", block_id: block.id}, status: "open", id: -1, start: getStart(block.weekDay, block.start, kw.index)} as LbInstance
      ))
    }
  ))

  return (
    <>
      <Grid container direction="row" justify="flex-start" spacing={1} wrap="nowrap" className={classes.row}>
          <Grid item xs={1}></Grid>
          {susInfo.kws.map((oneInstance, key) => 
          <Grid item key={key} xs={4}>
              <KwItem kw={oneInstance}/>
          </Grid>
          )}
      </Grid>
      {slotRows.map((oneInstance, index) => 
      <OneSlot slotRow={oneInstance} optionSetter={getOptionsAndOpen()} key={index}/>)}
      <LbSelectDialog open={dialogueOpen} token={token} onClose={handleDialogueClose} lbInstances={dialogueOptions} susInfoState={[susInfo, setSusInfo]}/>
    </>
  );
}
