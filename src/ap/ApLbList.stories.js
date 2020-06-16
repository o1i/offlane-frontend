import React from "react";
import List from '@material-ui/core/List';

import { ApLbList } from "./ApLbList";

export default { title: "LbList"}

//export interface Lernbuero {name: string, lehrer: string, ort: string, soft: number, hard: number, block: Block, id: number};

export const example = () => 
    <List>
        <ApLbList lbs={[
            {name: "Name 1", lehrer: "Böni", ort: "Spielplatz", soft: 15, hard: 20, block: {}, id: 1},
            {name: "Name 2", lehrer: "Böni 2", ort: "Wiese", soft: 15, hard: 20, block: {}, id: 2},
            {name: "Name 3", lehrer: "Böni 3", ort: "Küche", soft: 15, hard: 20, block: {}, id: 3},
            {name: "Name 4", lehrer: "Böni 4", ort: "Pausenhof", soft: 15, hard: 20, block: {}, id: 4},
            {name: "Name 5", lehrer: "Böni 5", ort: "Schulzimmer", soft: 15, hard: 20, block: {}, id: 5},
        ]}/>
    </List>
