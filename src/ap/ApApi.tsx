import { Gruppe, Block, Lernbuero, User } from "../common/objects";

// Gruppen
export const getGruppen = (token: string, setter: (gruppen: Gruppe[]) => void) => {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/gruppe/"
    fetch(url, {method: "get", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}})
    .then(r => r.ok && r.json())
    .then(t => setter(t))
}

export const addGruppe = (token: string, setter: (gruppen: Gruppe[]) => void, neu: Array<Gruppe>) => {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/gruppe/"
    fetch(url, {method: "post", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, body: JSON.stringify(neu)})
    .then(r => r.ok && r.json())
    .then(t => setter(t))
}

export const deleteGruppe = (token: string, setter: (gruppen: Gruppe[]) => void, to_delete: Array<number>) => {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/gruppe/"
    fetch(url, {method: "delete", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, body: JSON.stringify(to_delete)})
    .then(r => r.ok && r.json())
    .then(t => setter(t))
}

//Blocks
export const getBlocks = (token: string, setter: (blocks: Block[]) => void, gruppe: number) => {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/block/"
    fetch(url, {method: "post", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, 
    body: JSON.stringify([{"gruppe_get": gruppe}])})
    .then(r => r.ok && r.json())
    .then(t => setter(t))
}

export const addBlock = (token: string, start: string, end: string, weekDay: number, gruppe: Gruppe) => {
    // returns promise (todo: do for all the other calls)
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/block/"
    return (fetch(url, {method: "post", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, 
    body: JSON.stringify([{"start": start, "end": end, "weekday": weekDay, "gruppe": gruppe}])})
    .then(r => r.ok && r.json()))
}

export const changeBlock = (token: string, setter: (blocks: Block[]) => void, start: string, end: string, weekDay: number, id: number) => {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/block/"
    fetch(url, {method: "post", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, 
    body: JSON.stringify([{"id": id, "start": start, "end": end, "weekDay": weekDay}])})
    .then(r => r.ok && r.json())
    .then(t => setter(t))
}

export const deleteBlock = (token: string, setter: (blocks: Block[]) => void, id: number) => {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/block/"
    fetch(url, {method: "delete", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, 
    body: JSON.stringify([id])})
    .then(r => r.ok && r.json())
    .then(t => setter(t))
}

//Lbs
export const getLbs = (token: string, block_id: number) => {
     // returns promise
     console.log("getLbs");
     console.log(block_id);
     const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/lernbuero/"
     return (fetch(url, {method: "post", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, 
     body: JSON.stringify({"block_id": block_id})})
     .then(r => (r.ok && r.json())))
}

export const addLb = (token: string, newLb: Lernbuero) => {
     // returns promise
     const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/lernbuero/"
     return fetch(url, {method: "post", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, 
            body: JSON.stringify({
         "id": newLb.id,
         "name": newLb.name, 
         "capacity": newLb.soft,
         "lp_name": newLb.lehrer, 
         "block": newLb.block,
         "ort": newLb.ort})})
         .then(r => r.ok ? r.json() as Promise<Lernbuero[]> : [] as Lernbuero[])
}

export const deleteLb = (token: string, id: number) => {
    // returns promise
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/lernbuero/"
    return (fetch(url, {method: "delete", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, 
    body: JSON.stringify({"id": id})})
    .then(r => r.ok && r.json()))
}

//Lps
export const getAllUsers = (token: string) => {
     // returns promise
     const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/user/"
     return (fetch(url, {method: "get", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}})
     .then(r => r.ok && r.json()))
}

export const addUser = (token: string, users: User[]) =>{
    // returns promise
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/user/"
    return (fetch(url, {method: "post", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, 
    body: JSON.stringify(users)})
    .then(r => r.ok && r.json()))
}

export const deleteUser = (token: string, ids:number[]) => {
      // returns promise
      const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/lernbuero/"
      return (fetch(url, {method: "delete", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, 
      body: JSON.stringify(ids)})
      .then(r => r.ok && r.json()))
}