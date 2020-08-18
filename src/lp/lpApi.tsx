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

export const getEligibleSus = (lbId: number, token: string, setState: (users: User[]) => void) => {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "lp/list_sus/"
    fetch(url, {method: "post", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, body: JSON.stringify({"lbinstance_id": lbId})})
    .then(r => r.ok && r.json())
    .then(t => setState(t))
}