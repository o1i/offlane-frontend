import React from "react";
import Grid from '@material-ui/core/Grid';
import { OneSlot } from "./OneSlot";

export default { title: "OneSlot"}

export const theOneSlot = () => (
    <Grid container spacing={1}>
        <OneSlot slotRow={{slot:{weekDay:"Mo", time:"10:15-\n11:00"}, lbInstances:[
            {name: "Math", lehrer: "Böni", ort: "Dungeon", status: "expired"}, 
            {name: "Geo", lehrer: "Böni", ort: "Dungeon", status: "forced"}, 
            {name: "Unbelegt", lehrer: "", ort: "", status: "open"}]}} optionSetter={(some) => {}}/>
    </Grid>
    )