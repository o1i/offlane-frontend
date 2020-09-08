import { LbInstance, SusInfo, Kw, Block } from "../common/objects";
import { getWeek } from "../common/functions";

export const getEnrolments = (token: string, setSusInfo: (susInfo: SusInfo) => void) => {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "sus/enrolment/"
    fetch(url, {method: "get", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}})
    .then(r => r.ok && r.json())
    .then(t => setSusInfo(t))
}

export const enrol = (lbInstance: LbInstance, token: string, setSusInfo: (susInfo: SusInfo)=>(void)) =>  {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "sus/enrolment/"
    fetch(url, {method: "post", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, body: JSON.stringify({"id": lbInstance.id})})
    .then(r => r.ok && r.json())
    .then(t => setSusInfo(t))
}

export const unEnrol = (lbInstance_id: number, token: string) =>  {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "sus/enrolment/"
    return fetch(url, {method: "delete", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, body: JSON.stringify({"lbi_id": lbInstance_id})})
    .then(r => {
        if(!r.ok){
            throw new Error(r.statusText)
        }
        return r.json() as Promise<SusInfo>;}) 
}

export const getEnrolmentOptions = (token: string, setDialogueOptions: (lbInstances: LbInstance[]) => void, kw_index: number, block_id: number) => {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "sus/enrolment_options/"
    fetch(url, {method: "post", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, body: JSON.stringify({"block_id": block_id, "kw_index": kw_index})})
    .then(r => r.ok && r.json())
    .then(t => setDialogueOptions(t))
}
