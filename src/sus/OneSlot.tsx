import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {SlotRow } from "../common/objects";
import Grid from '@material-ui/core/Grid';
import { InstanceEnrolment } from "./InstanceEnrolment";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  slot: {
    textAlign: "left",
    fontSize: 11,
    "align-self": "center",
    color: "#999999",
  },
});

export const OneSlot = ({slot, lbInstances}: SlotRow) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="flex-start" 
        alignItems="stretch" spacing={1} wrap="nowrap">
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
