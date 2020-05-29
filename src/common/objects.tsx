export interface Gruppe {name: string, id: number};
export interface Block {weekday: number, start: string, end: string, gruppe: number, id: number}
export interface Lernbuero {name: string, lehrer: string, ort: string, soft: number, hard: number, block: number, id: number};


export interface Slot {id: number, weekDay: string, time: string};
export interface LbInstance {name: string, lehrer: string, ort: string, status: LbStatus, slot: number, kw: number, id: number, current: number, soft: number, hard: number, start: number};
type UserType = "sus" | "lp" | "ap"
export interface User {id: number, type: UserType, name: string};
type LbStatus = "open" | "forced" | "enrolled" |"expired"
export interface SlotRow {slot: Slot, lbInstances: LbInstance[]};
export interface SusInfo {slots: Slot[], kws: Kw[], lbInstances: LbInstance[]};
export interface Kw {index: number, from: string, to: string};
export interface LpInfo {};
export const dateFormat = new Intl.DateTimeFormat("de-CH", {weekday: "short", day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit"});
export interface LpLbBelegungRow { [index: number]: {lbInstance: LbInstance, sus: User[]}};
