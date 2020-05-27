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
import { LpAddSusDialog } from "./LpAddSusDialog";
import { getEligibleSus, enrolSusFactory, unEnrolSus } from "./lpApi";

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

export const LbBelegungRow = ({lbBelegung, getState, setState}: {lbBelegung: {lbInstance: LbInstance, sus: User[]}[], getState: {lbInstance: LbInstance, sus: User[]}[][], setState: (enrolState: {lbInstance: LbInstance, sus: User[]}[][]) => void}) => {

    const classes = useStyles();

    const [dialogState, setDialogState] = useState(false);

    const closeDialog = () => setDialogState(false)

    return(
        <Grid container direction="row" spacing={2} wrap="nowrap" className={classes.gridRow} >
        {lbBelegung.map(({lbInstance, sus}) => {
            return(
                <Grid item md={4}>
                    <LbBelegung lb={lbInstance} sus={sus}/>
                    <LpAddSusDialog open={dialogState} onClose={closeDialog} suses={getEligibleSus(lbInstance.id)} lbInstance={lbInstance} enrolSus={enrolSusFactory(lbInstance.id, getState, setState)}/>
                    <List dense={true} className={classes.susList}>
                    <ListItem alignItems="center" button={true} dense={true} divider={true} className={classes.iconButtonListItem} onClick={() => setDialogState(true)}>
                        <IconButton aria-label="add" className={classes.iconButton} color="primary">
                            <AddCircle />
                        </IconButton>
                    </ListItem>
                    {
                    sus.map(({name, id}) => {
                        return(
                            <ListItem>
                                <ListItemText primary={name}/>
                                <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => unEnrolSus(id, lbInstance.id)}>
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