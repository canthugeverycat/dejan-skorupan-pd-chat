/**
 * Transform datestring to a human readable time
 * @param   {string}  date  Date string
 * @return  {string} (ex. '12:42')
 */
export const getHumanReadableTime = (date: string): string => {
  const d = new Date(date);

  const hour = d.getHours();
  const minute = d.getMinutes();

  return `${hour}:${minute < 10 ? '0' + minute : minute}`;
};
