import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import { LbInstance, SusInfo } from '../common/objects';
import { enrol, unEnrol } from './susApi';
import { unEnrolSus } from '../lp/lpApi';

const useStyles = makeStyles({
    name: {
        fontSize: 18,
    },
    rest: {
        fontSize: 12,
    },
  });

export const LbSelectDialog = ({open, onClose, token, lbInstances, currentLbiId, susInfoState}: {open:boolean, token: string, onClose: () => void, lbInstances: LbInstance[], currentLbiId: number, susInfoState: [SusInfo, (susInfo: SusInfo) => void]}) => {
    
    const classes = useStyles();


    const handleClose = () => {
        onClose();
    }

    const handleListItemClick = (lbInstance: LbInstance) => {
        enrol(lbInstance, token, susInfoState[1]);
        onClose();
    }

    const handleUnenrol = (lbInstance_id: number) => {
        unEnrol(lbInstance_id, token).then(lbis => susInfoState[1](lbis)).catch(e => console.log(e));
        onClose();
    }

    return(
        <Dialog open={open} onClose={handleClose}>
            <List>
                <ListItem button onClick={() => handleUnenrol(currentLbiId)}>
                        <span className={classes.name}>Offen</span>
                </ListItem>
                {lbInstances.map((lbInstance, index)=>(
                    <ListItem button onClick={() => handleListItemClick(lbInstance)} key={index}>
                            <span className={classes.name}>{lbInstance.lb.name}, </span><span className={classes.rest}>{lbInstance.lb.lehrer}, {lbInstance.lb.ort}</span>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}