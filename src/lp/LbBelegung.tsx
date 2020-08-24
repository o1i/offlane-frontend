import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LbInstance, User, dateFormat } from "../common/objects";
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
  chip: {
      float: "right",
  },
  paper: {
      padding: 5,
      "background-color": "#bbbbbb",
  },
  name: {
    fontSize: 18,
    "font-weight": "bold",
    "font-family": "helvetica"
  },
  rest: {
    fontSize: 12
  }
});

export const LbBelegung = ({lb, sus}: {lb: LbInstance, sus: User[]}) => {

    const classes = useStyles();

    return(
        <Paper square className={classes.paper}>
            <span className={classes.name}>{lb.lb.name}</span> <span className={classes.rest}>{dateFormat.format(lb.start*1000)} {lb.lb.ort}  </span> 
            <Chip className={classes.chip} size="small" label={lb.current + "/" + lb.lb.soft} />
        </Paper>
    );
}