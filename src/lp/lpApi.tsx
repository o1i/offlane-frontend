import { LbInstance, User } from "../common/objects";
import { UserContext } from "..";
//export interface Lernbuero {name: string, lehrer: string, ort: string, soft: number, hard: number, block: number, id: number};
//export interface Block {weekDay: number, start: string, end: string, gruppe: number, id: number}

//export interface LbInstance {lb: Lernbuero, status: LbStatus, current: number, id: number};
export const getLpLbInfo = (token: string, setLpLbInfo: (lpLbInfo: Array<Array<{lbInstance: LbInstance, sus:Array<User>}>>) => void) => {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "lp/enrolment/"
    fetch(url, {method: "get", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}})
    .then(r => r.ok && r.json())
    .then(t => setLpLbInfo(t))
}

export const enrolSus = (lbId: number, sus_id: number, token: string, setLpLbInfo: (lpLbInfo: Array<Array<{lbInstance: LbInstance, sus:Array<User>}>>) => void) => {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "lp/enrolment/"
    fetch(url, {method: "post", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, body: JSON.stringify({"sus_id": sus_id, "lbi_id": lbId, "action": "enrol"})})
    .then(r => r.ok && r.json())
    .then(t => setLpLbInfo(t))
}

export const unEnrolSus = (lbId: number, sus_id: number, token: string, setLpLbInfo: (lpLbInfo: Array<Array<{lbInstance: LbInstance, sus:Array<User>}>>) => void) => {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "lp/enrolment/"
    fetch(url, {method: "post", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, body: JSON.stringify({"sus_id": sus_id, "lbi_id": lbId, "action": "unenrol"})})
    .then(r => r.ok && r.json())
    .then(t => setLpLbInfo(t))
}

export const getEligibleSus = (lbId: number) => {
    return ([
        {name: "Athena Imperia Arnold", id: 3},
        {name: "Boris Burri", id: 4},
        {name: "Carlos Cutierrez", id: 5},
        {name: "Dieter Deutsch", id: 6},
        {name: "Ekatarina Eregova", id: 7},
        {name: "Franz Freiherr", id: 8},
        {name: "Gustav Ganz", id: 9},
        {name: "Herbert Huber", id: 10},
        {name: "Ingeborg Imstett", id: 11},
        {name: "Julia Jaspers", id: 12},
        {name: "Kurt Kurz", id: 13},
        {name: "Liliane Lieblich", id: 14},
        {name: "Miloslav Müller", id: 15},
        {name: "Narendra Nievergelt", id: 16},
        {name: "Olivia Oderbolz", id: 17},
        {name: "Patrick Probst", id: 18},
        {name: "Roberta Rabatz", id: 19},
        {name: "Salome Sulc", id: 20},
        {name: "Tarjan Thomas", id: 21},
        {name: "Ulrike v. Ulm", id: 22},
        {name: "Viktor Vysted", id: 23},
        {name: "Walter Wunderlich", id: 24},
        {name: "Xaver !Xabu", id: 25},
        {name: "Zoe Zapatero", id: 26},
    ]  as User[])
}