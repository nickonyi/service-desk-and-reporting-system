export const buildDateFilter = ({ days, startDate, endDate }, column = 'created_at') => {
  let clause = '';
  let params = [];

  if (startDate && endDate) {
    clause = `WHERE ${column} >= $1 AND ${column} <= $2`;
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    params = [start, end];
  } else if (days) {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - (days - 1));
    start.setHours(0, 0, 0, 0);
    const end = new Date(today);
    end.setHours(23, 59, 59, 999);
    clause = `WHERE ${column} >= $1 AND ${column} <= $2`;
    params = [start, end];
  }
  return { clause, params };
};
