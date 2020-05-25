import React from "react";

import { InstanceEnrolment } from "./InstanceEnrolment";

export default { title: "InstanceEnrolment"}

export const open = () => <InstanceEnrolment lbInstance={{name: "open", lehrer:"Lehrername", ort:"Ortname", status: "open"}} optionSetter={(some) => {}}/>
export const enrolled = () => <InstanceEnrolment lbInstance={{name:"enrolled", lehrer:"Lehrername", ort:"Ortname", status:"enrolled"}} optionSetter={(some) => {}}/>
export const forced = () => <InstanceEnrolment lbInstance={{name:"forced", lehrer:"Lehrername", ort:"Ortname", status:"forced"}} optionSetter={(some) => {}}/>
export const expired = () => <InstanceEnrolment lbInstance={{name:"expired", lehrer:"Lehrername", ort:"Ortname", status:"expired"}} optionSetter={(some) => {}}/>