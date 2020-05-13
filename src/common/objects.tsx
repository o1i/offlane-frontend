type LbStatus = "open" | "forced" | "enrolled" |"expired"
export interface LbInstance {name: string, lehrer: string, ort: string, status: LbStatus};
export interface Slot {weekDay: string, time: string};
export interface SlotRow {slot: Slot, lbInstances: LbInstance[]};
export interface Kw {index: number, from: string, to: string};