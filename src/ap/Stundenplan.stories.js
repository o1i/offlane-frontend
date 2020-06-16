import React from "react";

import { Stundenplan } from "./Stundenplan";

export default { title: "Stundenplan"}

export const example = () => <Stundenplan blocks={[
    {weekDay: 1, start: "10:15", end: "11:15", gruppe: {}, id: 1},
    {weekDay: 1, start: "10:20", end: "12:00", gruppe: {}, id: 2},
    {weekDay: 1, start: "12:00", end: "13:00", gruppe: {}, id: 5},
    {weekDay: 3, start: "07:00", end: "13:00", gruppe: {}, id: 3},
    {weekDay: 5, start: "15:15", end: "16:15", gruppe: {}, id: 4},
]}/>