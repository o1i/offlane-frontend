export interface Gruppe {name: string, id: number};
export interface Block {weekDay: number, start: string, end: string, gruppe: Gruppe, id: number}
export interface Lernbuero {name: string, lehrer: string, ort: string, soft: number, hard: number, block: Block, block_id: number, id: number};


export interface LbInstance {lb: Lernbuero, status: LbStatus, current: number, start: number, id: number};
type UserType = "sus" | "lp" | "ap"
export interface User {id: number, type: UserType, name: string, password: string, gruppe: string, lp_id?: number, lp?: string};
type LbStatus = "open" | "forced" | "enrolled" |"expired"
export interface SlotRow {block: Block, lbInstances: LbInstance[]};
export interface SusInfo {blocks: Block[], kws: Kw[], lbInstances: LbInstance[]};
export interface Kw {index: number, from: string, to: string};
export interface LpInfo {};
export const dateFormat = new Intl.DateTimeFormat("de-CH", {weekday: "short", day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit"});
export interface LpLbBelegungRow { [index: number]: {lbInstance: LbInstance, sus: User[]}};
export const Wochentage = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]