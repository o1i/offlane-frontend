import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import { LbInstance, SusInfo } from '../common/objects';
import { enrol } from './susApi';

const useStyles = makeStyles({
    name: {
        fontSize: 18,
    },
    rest: {
        fontSize: 12,
    },
  });

export const LbSelectDialog = ({open, onClose, lbInstances, susInfoState}: {open:boolean, onClose: () => void, lbInstances: LbInstance[], susInfoState: [SusInfo, (susInfo: SusInfo) => void]}) => {
    
    const classes = useStyles();


    const handleClose = () => {
        onClose();
    }

    const handleListItemClick = (lbInstance: LbInstance) => {
        enrol(lbInstance, susInfoState[0], susInfoState[1]);
        onClose();
    }

    return(
        <Dialog open={open} onClose={handleClose}>
            <List>
                {lbInstances.map((lbInstance, index)=>(
                    <ListItem button onClick={() => handleListItemClick(lbInstance)} key={index}>
                            <span className={classes.name}>{lbInstance.name}, </span><span className={classes.rest}>{lbInstance.lehrer}, {lbInstance.ort}</span>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}