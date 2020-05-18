type UserType = "sus" | "lp" | "ap"
export interface User {id: number, type: UserType};
type LbStatus = "open" | "forced" | "enrolled" |"expired"
export interface LbInstance {name: string, lehrer: string, ort: string, status: LbStatus, slot: number, kw: number, id: number, current: number, soft: number, hard: number};
export interface Slot {id: number, weekDay: string, time: string};
export interface SlotRow {slot: Slot, lbInstances: LbInstance[]};
export interface SusInfo {slots: Slot[], kws: Kw[], lbInstances: LbInstance[]};
export interface Kw {index: number, from: string, to: string};
