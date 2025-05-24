// Formats a Date object as 'YYYY-MM-DD'
export function getFormattedDate(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error('Invalid date provided to getFormattedDate');
  }
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

// Returns a new Date object minus the specified number of days
export function getDateMinusDays(date, days) {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error('Invalid date provided to getDateMinusDays');
  }
  if (typeof days !== 'number' || isNaN(days)) {
    throw new Error('Invalid number of days provided to getDateMinusDays');
  }
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}
