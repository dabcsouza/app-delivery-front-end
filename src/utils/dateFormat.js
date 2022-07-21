export default function dateFormat(date) {
  const dateEN = date.split('T')[0];
  const dateEnSplit = dateEN.split('-');
  const year = dateEnSplit[0];
  const month = dateEnSplit[1];
  const day = dateEnSplit[2];
  const dateJoin = [day, month, year].join();
  return dateJoin.replaceAll(',', '/');
}
