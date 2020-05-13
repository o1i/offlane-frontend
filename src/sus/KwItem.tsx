import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Kw } from "../common/objects";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  header: {
    "text-align": "center",
    fontSize: 18,
  },
  body: {
    "text-align": "center",
    fontSize: 12,
  },
  box: {
    padding: "5px",
    color: "#999999",
  },
});

export const KwItem = ({kw}: {kw: Kw}) => {
  const classes = useStyles();
    return (
          <Box className={classes.box}>
              <div>
                  <Typography className={classes.header} >KW {kw.index}</Typography>
              </div>
              <div>
                  <Typography className={classes.body}>{kw.from}-{kw.to}</Typography>
              </div>
          </Box>
    );
}
