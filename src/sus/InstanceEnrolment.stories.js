import React from "react";

import { InstanceEnrolment } from "./InstanceEnrolment";

export default { title: "InstanceEnrolment"}

export const open = () => <InstanceEnrolment name="open" lehrer="Lehrername" ort="Ortname" status="open"/>
export const enrolled = () => <InstanceEnrolment name="enrolled" lehrer="Lehrername" ort="Ortname" status="enrolled"/>
export const forced = () => <InstanceEnrolment name="forced" lehrer="Lehrername" ort="Ortname" status="forced"/>
export const expired = () => <InstanceEnrolment name="expired" lehrer="Lehrername" ort="Ortname" status="expired"/>