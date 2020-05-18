import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {SlotRow, LbInstance } from "../common/objects";
import Grid from '@material-ui/core/Grid';
import { InstanceEnrolment } from "./InstanceEnrolment";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  slot: {
    textAlign: "left",
    fontSize: 11,
    color: "#999999",
    "align-self": "center"
  },
  row: {
    minWidth: 500
  }
});

export const OneSlot = ({slot, lbInstances}: SlotRow) => {
  const classes = useStyles();

  return (
    <Grid container direction="row"
        alignItems="stretch" spacing={1} wrap="nowrap" className={classes.row}>
      <Grid item xs={1} className={classes.slot}>
          <Box>
            <div>
                <div>{slot.weekDay}</div>
                <div>{slot.time}</div>
            </div>
          </Box>
      </Grid>
      {lbInstances.map((oneInstance, key) => 
        <Grid item key={key} xs={4}>
            <InstanceEnrolment {...oneInstance}/>
        </Grid>
        )}
    </Grid>
  );
}
