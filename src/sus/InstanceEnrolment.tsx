import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { LbInstance } from "../common/objects";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles({
  root: {
    "border-style": "outset",
    "border-width": "thick",
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
    float: "left",
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
    width: "49%",
    float: "left",
  },
  ort: {
    fontSize: 12,
    width: "49%",
    float: "right",
  },
  foo: {
    "padding": "5px",
  },
});

export const InstanceEnrolment = ({name, lehrer, ort, status}: LbInstance) => {
  const classes = useStyles();
  const locked = (status === "expired" || status === "forced") ? true : false;

  return (
    <Card className={`${classes.root} ${classes[status]}`}>
      <CardContent className={classes.foo}>
        <div>
          <Typography className={classes.lock}><FontAwesomeIcon icon={locked ? faLock : faLockOpen} /></Typography>
        </div>
        <div>
          <Typography className={`classes.fach ${status}`} gutterBottom>{name}</Typography>
        </div>
        <div>
          <Typography className={classes.lehrer}>{lehrer}</Typography>
          <Typography className={classes.ort}>{ort}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}