import React from "react";
import { SusPage } from "./SusPage";

export default { title: "SusPage"}

export const theSusPage = () => {

    const slots = [
        {weekDay:"Mo", time:"10:15-\n11:00", id:1}, 
        {weekDay:"Mo", time:"10:15-\n11:00", id:2}, 
        {weekDay:"Mo", time:"10:15-\n11:00", id:3}];
    const kws = [
        {index: 19, from:"04.05.", to:"08.05."},
        {index: 20, from:"11.05.", to:"15.05."},
        {index: 21, from:"18.05.", to:"22.05."},
    ];
    const lbInstances = [
        [
            {name: "Math", lehrer: "Böni", ort: "Dungeon", status: "enrolled", slot:1, kw:19}, 
            {name: "Geo", lehrer: "Böni", ort: "Dungeon", status: "forced", slot:1, kw:20}, 
            {name: "Unbelegt", lehrer: "", ort: "", status: "open", slot:1, kw:21},
            {name: "Math", lehrer: "Böni", ort: "Dungeon", status: "enrolled", slot:2, kw:19}, 
            {name: "Geo", lehrer: "Böni", ort: "Dungeon", status: "expired", slot:2, kw:20}, 
            {name: "Förderdeutsch", lehrer: "", ort: "", status: "forced", slot:2, kw:21},
            {name: "Unbelegt", lehrer: "", ort: "", status: "open", slot:3, kw:19}, 
            {name: "Geo", lehrer: "Böni", ort: "Dungeon", status: "forced", slot:3, kw:20}, 
            {name: "Dota", lehrer: "", ort: "", status: "enrolled", slot:3, kw:21},
        ]
    ];
    
    return (
    <SusPage
        slots={slots}
        kws={kws}
        lbInstances={lbInstances}
        susInfoState={(some) => {}}
        />
    )}