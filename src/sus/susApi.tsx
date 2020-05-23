import { LbInstance, SusInfo, Kw, Slot } from "../common/objects";

export const getEnrolments = (sus: number) => {
    return ({
        slots: [{id: 1, weekDay: "Mo", time: "10:15-\n11:00"} as Slot, {id: 3, weekDay: "Fr", time: "10:15-\n11:00"} as Slot, {id: 2, weekDay: "Mi", time: "14:15-\n15:00"} as Slot],
        kws: [{index: 25, from: "15.06.", to: "19.06."} as Kw, {index: 26, from: "22.06.", to: "26.06."} as Kw, {index: 27, from: "29.06.", to: "03.07."} as Kw],
        lbInstances: []
    });
}

export const enrol = (lbInstance: LbInstance, susInfo: SusInfo, setter: (lbInstance: SusInfo)=>(void)) =>  {
    const ind = susInfo.lbInstances.findIndex((lb)=>(lb.kw === lbInstance.kw)&&(lb.slot === lbInstance.slot))
    if(ind>=0){
        susInfo.lbInstances.splice(ind, 1, lbInstance);
    }else{
        susInfo.lbInstances.push(lbInstance);
    }
    setter(susInfo);
    console.log(susInfo);
}

export const getEnrolmentOptions = (kw_index: number, slot_id: number, sus: number) => {
    return([
        {name: "Math", lehrer: "Böni", ort: "Spielwiese", status: "enrolled", slot: slot_id, kw: kw_index, id:1, current: 5, soft: 20, hard: 25} as LbInstance,
        {name: "RZG", lehrer: "Böni", ort: "Museum", status: "enrolled", slot: slot_id, kw: kw_index, id:1, current: 5, soft: 20, hard: 25} as LbInstance,
        {name: "FD", lehrer: "Böni", ort: "Ruine", status: "forced", slot: slot_id, kw: kw_index, id:1, current: 5, soft: 20, hard: 25} as LbInstance,
        {name: "Vergangen", lehrer: "Böni", ort: "Traumwelt", status: "expired", slot: slot_id, kw: kw_index, id:1, current: 5, soft: 20, hard: 25} as LbInstance,
        {name: "Unbelegt", lehrer: "", ort: "", status: "open", slot: slot_id, kw: kw_index, id:1, current: 5, soft: 20, hard: 25} as LbInstance,
    ]);
}