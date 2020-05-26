import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import { LbInstance, User } from '../common/objects';

const useStyles = makeStyles({
    name: {
        fontSize: 16,
    },
    rest: {
        fontSize: 12,
    },
  });

export const LpAddSusDialog = ({open, onClose, suses, lbInstance, enrolSus}: {open:boolean, onClose: () => void, suses: User[], lbInstance: LbInstance, enrolSus: (susId: number) => void}) => {
    
    const classes = useStyles();


    const handleClose = () => {
        onClose();
    }

    const handleListItemClick = (susId: number) => {
        enrolSus(susId);
        onClose();
    }

    return(
        <Dialog open={open} onClose={handleClose}>
            <List>
                {suses.map((sus, index)=>(
                    <ListItem button onClick={() => handleListItemClick(sus.id)} key={index}>
                            <span className={classes.name}>{sus.name}, </span>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}