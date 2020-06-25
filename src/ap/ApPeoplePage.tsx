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
import { getAllLps, addLp } from "./ApApi";
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
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
 

export const ApPeoplePage = () => {
  const classes = useStyles();
  const [lps, setLps] = useState<User[]>([]);
  const [kuerzelState, setKuerzelState] = useState("");
  const [pwState, setPwState] = useState("");
  const [multiKuerzelState, setMultiKuerzelState] = useState("");

  useEffect(() => setLps(getAllLps()), [])

  const handleLpUpdate = () => {
    if(kuerzelState){
      addLp([{id: -1, type:"lp", name:kuerzelState, password: pwState ? pwState : makePw()}], lps, setLps)
    }
    if( multiKuerzelState){
      const lines = multiKuerzelState.split(/\r?\n/);
      addLp(lines.filter(l => l).map(l => lpFromLine(l)).filter(lp => lp.type && lp.name && lp.password), lps, setLps);
    }
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
                    <TableRow hover>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.password}</TableCell>
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
    </Grid>
  )
}