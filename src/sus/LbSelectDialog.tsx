import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { LbInstance } from '../common/objects';
import { getEnrolmentOptions } from './susApi';

const useStyles = makeStyles({
    name: {
        fontSize: 18,
    },
    rest: {
        fontSize: 12,
    },
  });

export const LbSelectDialog = ({open, onClose, lbInstances}: {open:boolean, onClose: () => void, lbInstances: LbInstance[]}) => {
    
    const classes = useStyles();


    const handleClose = () => {
        onClose();
    }

    const handleListItemClick = (lbInstance: LbInstance) => {
        onClose();
    }

    return(
        <Dialog open={open} onClose={handleClose}>
            <List>
                {lbInstances.map((lbInstance)=>(
                    <ListItem button onClick={() => handleListItemClick(lbInstance)} key={lbInstance.id}>
                            <span className={classes.name}>{lbInstance.name}, </span><span className={classes.rest}>{lbInstance.lehrer}, {lbInstance.ort}</span>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}