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
    .then(t => {console.log("blocks");console.log(t); setter(t);})
}

export const addBlock = (token: string, setter: (blocks: Block[]) => void, start: string, end: string, weekDay: number, gruppe: Gruppe) => {
    const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "ap/block/"
    fetch(url, {method: "post", headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + token}, 
    body: JSON.stringify([{"start": start, "end": end, "weekDay": weekDay, "gruppe": gruppe}])})
    .then(r => r.ok && r.json())
    .then(t => setter(t))
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
export const getLbs = () => {
    return([]);
}

export const addLb = (newLb: Lernbuero, lbs: Lernbuero[]) => {
    const oldMax = lbs.length > 0 ? Math.max(...lbs.map(lb => lb.id)) : 0;
    newLb.id = oldMax + 1;
    lbs.push(newLb);
    return(lbs);
}

//Lps
export const getAllLps = () => {
    return([
        {name: "Böni", id:1, password:"foo", type: "lp"} as User,
        {name: "Böni2", id:5, password:"foo2", type: "lp"} as User,
        {name: "Böni3", id:21, password:"foo3", type: "lp"} as User,
        {name: "Böni4", id:4, password:"foo4", type: "lp"} as User,
        {name: "Böni5", id:2, password:"foo5", type: "lp"} as User,
    ])
}

export const addUser = (users: User[], oldUsers: User[], setUsers: (users: User[]) => void) =>{
    const untouchedOld = oldUsers.filter(lp_old => users.map(lp_new=>lp_new.id).indexOf(lp_old.id) < 0);
    let oldIdMax = Math.max(...oldUsers.map(lp => lp.id));
    const usersWithId = users.map(u => {
        if (u.id < 0){
            oldIdMax += 1;
            u.id = oldIdMax;
            return(u);
        }else{
            return(u);
        }
    })
    setUsers(untouchedOld.concat(usersWithId).sort(
        (u, v) => {if (u.name.toLowerCase() > v.name.toLowerCase()){
            return 1;
        }else{
            return -1;
        }}));
}

//Sus
export const getAllSus = () => {
    return([
        {name: "MiniBöni", id:1, password:"foo", type: "sus", gruppe:"2. Stufe"} as User,
        {name: "MiniBöni2", id:5, password:"foo2", type: "sus", gruppe:"2. Stufe"} as User,
        {name: "MiniBöni3", id:21, password:"foo3", type: "sus", gruppe:"2. Stufe"} as User,
        {name: "MiniBöni4", id:4, password:"foo4", type: "sus", gruppe:"2. Stufe"} as User,
        {name: "MiniBöni5", id:2, password:"foo5", type: "sus", gruppe:"2. Stufe"} as User,
    ])
}

//user
export const deleteUser = (user: User, old: User[], setter: (users: User[]) => void) => {
    setter(old.filter(u => u.id != user.id));
}