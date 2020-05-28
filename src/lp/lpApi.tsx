import { LbInstance, User } from "../common/objects";

export const getLpLbInfo = (lp: number) => {
    return (
        [[
            {lbInstance:  {name: "Math", ort: "Spielwiese", kw: 1, id:1, current: 24, soft: 20, hard: 25, start: 1590311476} as LbInstance, 
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
            {lbInstance:  {name: "Math", ort: "Spielwiese", kw: 1, id:2, current: 22, soft: 20, hard: 25, start: 1590311477} as LbInstance, 
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
            {lbInstance:  {name: "Math", ort: "Spielwiese", kw: 1, id:3, current: 17, soft: 20, hard: 25, start: 1590311478} as LbInstance, 
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
            {lbInstance:  {name: "Math", ort: "Spielwiese", kw: 2, id:5, current: 24, soft: 20, hard: 25, start: 1590311479} as LbInstance, 
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
            {lbInstance:  {name: "Math", ort: "Spielwiese", kw: 2, id:4, current: 0, soft: 20, hard: 25, start: 1590311480} as LbInstance, 
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
                console.log("Adding sus " + theSus);
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
    console.log("attempt to unenrol sus " + susId + "from lb " + lbId);
    const currentState = getState.map(a=>a);
    currentState.forEach(rowArray => rowArray.forEach(({lbInstance, sus}) => {
        if(lbInstance.id===lbId){
            console.log("filtering. length before: " + sus.length);
            const toRemove = sus.findIndex(aSus => aSus.id === susId);
            sus.splice(toRemove, 1);
            console.log("filtering. length after: " + sus.length);
            lbInstance.current = sus.length;
        }
    }))
    console.log(currentState);
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