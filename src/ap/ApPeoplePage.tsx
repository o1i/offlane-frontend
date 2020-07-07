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
import { User } from "../common/objects";
import { getAllLps, getAllSus, addLp, deleteUser } from "./ApApi";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    lpButton: {
    },
    theGrid:  {
      padding: 5,
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
 

export const ApPeoplePage = () => {
  const classes = useStyles();
  const [lps, setLps] = useState<User[]>([]);
  const [kuerzelState, setKuerzelState] = useState("");
  const [pwState, setPwState] = useState("");
  const [multiKuerzelState, setMultiKuerzelState] = useState("");


  const [sus, setSus] = useState<User[]>([]);
  const [susKuerzelState, setSusKuerzelState] = useState("");
  const [susPwState, setSusPwState] = useState("");
  const [susGruppe, setSusGruppe] = useState("");
  const [susMultiKuerzelState, setSusMultiKuerzelState] = useState("");

  useEffect(() => setLps(getAllLps()), [])
  useEffect(() => setSus(getAllSus()), [])

  const handleLpUpdate = () => {
    let toAdd: User[] = [];
    if(kuerzelState){
      toAdd = toAdd.concat([{id: -1, type:"lp", name:kuerzelState, password: pwState ? pwState : makePw(), gruppe: ""}]);
      setKuerzelState("");
      setPwState("");
    }
    if( multiKuerzelState){
      const lines = multiKuerzelState.split(/\r?\n/);
      toAdd = toAdd.concat(lines.filter(l => l).map(l => lpFromLine(l)).filter(lp => lp.type && lp.name && lp.password));
      setMultiKuerzelState("");
    }
    if (toAdd.length > 0){
      addLp(toAdd, lps, setLps);
    }
  }

  const handleSusUpdate = () => {
    let toAdd: User[] = [];
    if(susKuerzelState){
      console.log(susKuerzelState);
      console.log(susPwState);
      console.log(susGruppe);
      toAdd = toAdd.concat([{id: -1, type:"sus", name:susKuerzelState, password: susPwState ? susPwState : makePw(), gruppe: susGruppe}]);
      setSusKuerzelState("");
      setSusGruppe("");
      setSusPwState("");
    }
    if( susMultiKuerzelState){
      const lines = susMultiKuerzelState.split(/\r?\n/);
      toAdd = toAdd.concat(lines.filter(l => l).map(l => susFromLine(l)).filter(s => s.type && s.name && s.password && s.gruppe));
      setSusMultiKuerzelState("");
    }
    if (toAdd.length > 0){
      addLp(toAdd, sus, setSus);
    }
  }

  const handleLpClick = (lp: User) =>{
    setKuerzelState(lp.name);
    setPwState(lp.password);
  }

  const handleSusClick = (sus: User) =>{
    setSusKuerzelState(sus.name);
    setSusGruppe(sus.gruppe);
    setSusPwState(sus.password);
  }

  return(
    <Grid container spacing={3}>
      {/*LP Table*/}
        <Grid md={2} className={classes.theGrid}>
            <Typography variant="h5">Lehrer</Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell> Kürzel</TableCell>
                        <TableCell> Passwort</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {lps.map((u: User) => 
                    <TableRow hover onClick={(e) => handleLpClick(u)}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.password}</TableCell>
                      <IconButton onClick={e => {deleteUser(u, lps, setLps); setKuerzelState(""); setPwState("");}}><DeleteIcon/></IconButton>
                    </TableRow>)}
                </TableBody>
            </Table>
        </Grid>

      {/*LP Input*/}
      <Grid md={2}>
        <TextField label="Kürzel" required value={kuerzelState} onChange={e => setKuerzelState(e.target.value)}></TextField>
        <TextField label="Passwort" value={pwState} onChange={e => setPwState(e.target.value)}></TextField>
        <TextField label="Mehrere Erfassen" multiline rows={5} value={multiKuerzelState} onChange={e => setMultiKuerzelState(e.target.value)}></TextField>
        <Button variant={"contained"} onClick={handleLpUpdate}>Update LP(s)</Button>
      </Grid>

    {/*SuS Table*/}
    <Grid md={3} className={classes.theGrid}>
            <Typography variant="h5">SuS</Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell> Name</TableCell>
                        <TableCell> Passwort</TableCell>
                        <TableCell> Gruppe</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {sus.map((u: User) => 
                    <TableRow hover onClick={(e) => handleSusClick(u)}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.password}</TableCell>
                      <TableCell>{u.gruppe}</TableCell>
                      <IconButton onClick={e => {deleteUser(u, sus, setSus);setSusKuerzelState("");setSusGruppe("");setSusPwState("");}}><DeleteIcon/></IconButton>
                    </TableRow>)}
                </TableBody>
            </Table>
        </Grid>

      {/*SuS Input*/}
      <Grid md={2}>
        <TextField label="Name" required value={susKuerzelState} onChange={e => setSusKuerzelState(e.target.value)}></TextField>
        <TextField label="Gruppe" required value={susGruppe} onChange={e => setSusGruppe(e.target.value)}></TextField>
        <TextField label="Passwort" value={susPwState} onChange={e => setSusPwState(e.target.value)}></TextField>
        <TextField label="Mehrere Erfassen" multiline rows={5} value={susMultiKuerzelState} onChange={e => setSusMultiKuerzelState(e.target.value)}></TextField>
        <Button variant={"contained"} onClick={handleSusUpdate}>Update SuS</Button>
      </Grid>
    </Grid>
  )
}