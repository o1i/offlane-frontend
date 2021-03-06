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
import ClearIcon from '@material-ui/icons/Clear';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import { getGruppen, addGruppe, deleteGruppe, getBlocks, addBlock, changeBlock, getLbs } from "./ApApi";
import { Stundenplan } from "./Stundenplan";
import { Gruppe, Block, Lernbuero } from '../common/objects';
import { ApLbList } from './ApLbList';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Cancel } from '@material-ui/icons';

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
            width: "70%"
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
    const [groupEditMode, setGroupEditMode] = useState(false);

    useEffect(() => getGruppen(token, setGruppen), [])

    const handleAddGruppe = () => {
        if(gruppenName){
            addGruppe(token, setGruppen, [{"name": gruppenName, "id": -1}] as Gruppe[])};
            setGruppenName("");
    }

    const gotoEditGruppe = (gruppe: Gruppe) => {
        setGroupEditMode(true);
        setSelectedGroup(gruppe);
        setGruppenName(gruppe.name);
    }

    const handleEditGruppe = () => {
        addGruppe(token, setGruppen, [{id: selectedGroup.id, name: gruppenName}])
        setSelectedGroup({id: -1, name: ""});
        setGruppenName("");
        setGroupEditMode(false);
    }

    const handleCancelEditGruppe = () => {
        setSelectedGroup({id: -1, name: ""});
        setGruppenName("");
        setGroupEditMode(false);
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
    const [cancelAddBlock, setCancelAddBlock] = useState(false);
    const [blockInputStart, setBlockInputStart] = useState("");
    const [blockInputEnd, setBlockInputEnd] = useState("");
    const [blockInputWeekDay, setBlockInputWeekDay] = useState(1);


    useEffect(() => getBlocks(token, setBlocks, gruppen.length > 0 ? gruppen[0].id : -1), [])

    const handleAddBlock = () => {
        setAddingBlock(true);
        setCancelAddBlock(true);
        setChosenBlock({"id": -1} as Block);
        setBlocksEditable(true);
        setBlockInputStart("07:00");
        setBlockInputEnd("07:45")
    }

    const handleCancelAddBlock = () =>{
        setAddingBlock(false);
        setCancelAddBlock(false);
        setChosenBlock({"id": -1} as Block);
        setBlocksEditable(false);
        setBlockInputStart("");
        setBlockInputEnd("")
    }

    const handleEditBlock = () => {
        setAddingBlock(false);
        setBlocksEditable(true);
        setCancelAddBlock(true);
    }

    const handleSaveBlock = () => {
        if(addingBlock){
            addBlock(token, blockInputStart, blockInputEnd, blockInputWeekDay, selectedGroup)
            .then(b => {setBlocks(b); return (b as Block[])})
            .then(b => setChosenBlock(b.filter(bl => (bl.weekDay == blockInputWeekDay && bl.start === blockInputStart) && (bl.gruppe.id === selectedGroup.id))[0]));
        }else{
            changeBlock(token, setBlocks, blockInputStart, blockInputEnd, blockInputWeekDay, chosenBlock.id);
        }
        setBlocksEditable(false);
        setAddingBlock(false);
        setCancelAddBlock(false);
    }

    useEffect(() => {
        getBlocks(token, setBlocks, selectedGroup.id);
        setChosenBlock(blocks.length > 0 ? blocks[0] : {"id": -1} as Block);
    }, [selectedGroup])

    //Lbs
    const [chosenBlock, setChosenBlock] = useState<Block>({} as Block);
    const [lbs, setLbs] = useState<Lernbuero[]>([]);
    const [chosenLb, setChosenLb] = useState<Lernbuero>();

    //export interface Lernbuero {name: string, lehrer: string, ort: string, soft: number, hard: number, block: Block, id: number};

    useEffect(() => {getLbs(token, chosenBlock.id).then(lbs => {setLbs(lbs); console.log("setChosenBlock"); console.log(lbs);});}, [chosenBlock])

    
    return (
        <Grid container spacing={2} direction="row" justify="flex-start" align-items="flex-start" wrap="nowrap" className={classes.main}>

            <Grid item container spacing={0} direction="column" md={3} className={classes.GruppenColumn}>
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
                            <ListItem button key={g.id} onClick={(e) => {setSelectedGroup(g); setGroupEditMode(false);}}>{g.name}
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Edit Gruppe" onClick={e => gotoEditGruppe(g)}>     
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
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
                        {groupEditMode ? 
                        <>
                        <IconButton aria-label="Cancel Edit" onClick={handleCancelEditGruppe}>
                            <ClearIcon/>
                        </IconButton>
                        <IconButton aria-label="Persist Edit" onClick={handleEditGruppe}>
                            <SaveIcon/>
                        </IconButton>
                        </>
                        : 
                        <IconButton aria-label="Add Group" onClick={handleAddGruppe}>
                            <AddBoxIcon/>
                        </IconButton>
                        
                        }
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
                                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => setBlockInputWeekDay(e.target.value as number)}
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

                            {!cancelAddBlock && <IconButton aria-label="Add Block" onClick={handleAddBlock} disabled={!(selectedGroup.id>0)}>
                                <AddBoxIcon  fontSize="small"/>
                            </IconButton>}
                            {cancelAddBlock && <IconButton aria-label="Cancel adding/editing Block" onClick={handleCancelAddBlock}>
                                <ClearIcon  fontSize="small"/>
                                </IconButton>}
                            {blocksEditable ? 
                             <IconButton aria-label="Save Block" onClick={handleSaveBlock} disabled={!(addingBlock || blocksEditable)}>
                                <SaveIcon fontSize="small"/>
                            </IconButton>:
                            <IconButton aria-label="Edit Block" onClick={handleEditBlock} disabled={chosenBlock && (chosenBlock.id>0)}>
                                 <EditIcon fontSize="small"/>
                            </IconButton>}
                        </Box>
                    </Typography>
                </Grid>
                {chosenBlock && <ApLbList token={token} lbs={lbs} block={chosenBlock} setLbs={setLbs}/>}
            </Grid>
        </Grid>
    );
}
