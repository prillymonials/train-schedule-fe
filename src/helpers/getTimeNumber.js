export default function getTimeNumber(strTime) {
  const splitted = strTime.split(':');
  const hourRaw = Number(splitted[0]);
  const hour = (hourRaw === 0) ? 24 : hourRaw;
  return Number(hour) * 60 + Number(splitted[1]);
}
