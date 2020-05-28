import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LbInstance, User } from "../common/objects";
import { LbBelegung } from "./LbBelegung";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/AddCircle';
import { getEligibleSus, unEnrolSus } from "./lpApi";

const useStyles = makeStyles({
    gridRow: {
        minWidth: 1000,
    },
    susList: {
        "background-color": "#f5f5f5"
    },
    iconButtonListItem: {
        display: "flex",
        justifyContent:'center',
        padding: 2,
    },
    iconButton: {
        padding: 2,
    }
});

export const LbBelegungRow = ({lbBelegung, getState, setState, setDialogUsers, setDialogLb, setDialogState}: 
    {lbBelegung: {lbInstance: LbInstance, sus: User[]}[], 
    getState: {lbInstance: LbInstance, sus: User[]}[][], 
    setState: (enrolState: {lbInstance: LbInstance, sus: User[]}[][]) => void, 
    setDialogUsers: (suses: User[]) => void, 
    setDialogLb: (LbInstance: LbInstance) => void,
    setDialogState: (state: boolean) => void}) => {

    const classes = useStyles();

    const handleClick = (lbInstance: LbInstance) => {
        setDialogLb(lbInstance);
        setDialogUsers(getEligibleSus(lbInstance.id));
        setDialogState(true);
    }

    return(
        <Grid container direction="row" spacing={2} wrap="nowrap" className={classes.gridRow} >
        {lbBelegung.map(({lbInstance, sus}) => {
            return(
                <Grid item md={4} key={lbInstance.id}>
                    <LbBelegung lb={lbInstance} sus={sus}/>
                    <List dense={true} className={classes.susList}>
                    <ListItem alignItems="center" button={true} dense={true} divider={true} className={classes.iconButtonListItem} onClick={() => handleClick(lbInstance)}>
                        <IconButton aria-label="add" className={classes.iconButton} color="primary">
                            <AddCircle />
                        </IconButton>
                    </ListItem>
                    {
                    sus.map(({name, id}) => {
                        return(
                            <ListItem key={id}>
                                <ListItemText primary={name}/>
                                <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => unEnrolSus(id, lbInstance.id, getState, setState)}>
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