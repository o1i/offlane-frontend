import React from "react";

import { LbBelegungRow } from "./LbBelegungRow";

export default { title: "LbBelegungRow"}

export const example = () => <LbBelegungRow lbBelegung={[
    {lbInstance: {name: "Math", ort: "Spielwiese", kw: 1, id:1, current: 5, soft: 20, hard: 25, start: 1590311476000}, sus:[]},
    {lbInstance: {name: "Geo", ort: "Tempel", kw: 1, id:2, current: 15, soft: 20, hard: 25, start: 1590311476001}, sus:[]},
    {lbInstance: {name: "RZG", ort: "Atrium", kw: 1, id:3, current: 25, soft: 20, hard: 25, start: 1590311476002}, sus:[]}
]}/>