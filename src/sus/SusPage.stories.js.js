import React from "react";
import { SusPage } from "./SusPage";

export default { title: "SusPage"}

export const theSusPage = () => {
    
    const slotA = {
        slot:{weekDay:"Mo", time:"10:15-\n11:00"},
        lbInstances:[
            {name: "Math", lehrer: "Böni", ort: "Dungeon", status: "enrolled"}, 
            {name: "Geo", lehrer: "Böni", ort: "Dungeon", status: "forced"}, 
            {name: "Unbelegt", lehrer: "", ort: "", status: "open"}]
    }; 
                   

    const slotB = {
        slot:{weekDay:"Mo", time:"10:15-\n11:00"},
        lbInstances:[
            {name: "Math", lehrer: "Böni", ort: "Dungeon", status: "enrolled"}, 
            {name: "Geo", lehrer: "Böni", ort: "Dungeon", status: "expired"}, 
            {name: "Förderdeutsch", lehrer: "", ort: "", status: "forced"}]
    }; 

    
    const slotC = {
        slot:{weekDay:"Mo", time:"10:15-\n11:00"},
        lbInstances:[
            {name: "Unbelegt", lehrer: "", ort: "", status: "open"}, 
            {name: "Geo", lehrer: "Böni", ort: "Dungeon", status: "forced"}, 
            {name: "Dota", lehrer: "", ort: "", status: "enrolled"}]
    }; 
    
    
    return (
    <SusPage
        slotRows={[slotA, slotB, slotC]}
        kws={
            [
                {index: 19, from:"04.05.", to:"08.05."},
                {index: 20, from:"11.05.", to:"15.05."},
                {index: 21, from:"18.05.", to:"22.05."},
            ]
        }/>
    )}