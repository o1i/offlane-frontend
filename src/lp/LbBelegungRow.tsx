import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LbInstance, User, dateFormat } from "../common/objects";
import { LbBelegung } from "./LbBelegung";
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
                    <List dense={true}>
                    {
                    sus.map(({name, id}) => {
                        return(
                            <ListItem>
                                <ListItemText primary={name}/>
                                <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                    </List>
                </Grid>
            );
        })}
        </Grid>
    );
}