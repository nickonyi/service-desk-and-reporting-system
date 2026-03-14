export const buildDateFilter = ({ days, startDate, endDate }, column = 'created_at') => {
  let clause = '';
  let params = [];

  if (startDate && endDate) {
    clause = `WHERE ${column} >= $1 AND ${column} < $2::date + INTERVAL '1 day'`;
    params = [startDate, endDate];
  } else if (days) {
    clause = `WHERE ${column} >= NOW() - ($1 || ' days')::interval`;
    params = [days];
  }
  return { clause, params };
};
