import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LbInstance, User, dateFormat } from "../common/objects";
import { LbBelegung } from "./LbBelegung";
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    gridRow: {
        minWidth: 1000,
    }
});

export const LbBelegungRow = ({lbBelegung}: {lbBelegung: {lbInstance: LbInstance, sus: User[]}[]}) => {

    const classes = useStyles();

    return(
        <Grid container direction="row" spacing={2} wrap="nowrap" className={classes.gridRow} >
        {lbBelegung.map(({lbInstance, sus}) => {
            return(
                <Grid item md={4}>
                    <LbBelegung lb={lbInstance} sus={sus}/>
                </Grid>
            );
        })}
        </Grid>
    );
}