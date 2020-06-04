import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { LbInstance } from "../common/objects";
import { getWeek } from "../common/functions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { getEnrolmentOptions } from "./susApi";

const useStyles = makeStyles({
  root: {
    "border-style": "outset",
    "border-width": "thick",
    "padding": "5px",
    "height": "75%",
  },
  enrolled: {
    "border-color": "#aaddaa",
  },
  expired: {
    "border-color": "#cccccc",
    "background-color": "#f1f1f1",
    "color": "#bbbbbb"
  },
  open: {
    "border-color": "#eeaaaa",
  },
  forced: {
    "border-color": "#7799ff",
    "background-color": "#f1f1f1",
    "color": "#bbbbbb"
  },
  fach: {
    fontSize: 18,
  },
  lock: {
    fontSize: 8,
    color: "#cccccc",
    float: "right",
    padding: "0px",
  },
  lehrer: {
    fontSize: 12,
  },
  ort: {
    fontSize: 12,
  },
});

export const InstanceEnrolment = ({lbInstance, optionSetter}: {lbInstance: LbInstance, optionSetter: (lbInstances: LbInstance[]) => void}) => {
  const classes = useStyles();

  const {lb, status, start} = lbInstance;
  const kw = getWeek(new Date(start * 1000));

  const locked = (status === "expired" || status === "forced") ? true : false;

  const handleClick = () => {
    const options = getEnrolmentOptions(kw, lb.block.id, 1);
    options.forEach((lbi, index) => lbi.start = lbInstance.start);
    options.forEach((lbi, index) => lbi.lb.block.id = lb.block.id);
    optionSetter(options);
  }

  return (
      <Paper className={`${classes.root} ${classes[status]}`} onClick={handleClick}>
          <div>
            <Typography className={classes.lock}><FontAwesomeIcon icon={locked ? faLock : faLockOpen} /></Typography>
          </div>
          <div>
            <Typography className={`classes.fach ${status}`} gutterBottom>{lb.name}</Typography>
          </div>
          {lb.lehrer && <div>
            <Typography className={classes.lehrer}>{lb.lehrer}</Typography>
          </div>}
          {lb.ort && <div>
            <Typography className={classes.ort}>{lb.ort}</Typography>
          </div>}
      </Paper>
  );
}