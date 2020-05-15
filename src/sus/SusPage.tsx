import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { KwItem } from  './KwItem';
import { SlotRow, Kw } from "../common/objects";
import Grid from '@material-ui/core/Grid';
import { OneSlot } from "./OneSlot";

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

export const SusPage = ({slotRows, kws}: {slotRows: SlotRow[], kws: Kw[]}) => {
  const classes = useStyles();

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
      {slotRows.map((oneInstance, key) => 
      <OneSlot {...oneInstance}/>)}
    </>
  );
}
