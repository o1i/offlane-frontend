import { LbInstance, SusInfo, Kw, Block } from "../common/objects";
import { getWeek } from "../common/functions";

export const getEnrolments = (sus: number) => {
    return ({
        blocks: [
            {id: 1, weekDay: 1, start: "10:15", end: "11:00", gruppe: {}} as Block, 
            {id: 3, weekDay: 5, start: "10:15", end: "11:00", gruppe: {}} as Block, 
            {id: 2, weekDay: 3, start: "14:15", end: "15:00", gruppe: {}} as Block],
        kws: [
            {index: 25, from: "15.06.", to: "19.06."} as Kw, 
            {index: 26, from: "22.06.", to: "26.06."} as Kw, 
            {index: 27, from: "29.06.", to: "03.07."} as Kw],
        lbInstances: []
    });
}

export const enrol = (lbInstance: LbInstance, susInfo: SusInfo, setter: (lbInstance: SusInfo)=>(void)) =>  {
    const ind = susInfo.lbInstances.findIndex((lb)=>(getWeek(new Date(lb.start*1000)) === getWeek(new Date(lbInstance.start*1000)))&&(lb.lb.block.id === lbInstance.lb.block.id))
    if(ind>=0){
        susInfo.lbInstances.splice(ind, 1, lbInstance);
    }else{
        susInfo.lbInstances.push(lbInstance);
    }
    setter(susInfo);
}

export const getEnrolmentOptions = (kw_index: number, slot_id: number, sus: number) => {
    return([
        {lb:{name: "Math", lehrer: "Böni", ort: "Spielwiese", soft: 20, hard: 25, block: {}, id: 1}, status: "enrolled", current: 5, id:1} as LbInstance,
        {lb:{name: "RZG", lehrer: "Böni", ort: "Spielwiese", soft: 20, hard: 25, block: {}, id: 1}, status: "enrolled", current: 5, id:1} as LbInstance,
        {lb:{name: "Gezwungen", lehrer: "Böni", ort: "Spielwiese", soft: 0, hard: 25, block: {}, id: 1}, status: "forced", current: 5, id:1} as LbInstance,
        {lb:{name: "Vergangen", lehrer: "Böni", ort: "Spielwiese", soft: 22, hard: 25, block: {}, id: 1}, status: "expired", current: 5, id:1} as LbInstance,
        {lb:{name: "Unbelegt", lehrer: "Böni", ort: "Spielwiese", soft: 20, hard: 25, block: {}, id: 1}, status: "open", current: 5, id:1} as LbInstance,
    ]);
}
