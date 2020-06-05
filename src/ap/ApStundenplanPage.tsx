import React, {useState} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
            width: "100%"
        },
}));

export const ApStundenplanPage = () => {
    const classes = useStyles();

    const [gruppen, setGruppen] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [lbs, setLbs] = useState([]);


    
    return (
        <Grid container spacing={2} direction="row" justify="flex-start" align-items="flex-start" wrap="nowrap" className={classes.main}>

            <Grid item container spacing={0} direction="column" md={3}>
                <Grid item >
                    <Typography>
                        <Box className={classes.spaltenTitel}>
                            Lernbüro-Gruppen
                        </Box>
                    </Typography>
                </Grid>
                <Grid item >
                    <Paper className={classes.paper}>item with siginuiet ndiaten idane ditan editane dtiaun edain edinaudeni adten,.fegn.,en fjpnbrn.,be sn,j.fsne ,.fs.,n </Paper>
                </Grid>
                <Grid item >
                    <Paper className={classes.paper}>item with siginuiet ndiaten idane ditan editane dtiaun edain edinaudeni adten,.fegn.,en fjpnbrn.,be sn,j.fsne ,.fs.,n </Paper>
                </Grid>
                <Grid item >
                    <Paper className={classes.paper}>item with siginuiet ndiaten idane ditan editane dtiaun edain edinaudeni adten,.fegn.,en fjpnbrn.,be sn,j.fsne ,.fs.,n </Paper>
                </Grid>
                <Grid item>
                    <TextField required id="groupName" label="LB-Gruppenname" defaultValue="Stufe X" className={classes.form}/>
                </Grid>
            </Grid>

            <Grid item md={6}>
                    <Typography>
                        <Box className={classes.spaltenTitel}>
                            Stundenplan
                        </Box>
                    </Typography>
            </Grid>

            <Grid item container spacing={0} direction="column" justify="flex-start" md={3} align-items="stretch">
                <Grid item>
                    <Typography>
                        <Box className={classes.spaltenTitel}>
                            Lernbüros
                        </Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>item with siginuiet ndiaten idane ditan editane dtiaun edain edinaudeni adten,.fegn.,en fjpnbrn.,be sn,j.fsne ,.fs.,n </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}
