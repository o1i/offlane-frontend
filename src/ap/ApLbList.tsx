import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ApStundenplanPage } from "./ApStundenplanPage";
import { ApPeoplePage } from "./ApPeoplePage";
import { Lernbuero, Block } from '../common/objects';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import { addLb, deleteLb, getAllLps } from "./ApApi";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';


const useStyles = makeStyles({
  selectorTab: {
    "margin-bottom": 10
  },
  newName: {
    width: 70,
  },
  newSoft: {
    width: 50,
  },
  addLb: {
    maxWidth: 300,
  },
  lpDropdown: {

  }
});

export const ApLbList = ({token, lbs, block, setLbs}: {token: string, lbs: Lernbuero[], block: Block, setLbs: (lbs: Lernbuero[]) => void}) => {
  const classes = useStyles();

  const [lbName, setLbName] = useState("");
  const [lbLehrer, setLbLehrer] = useState("");
  const [lbOrt, setLbOrt] = useState("");
  const [lbSoft, setLbSoft] = useState(15);
  const [lbId, setLbId] = useState(-1);
  const [allLps, setAllLps] = useState<string[]>([]);
  const [changeAll, setChangeAll] = useState<boolean>(false);
  

  useEffect(() => {getAllLps(token).then(lps => setAllLps(lps))}, []);


  const handleAddLernbuero = () => {
    addLb(token, changeAll, {name: lbName, lehrer: lbLehrer, ort: lbOrt, soft: lbSoft, hard: lbSoft + 5, block_id: block.id, id: lbId, block: block} as Lernbuero)
    .then(lbs => {console.log("addlernbuero"); setLbs(lbs);});
    setLbName("");
    setLbLehrer("");
    setLbOrt("");
    setLbSoft(25);
    setLbId(-1);
  }

  const handleClearSelection = () => {
    setLbName("");
    setLbLehrer("");
    setLbOrt("");
    setLbSoft(25);
    setLbId(-1);
  }


  const handleDeleteLernbuero = (lb: Lernbuero) => {
    deleteLb(token, lb.id)
    .then(lbs => {console.log("addlernbuero"); setLbs(lbs);});
    setLbName("");
    setLbLehrer("");
    setLbOrt("");
    setLbId(-1);
  }

  const handleSelectLernbuero = (lb: Lernbuero) => {
    setLbName(lb.name);
    setLbLehrer(lb.lehrer);
    setLbOrt(lb.ort);
    setLbId(lb.id);
    setLbSoft(lb.soft);
  }

  console.log("start aplblist");
  console.log(lbs);

  return (
    <List>
      {lbs.map(lb => 
        <ListItem button onClick={e => handleSelectLernbuero(lb)}>
            <ListItemText primary={lb.name} secondary={lb.lehrer + ", " + lb.ort + " (" + lb.soft + ")"}></ListItemText>
            <ListItemSecondaryAction>
              <IconButton aria-label="Edit Lernbuero" onClick={e => handleDeleteLernbuero(lb)}>
                <DeleteIcon/>
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        )}
        <ListItem className={classes.addLb}>
          <ListItemText primary={<TextField placeholder="Name" value={lbName} onChange={e => setLbName(e.target.value)}/>} secondary={
            <span>
               <FormControl className={classes.lpDropdown}>
                  <Select
                    value={lbLehrer}
                    onChange={e => setLbLehrer(e.target.value as string)}
                  >
                    <MenuItem value="">
                      <em>LP Kürzel</em>
                    </MenuItem>
                    {allLps.map(lp => <MenuItem value={lp}>{lp}</MenuItem>)}
                  </Select>
                </FormControl>

            <TextField placeholder="Ort" size="small" value={lbOrt} onChange={e => setLbOrt(e.target.value)} className={classes.newName}/>
            <TextField placeholder="Max" size="small" value={lbSoft} onChange={e => setLbSoft(parseInt(e.target.value))} className={classes.newSoft}/>
            <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={changeAll} onChange={e=> setChangeAll(e.target.checked)} name="changeAllBox" />}
                  label="Alle ändern"
                />
                </FormGroup>
            </span>
            }/>
            <ListItemSecondaryAction>
              <IconButton aria-label="ClearSelection" onClick={handleClearSelection} disabled={!(block.id>0)}>
                <ClearIcon/>
              </IconButton>
              <IconButton aria-label="Add Lernbuero" onClick={handleAddLernbuero} disabled={!(block.id>0)}>
                <SaveIcon/>
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    </List>
  );
}

