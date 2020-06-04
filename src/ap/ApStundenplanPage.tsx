import React, {useState} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper:{
            padding: theme.spacing(1),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        },
        main:{
            "background-color": "#f9f9f9"
        },
}));

export const ApStundenplanPage = () => {
    const classes = useStyles();

    const [gruppen, setGruppen] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [lbs, setLbs] = useState([]);


    
    return (
        <Grid container spacing={2} direction="row" justify="flex-start" align-items="stretch" wrap="nowrap" className={classes.main}>

            <Grid item container spacing={0} direction="column" md={3}>
                <Grid item md={12}>
                    <Typography>
                        <Box>
                            Lernbüro-Gruppen
                        </Box>
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <Paper className={classes.paper}>item with siginuiet ndiaten idane ditan editane dtiaun edain edinaudeneeeeeee eeeeeeeeeeeeee eeeeeeeeeeeeee eeeeeeeeeeee</Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
            </Grid>

            <Grid item md={6}>
                    <Typography>
                        <Box>
                            Stundenplan
                        </Box>
                    </Typography>
            </Grid>

            <Grid item container spacing={0} direction="column" md={3}>
                <Grid item md={12}>
                    <Typography>
                        <Box>
                            Lernbüros
                        </Box>
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <Paper className={classes.paper}>item with siginuiet ndiaten idane ditan editane dtiaun edain edinaudeni adten,.fegn.,en fjpnbrn.,be sn,j.fsne ,.fs.,n </Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}
