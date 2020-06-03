import { LbInstance, User } from "../common/objects";
//export interface Lernbuero {name: string, lehrer: string, ort: string, soft: number, hard: number, block: number, id: number};
//export interface Block {weekDay: number, start: string, end: string, gruppe: number, id: number}

//export interface LbInstance {lb: Lernbuero, status: LbStatus, current: number, id: number};
export const getLpLbInfo = (lp: number) => {
    return (
        [[
            {lbInstance:  {lb: {name: "Math", ort: "Spielwiese", soft: 20, hard: 25, block: {weekDay: 1, start: "10:15", end: "11:00"}, id: 1}, current: 24, start: 1590311476, id:1} as LbInstance, 
            sus: [
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
            ]  as User[]},
            {lbInstance:  {lb: {name: "Math", ort: "Spielwiese", soft: 20, hard: 25, block: {weekDay: 3, start: "10:15", end: "11:00"}, id: 2}, current: 22, start: 1590311477, id:2} as LbInstance, 
            sus: [
                {name: "Athena Imperia Arnold", id: 3},
                {name: "Boris Burri", id: 4},
                {name: "Carlos Cutierrez", id: 5},
                {name: "Dieter Deutsch", id: 6},
                {name: "Ekatarina Eregova", id: 7},
                {name: "Franz Freiherr", id: 8},
                {name: "Gustav Ganz", id: 9},
                {name: "Herbert Huber", id: 10},
                {name: "Ingeborg Imstett", id: 11},
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
            ]  as User[]},
            {lbInstance:  {lb: {name: "Math", ort: "Spielwiese", soft: 20, hard: 25, block: {weekDay: 5, start: "10:15", end: "11:00"}, id: 3}, current: 17, start: 1590311478, id:3} as LbInstance, 
            sus: [
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
                {name: "Zoe Zapatero", id: 26},
            ]  as User[]}],[
            {lbInstance:  {lb: {name: "Math", ort: "Spielwiese", soft: 20, hard: 25, block: {weekDay: 1, start: "10:15", end: "11:00"}, id: 1}, current: 17, start: 1590311479, id:5} as LbInstance, 
            sus: [
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
            ]  as User[]},
            {lbInstance:  {lb: {name: "Math", ort: "Spielwiese", soft: 20, hard: 25, block: {weekDay: 3, start: "10:15", end: "11:00"}, id: 2}, current: 0, start: 1590311480, id:7} as LbInstance, 
            sus: [
            ]}],
        ]
    );
}

export const enrolSus = (lbId: number, theSus: User, getState: {lbInstance: LbInstance, sus: User[]}[][], setState: (enrolState: {lbInstance: LbInstance, sus: User[]}[][]) => void) => {
    const currentState = getState.map(a=>a);
    let add = false;
    currentState.forEach(rowArray => rowArray.forEach(({lbInstance, sus}) => {
        if(lbInstance.id===lbId){
            if(!sus.some(user=>user.id === theSus.id)){
                sus.push(theSus);
                sus.sort((sus1, sus2) => sus1.name < sus2.name ? -1 : 1);
                add = true;
                lbInstance.current = sus.length;
            }
        }
    }))
    if(add){setState(currentState)};
}


export const unEnrolSus = (susId: number, lbId: number, getState: {lbInstance: LbInstance, sus: User[]}[][], setState: (enrolState: {lbInstance: LbInstance, sus: User[]}[][]) => void) => {
    const currentState = getState.map(a=>a);
    currentState.forEach(rowArray => rowArray.forEach(({lbInstance, sus}) => {
        if(lbInstance.id===lbId){
            const toRemove = sus.findIndex(aSus => aSus.id === susId);
            sus.splice(toRemove, 1);
            lbInstance.current = sus.length;
        }
    }))
    setState(currentState);
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