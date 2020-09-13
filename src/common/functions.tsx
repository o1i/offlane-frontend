export const getWeek = (date: Date) => {
  let d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  let dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1)/7);
}

export const getStart = (weekDay: number, start: string, kw: number) => {
  console.log("getstart");
  console.log(weekDay);
  console.log(start);
  console.log(kw);
  const today = new Date();
  const year = today.getFullYear() - (today.getMonth() < 3 && kw > 26 ? 1 : 0);
  const startDate = new Date(year, 0, (kw - 1) * 7, parseInt(start.substring(0, 2)), parseInt(start.substring(3)));
  return (Math.floor(startDate.getTime() / 1000));
}