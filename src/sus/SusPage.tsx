import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { KwItem } from  './KwItem';
import { SusInfo, Slot, Kw, LbInstance } from "../common/objects";
import Grid from '@material-ui/core/Grid';
import { OneSlot } from "./OneSlot";

const useStyles = makeStyles({
  slot: {
    fontSize: 11,

  },
  row: {
    minWidth: 500,
  },
  header: {
    height: 50,
  }
});

export const SusPage = ({slots, kws, lbInstances}: SusInfo) => {
  const classes = useStyles();

  const slotRows = slots.map((slot: Slot) => (
    {
      slot: slot,
      lbInstances: kws.map((kw) => (
        lbInstances.find((lbInstance) => (lbInstance.kw === kw.index) && (lbInstance.slot === slot.id)) ?? {name: "Unbelegt", lehrer: "", ort: "", status: "open", slot: slot.id, kw: kw.index, id: -1} as LbInstance
      ))
    }
  ))

  return (
    <>
      <Grid container direction="row" justify="flex-start" spacing={1} wrap="nowrap" className={classes.row}>
          <Grid item xs={1}></Grid>
          {kws.map((oneInstance, key) => 
          <Grid item key={key} xs={4}>
              <KwItem kw={oneInstance}/>
          </Grid>
          )}
      </Grid>
      {slotRows.map((oneInstance, key) => 
      <OneSlot {...oneInstance}/>)}
    </>
  );
}

/* 
type LbStatus = "open" | "forced" | "enrolled" |"expired"
export interface LbInstance {name: string, lehrer: string, ort: string, status: LbStatus, slot: number, kw: number, id: number};
export interface Slot {id: number, weekDay: string, time: string};
export interface SlotRow {slot: Slot, lbInstances: LbInstance[]};
export interface SusInfo {slots: Slot[], kws: Kw[], lbInstances: LbInstance[]};
export interface Kw {index: number, from: string, to: string}; 
*/