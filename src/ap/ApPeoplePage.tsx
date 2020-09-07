import React, { useState, useEffect} from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';
import { User, Gruppe } from "../common/objects";
import { getAllUsers, addUser, deleteUser, getGruppen } from "./ApApi";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ListItemSecondaryAction } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    lpButton: {
    },
    theGrid:  {
      padding: 15,
    },
    userListPrimary: {
      display: "inline",
    },
    userListSecondary: {
      display: "inline",
      paddingLeft: "10px",
    },
    susInputItem: {
      width: "70%",
    },
  }));

function makeid(length: number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const makePw = () => makeid(4) + "-" + makeid(4);

const lpFromLine = (line: string) => {
  const elements = line.split(/,| |\t|;/).filter(e => e);
  if(line.length > 0){
    return({id: -1, type:"lp", name: elements[0], password: elements.length>1 ? elements[1] : makePw()} as User)
  }else{
    return({} as User)
  }
}

const susFromLine = (line: string) => {
  const elements = line.split(/,| |\t|;/).filter(e => e);
  if(line.length > 0){
    return({id: -1, type:"lp", name: elements[0], gruppe: elements[1], password: elements.length>2 ? elements[2] : makePw()} as User)
  }else{
    return({} as User)
  }
}
 

export const ApPeoplePage = ({token}: {token: string}) => {
  const classes = useStyles();

  const [users, setUsers] = useState<User[]>([]);
  const [lps, setLps] = useState<User[]>([]);
  const [kuerzelState, setKuerzelState] = useState("");
  const [pwState, setPwState] = useState("");
  const [multiKuerzelState, setMultiKuerzelState] = useState("");
  const [lpId, setLpId] = useState(-1);


  const [sus, setSus] = useState<User[]>([]);
  const [susKuerzelState, setSusKuerzelState] = useState("");
  const [susPwState, setSusPwState] = useState("");
  const [susGruppe, setSusGruppe] = useState("");
  const [susMultiKuerzelState, setSusMultiKuerzelState] = useState("");
  const [susId, setSusId] = useState(-1);

  const [allGroups, setAllGroups] = useState<Gruppe[]>([]);

  useEffect(() => {getGruppen(token, setAllGroups);}, [])
  useEffect(() => {getAllUsers(token).then(users=>setUsers(users)).catch(e=>console.log(e));}, [])
  useEffect(() => setLps(users.filter(u => u.type === "lp")), [users])
  useEffect(() => setSus(users.filter(u => u.type === "sus")), [users])

  const handleLpUpdate = () => {
    let toAdd: User[] = [];
    if(kuerzelState){
      toAdd = toAdd.concat([{id: lpId, type:"lp", name:kuerzelState, password: pwState ? pwState : makePw(), gruppe: ""}]);
      setKuerzelState("");
      setPwState("");
      setLpId(-1);
    }
    if( multiKuerzelState){
      const lines = multiKuerzelState.split(/\r?\n/);
      toAdd = toAdd.concat(lines.filter(l => l).map(l => lpFromLine(l)).filter(lp => lp.type && lp.name && lp.password));
      setMultiKuerzelState("");
    }
    if (toAdd.length > 0){
      addUser(token, toAdd).then(
        returned => setUsers(returned)
      ).catch(error => console.log(error));
      
    }
  }

  const handleSusUpdate = () => {
    let toAdd: User[] = [];
    if(susKuerzelState){
      console.log(susKuerzelState);
      console.log(susPwState);
      console.log(susGruppe);
      toAdd = toAdd.concat([{id: susId, type:"sus", name:susKuerzelState, password: susPwState ? susPwState : makePw(), gruppe: susGruppe}]);
      setSusKuerzelState("");
      setSusGruppe("");
      setSusPwState("");
      setSusId(-1);
    }
    if (susMultiKuerzelState){
      const lines = susMultiKuerzelState.split(/\r?\n/);
      toAdd = toAdd.concat(lines.filter(l => l).map(l => susFromLine(l)).filter(s => s.type && s.name && s.password && s.gruppe));
      setSusMultiKuerzelState("");
    }
    if (toAdd.length > 0){
      addUser(token, toAdd).then(u => setUsers(u)).catch(e => console.log(e));
    }
  }

  const handleLpClick = (lp: User) =>{
    setKuerzelState(lp.name);
    setPwState(lp.password);
    setLpId(lp.id);
    console.log(lps);
  }

  const handleSusClick = (sus: User) =>{
    setSusKuerzelState(sus.name);
    setSusGruppe(sus.gruppe);
    setSusPwState(sus.password);
    setSusId(sus.id);
  }

  const handleLpCancel = () => {
    setKuerzelState("");
    setPwState("");
    setLpId(-1);
    setMultiKuerzelState("");
  }

  const handleSusCancel = () => {
    setSusKuerzelState("");
    setSusGruppe("");
    setSusPwState("");
    setSusId(-1);
    setSusMultiKuerzelState("");
  }

  return(
    <Grid container spacing={3}>
      {/*LP Table*/}
        <Grid md={2} className={classes.theGrid}>
            <Typography variant="h5">Lehrer</Typography>
            <List>
                  {lps.map((u: User) => 
                    <ListItem button onClick={(e) => handleLpClick(u)}>
                      <ListItemText 
                        classes={{primary: classes.userListPrimary, secondary: classes.userListSecondary}} 
                        primaryTypographyProps={{color: "primary", variant:"subtitle2"}}
                        primary={u.name} 
                        secondary={u.password}></ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton onClick={e => {deleteUser(token, [u.id]).then(users => setUsers(users)).catch(e=>console.log(e)); setKuerzelState(""); setPwState(""); setLpId(-1);}}><DeleteIcon/></IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>)}
            </List>
        </Grid>

      {/*LP Input*/}
      <Grid md={2}>
        <TextField label="Kürzel" required value={kuerzelState} onChange={e => setKuerzelState(e.target.value)}></TextField>
        <TextField label="Passwort" value={pwState} onChange={e => setPwState(e.target.value)}></TextField>
        <TextField label="Mehrere Erfassen" multiline rows={5} value={multiKuerzelState} onChange={e => setMultiKuerzelState(e.target.value)}></TextField>
        <Button variant={"contained"} onClick={handleLpUpdate}>Update LP(s)</Button>
        <Button variant={"contained"} onClick={handleLpCancel}>Cancel</Button>
      </Grid>

    {/*SuS Table*/}
    <Grid md={3} className={classes.theGrid}>
            <Typography variant="h5">SuS</Typography>
            <List>
                  {sus.map((u: User) => 
                    <ListItem button onClick={(e) => handleSusClick(u)}>
                      <ListItemText 
                        classes={{primary: classes.userListPrimary, secondary: classes.userListSecondary}} 
                        primaryTypographyProps={{color: "primary", variant:"subtitle2"}}
                        primary={u.name}
                        secondary={u.gruppe + ", " + u.password}
                        />
                      <ListItemSecondaryAction>
                        <IconButton onClick={e => {deleteUser(token, [u.id]).then(users => setUsers(users)).catch(e=>console.log(e));setSusKuerzelState("");setSusGruppe("");setSusPwState(""); setSusId(-1);}}><DeleteIcon/></IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>)}
            </List>
        </Grid>

      {/*SuS Input*/}
      <Grid md={2}>
        <TextField label="Name" required value={susKuerzelState} onChange={e => setSusKuerzelState(e.target.value)}></TextField>
        <div>
        <FormControl className={classes.susInputItem}>
            <InputLabel id="demo-simple-select-label">Gruppe</InputLabel>
            <Select
                value={susGruppe}
                onChange={e => setSusGruppe(e.target.value as string)}
                >
                {allGroups.map(gr => <MenuItem value={gr.name}>{gr.name}</MenuItem>)}
            </Select>
        </FormControl>
        </div>
        <TextField label="Passwort" value={susPwState} onChange={e => setSusPwState(e.target.value)}></TextField>
        <TextField label="Mehrere Erfassen" multiline rows={5} value={susMultiKuerzelState} onChange={e => setSusMultiKuerzelState(e.target.value)}></TextField>
        <Button variant={"contained"} onClick={handleSusUpdate}>Update SuS</Button>
        <Button variant={"contained"} onClick={handleSusCancel}>Cancel</Button>
      </Grid>
    </Grid>
  )
}