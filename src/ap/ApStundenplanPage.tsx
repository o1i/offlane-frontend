import React, {useState, useEffect} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import { getGruppen, addGruppe, deleteGruppe, getBlocks, addBlock, changeBlock, getLbs } from "./ApApi";
import { Stundenplan } from "./Stundenplan";
import { Gruppe, Block, Lernbuero } from '../common/objects';
import { ApLbList } from './ApLbList';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper:{
            padding: theme.spacing(1),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        },
        main:{
            "background-color": "#f9f9f9",
        },
        spaltenTitel: {
            fontSize: 21,
            "font-family": "helvetica",
            "font-weight": "bold",
            "color": "#666677",
            "padding-bottom": 15,
        },
        form: {
            "background-color": "#fff",
            width: "80%"
        },
        addPart: {

        },
        timeContainer: {
            display: 'flex',
            flexWrap: 'wrap',
          },
        timeTextField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        LbColumn: {
            maxWidth: 460,
        },
        GruppenColumn:  {
            minWidth: 260,
        },
}));

export const ApStundenplanPage = ({token}: {token: string}) => {
    const classes = useStyles();

    // Gruppen
    const [gruppen, setGruppen] = useState<Gruppe[]>([]);
    const [gruppenName, setGruppenName] = useState("");
    const [selectedGroup, setSelectedGroup] = useState<Gruppe>({name: "none", id:-1} as Gruppe); 

    useEffect(() => getGruppen(token, setGruppen), [])

    const handleAddGruppe = () => {
        if(gruppenName){
            addGruppe(token, setGruppen, [{"name": gruppenName, "id": -1}] as Gruppe[])};
            setGruppenName("");
    }

    const handleDeleteGruppe = (token: string, setter: (gruppen: Array<Gruppe>) => void, id:number) => {
        deleteGruppe(token, setter, [id])
        if(selectedGroup.id === id){
            setSelectedGroup({id: -1, name: ""})
        }
    }

    //Blocks
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [blocksEditable, setBlocksEditable] = useState(false);
    const [addingBlock, setAddingBlock] = useState(false);
    const [blockInputStart, setBlockInputStart] = useState("");
    const [blockInputEnd, setBlockInputEnd] = useState("");
    const [blockInputWeekDay, setBlockInputWeekDay] = useState(1);


    useEffect(() => getBlocks(token, setBlocks, gruppen.length > 0 ? gruppen[0].id : -1), [])

    const handleAddBlock = () => {
        setAddingBlock(true);
        setChosenBlock({} as Block);
        setBlocksEditable(true);
        setBlockInputStart("07:00");
        setBlockInputEnd("07:45")
    }

    const handleEditBlock = () => {
        setAddingBlock(false);
        setBlocksEditable(true);
    }

    const handleSaveBlock = () => {
        if(addingBlock){
            console.log("adding block");
            addBlock(token, setBlocks, blockInputStart, blockInputEnd, blockInputWeekDay, selectedGroup);
            setChosenBlock(blocks.filter(b => (b.start === blockInputStart) && (b.gruppe.id === selectedGroup.id))[0]);
        }else{
            console.log("changing block");
            changeBlock(token, setBlocks, blockInputStart, blockInputEnd, blockInputWeekDay, chosenBlock.id);
        }
        console.log(blocks);
        setBlocksEditable(false);
        setAddingBlock(false);
    }

    useEffect(() => {
        console.log("getting blocks");
        getBlocks(token, setBlocks, selectedGroup.id);
        setChosenBlock(blocks.length > 0 ? blocks[0] : {"id": -1} as Block);
        console.log("Chosen Block:"); console.log(chosenBlock);}, [selectedGroup])

    //Lbs
    const [chosenBlock, setChosenBlock] = useState<Block>({} as Block);
    const [allLbs, setAllLbs] = useState<Lernbuero[]>([]);
    const [lbs, setLbs] = useState<Lernbuero[]>([]);
    const [chosenLb, setChosenLb] = useState<Lernbuero>();

    //export interface Lernbuero {name: string, lehrer: string, ort: string, soft: number, hard: number, block: Block, id: number};

    useEffect(() => setAllLbs(getLbs()), [])
    useEffect(() => setLbs(allLbs.filter(x => x.block_id === chosenBlock.id)), [chosenBlock])

    
    return (
        <Grid container spacing={2} direction="row" justify="flex-start" align-items="flex-start" wrap="nowrap" className={classes.main}>

            <Grid item container spacing={0} direction="column" md={2} className={classes.GruppenColumn}>
                <Grid item >
                    <Typography>
                        <Box className={classes.spaltenTitel}>
                            Lernbüro-Gruppen
                        </Box>
                    </Typography>
                </Grid>
                <List>
                    {gruppen.map((g, key=g.id) => {
                        return(
                            <ListItem button key={g.id} onClick={(e) => setSelectedGroup(g)}>{g.name}
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Remove Gruppe" onClick={e => handleDeleteGruppe(token, setGruppen, g.id)}>
                                        <DeleteIcon  fontSize="small"/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
                <Grid item>
                    <Box className={classes.addPart}>
                        <TextField required id="groupName" label="LB-Gruppenname" className={classes.form} color="secondary"
                        value={gruppenName} onChange={(e) => setGruppenName(e.target.value)}/>
                        <IconButton aria-label="Add Group" onClick={handleAddGruppe}>
                            <AddBoxIcon/>
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            <Grid item md={6}>
                    <Typography>
                        <Box className={classes.spaltenTitel}>
                            Stundenplan {selectedGroup ? selectedGroup.name : ""}
                        </Box>
                    </Typography>
                    <Stundenplan blocks={blocks} chosenBlock={chosenBlock} setChosenBlock={setChosenBlock}/>
            </Grid>

            <Grid item container spacing={0} direction="column" justify="flex-start" md={5} align-items="stretch" className={classes.LbColumn}>
                <Grid item>
                    <Typography>
                        <Box className={classes.spaltenTitel}>
                            Lernbüros &nbsp;
                            <FormControl>
                                <Select
                                    value={blockInputWeekDay}
                                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => {setBlockInputWeekDay(e.target.value as number); console.log(blockInputWeekDay);}}
                                    disabled={!blocksEditable}
                                    >
                                    <MenuItem value={1}>Mo</MenuItem>
                                    <MenuItem value={2}>Di</MenuItem>
                                    <MenuItem value={3}>Mi</MenuItem>
                                    <MenuItem value={4}>Do</MenuItem>
                                    <MenuItem value={5}>Fr</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="timeVon"
                                type="time"
                                value={blockInputStart}
                                onChange={e => setBlockInputStart(e.target.value)}
                                className={classes.timeTextField}
                                disabled={!blocksEditable}
                            /> &ndash;
                            <TextField
                                id="timeBis"
                                type="time"
                                value={blockInputEnd}
                                onChange={e => setBlockInputEnd(e.target.value)}
                                className={classes.timeTextField}
                                disabled={!blocksEditable}
                            />

                            <IconButton aria-label="Add Group" onClick={handleAddBlock} disabled={!(selectedGroup.id>0)}>
                                <AddBoxIcon  fontSize="small"/>
                            </IconButton>
                            {blocksEditable ? 
                             <IconButton aria-label="Save Group" onClick={handleSaveBlock} disabled={!(addingBlock || blocksEditable)}>
                                <SaveIcon fontSize="small"/>
                            </IconButton>:
                            <IconButton aria-label="Edit Group" onClick={handleEditBlock} disabled={chosenBlock && (chosenBlock.id>0)}>
                                 <EditIcon fontSize="small"/>
                            </IconButton>}
                        </Box>
                    </Typography>
                </Grid>
                {chosenBlock && <ApLbList lbs={lbs} block={chosenBlock} setLbs={setAllLbs}/>}
            </Grid>
        </Grid>
    );
}
