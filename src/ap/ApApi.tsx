import { Gruppe, Block, Lernbuero, User } from "../common/objects";

// Gruppen
export const getGruppen = () => {
    return([]);
}

export const addGruppe = (gruppen: Gruppe[], neu: string) => {
    const prevMax = gruppen.length > 1 ? Math.max(...gruppen.map(g => g.id)) : 0;
    gruppen.push({id: prevMax + 1, name: neu} as Gruppe)
    return(gruppen)
}

//Blocks
export const getBlocks = () => {
    return([]);
}

export const addBlock = (start: string, end: string, weekDay: number, blocks: Block[], gruppe: Gruppe) => {
    const oldMax = blocks.length > 0 ? Math.max(...blocks.map(b => b.id)): 0;
    const newBlock = {weekDay: weekDay, start: start, end:end, gruppe: gruppe, id: oldMax + 1};
    blocks.push(newBlock);
    return(blocks);
}

export const changeBlock = (start: string, end: string, weekDay: number, id: number, blocks: Block[]) => {
    const theIndex = blocks.findIndex(b => b.id === id)
    blocks[theIndex]["start"] = start;
    blocks[theIndex]["end"] = end;
    blocks[theIndex]["weekDay"] = weekDay;
    return blocks;
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