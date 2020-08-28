import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Block } from "../common/objects";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
 root: {
     "background-color": "#f9f9f9",
     minHeight: 500,
 },
 day: {
    border: "1px solid black",
    "flex-grow": 3,
    position: "relative",
 },
 timeSlot: {
    "flex-grow": 1,
    position: "relative",
    minWidth: 55,
},
timeBox: {
    "border-top": "1px solid black",
    position: "absolute",
    width: "100%",
    "vertical-align": "text-top",
},
blockRep: {
    position: "absolute",
    width: "100%",
    "background-color": "#9090d0",
},
blockRepHighlight: {
    position: "absolute",
    width: "100%",
    "background-color": "#d09090",
},
grayedOut: {
    position: "absolute",
    width: "100%",
    "background-color": "#dddde0",
}
});

const globalStart = 7.0;
const globalEnd = 19.0;

const timeBlocks = [
    {weekDay: 1, start: "08:00", end: "09:00", gruppe: {name: "", id: 0}, id: -1},
    {weekDay: 1, start: "12:00", end: "13:00", gruppe: {name: "", id: 0}, id: -2},
    {weekDay: 1, start: "13:00", end: "14:00", gruppe: {name: "", id: 0}, id: -3},
    {weekDay: 1, start: "17:00", end: "18:00", gruppe: {name: "", id: 0}, id: -4},
];

const BlockRep = ({block, cl, txt, setChosenBlock}: {block: Block, cl: string, txt: string, setChosenBlock: (b: Block) => void}) => {
    const classes = useStyles();
    const start = ((parseFloat(block.start.substring(0, 2)) - globalStart) + (parseFloat(block.start.substring(3, 5)) / 60)) / (globalEnd - globalStart)
    const end   = ((parseFloat(block.end.substring(0, 2)) - globalStart) + (parseFloat(block.end.substring(3, 5)) / 60)) / (globalEnd - globalStart)
    return(
        <Box style={{top: Math.round(start * 100) + "%", height:  Math.round((end - start) * 100) + "%"}} className={cl} onClick={e => setChosenBlock(block)}>
            {txt}
        </Box>
    )
}


export const Stundenplan = ({blocks, chosenBlock, setChosenBlock}: {blocks: Block[], chosenBlock: Block, setChosenBlock: (b: Block) => void}) => {
  const classes = useStyles();
  console.log("chosen block");
  console.log(chosenBlock);
  return (
    <Grid container direction="row" alignItems="stretch" spacing={0} wrap="nowrap" className={classes.root}>
        <Grid item className={classes.timeSlot}>
            <Box style={{top: Math.round((12-globalStart)/(globalEnd - globalStart) * 100) + "%", height: Math.round((1)/(globalEnd - globalStart) * 100) + "%"}} 
                className={classes.grayedOut}/>
        {timeBlocks.map((block, index)=>
                <BlockRep block={block} key={block.id} cl={classes.timeBox} txt={block.start} setChosenBlock={setChosenBlock}/>
            )}
        </Grid>
        <Grid item className={classes.day} >
            <Box style={{top: Math.round((12-globalStart)/(globalEnd - globalStart) * 100) + "%", height: Math.round((1)/(globalEnd - globalStart) * 100) + "%"}} 
                className={classes.grayedOut}/>
            {blocks.filter(b => b.weekDay === 1).map((block, index)=>
                <BlockRep block={block} key={block.id} cl={block.id === chosenBlock.id ? classes.blockRepHighlight : classes.blockRep} txt="" setChosenBlock={setChosenBlock}/>
            )}
        </Grid>
        <Grid item className={classes.day} >
            <Box style={{top: Math.round((12-globalStart)/(globalEnd - globalStart) * 100) + "%", height: Math.round((1)/(globalEnd - globalStart) * 100) + "%"}} 
                className={classes.grayedOut}/>
            {blocks.filter(b => b.weekDay === 2).map((block, index)=>
                <BlockRep block={block} key={block.id} cl={block.id === chosenBlock.id ? classes.blockRepHighlight : classes.blockRep} txt="" setChosenBlock={setChosenBlock}/>
            )}
        </Grid>
        <Grid item className={classes.day} >
            <Box style={{top: Math.round((12-globalStart)/(globalEnd - globalStart) * 100) + "%", bottom: 0}} 
                className={classes.grayedOut}/>
            {blocks.filter(b => b.weekDay === 3).map((block, index)=>
                <BlockRep block={block} key={block.id} cl={block.id === chosenBlock.id ? classes.blockRepHighlight : classes.blockRep} txt="" setChosenBlock={setChosenBlock}/>
            )}
        </Grid>
        <Grid item className={classes.day} >
            <Box style={{top: Math.round((12-globalStart)/(globalEnd - globalStart) * 100) + "%", height: Math.round((1)/(globalEnd - globalStart) * 100) + "%"}} 
                className={classes.grayedOut}/>
            {blocks.filter(b => b.weekDay === 4).map((block, index)=>
                <BlockRep block={block} key={block.id} cl={block.id === chosenBlock.id ? classes.blockRepHighlight : classes.blockRep} txt="" setChosenBlock={setChosenBlock}/>
            )}
        </Grid>
        <Grid item className={classes.day} >
            <Box style={{top: Math.round((12-globalStart)/(globalEnd - globalStart) * 100) + "%", height: Math.round((1)/(globalEnd - globalStart) * 100) + "%"}} 
                className={classes.grayedOut}/>
            {blocks.filter(b => b.weekDay === 5).map((block, index)=>
                <BlockRep block={block} key={block.id} cl={block.id === chosenBlock.id ? classes.blockRepHighlight : classes.blockRep} txt="" setChosenBlock={setChosenBlock}/>
            )}
        </Grid>
    </Grid>
  );
}