import { buildDateFilter } from '../utils/dateFilter.js';
import * as db from './pool.js';
import bycrpt from 'bcrypt';

export const loginUser = async (email, password) => {
  const result = await db.query('SELECT * FROM users WHERE email=$1', [email]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  const isPasswordValid = await bycrpt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  return user;
};

export const registerUser = async (email, password, role = 'user') => {
  const hashedPassword = await bycrpt.hash(password, 10);
  const result = await db.query(
    'INSERT INTO users (email,password,role) VALUES ($1,$2,$3) RETURNING id,email,role',
    [email, hashedPassword, role]
  );

  return result.rows[0];
};

export const insertTickets = async (
  title,
  description,
  childCategoryId,
  statusId,
  locationId,
  callId,
  assignedToId,
  siteVisitId,
  closed_at
) => {
  const query = `INSERT INTO tickets (call_id,title,description,
  child_category_id,status_id,location_id,assigned_tier_id,site_visit_id,closed_at)
  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *
  `;
  const values = [
    callId,
    title,
    description,
    childCategoryId,
    statusId,
    locationId,
    assignedToId,
    siteVisitId,
    closed_at,
  ];
  const result = await db.query(query, values);

  return result.rows[0];
};

export const getSubCategories = async () => {
  const result = await db.query('SELECT * FROM sub_categories ORDER BY id');
  return result.rows;
};

export const getChildCategories = async () => {
  const result = await db.query('SELECT * FROM child_categories ORDER BY name');
  return result.rows;
};

export const getStatuses = async () => {
  const result = await db.query('SELECT * FROM statuses ORDER BY id');
  return result.rows;
};

export const getLocations = async () => {
  const result = await db.query('SELECT * FROM locations ORDER BY id');
  return result.rows;
};

export const getTiers = async () => {
  const result = await db.query('SELECT * FROM support_tiers ORDER BY id');
  return result.rows;
};

export const getSiteVisits = async () => {
  const result = await db.query('SELECT * FROM site_visits ORDER BY id');
  return result.rows;
};

export const getTickets = async () => {
  const query = `
SELECT
  t.id,
  t.call_id,
  t.title,
  t.description,
  t.created_at,
  t.closed_at,
  c.name AS category,
  sc.name AS sub_category,
  cc.name AS child_category,
  s.name AS status,
  l.name AS location,
  tr.name AS assigned_to,
  sv.name AS site_visit_type
FROM tickets t
JOIN child_categories cc ON t.child_category_id = cc.id
JOIN sub_categories sc ON cc.sub_category_id = sc.id
JOIN categories c ON sc.category_id = c.id
JOIN statuses s ON t.status_id = s.id
JOIN locations l ON t.location_id = l.id
LEFT JOIN support_tiers tr ON t.assigned_tier_id = tr.id
LEFT JOIN site_visits sv ON t.site_visit_id = sv.id
ORDER BY t.created_at DESC;
  `;

  const result = await db.query(query);
  return result.rows;
};

export const updateTicketbyId = async (id, upates) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(upates)) {
    fields.push(`${key}=$${index}`);
    values.push(value);
    index++;
  }

  values.push(id);

  const query = `
  UPDATE tickets SET ${fields.join(',')}, updated_at = NOW()
  WHERE id = $${index}
  RETURNING *
  `;

  const result = await db.query(query, values);
  return result.rows[0];
};

export const deleteTicketbyId = async (id) => {
  const result = await db.query(`DELETE FROM tickets WHERE id=$1`, [id]);
  return result.rowCount > 0;
};

export const getAllArtcicles = async () => {
  const result = await db.query(`
    SELECT id,title,excerpt,content,author,created_at FROM articles
    ORDER BY created_at DESC
    `);
  return result.rows;
};

export const createArticle = async (title, excerpt, content, author) => {
  const result = await db.query(
    `INSERT into articles(title,excerpt,content,author)
    VALUES($1,$2,$3,$4)
    RETURNING id, title, excerpt, content, author, created_at
    `,
    [title, excerpt, content, author]
  );

  return result.rows[0];
};

export const getArticleById = async (id) => {
  const result = await db.query(
    `
    SELECT id,title,excerpt,content,author,created_at FROM articles
    WHERE id = $1
    `,
    [id]
  );
  return result.rows[0];
};

export const getTicketsByCountry = async ({ days, startDate, endDate }) => {
  const { clause, params } = buildDateFilter({ days, startDate, endDate }, 't.created_at');

  const query = `
      SELECT
        c.name AS country,
        COUNT(*) AS ticket_count
      FROM tickets t
      JOIN locations l ON t.location_id = l.id
      JOIN countries c ON l.country_id = c.id
       ${clause}
      GROUP BY c.name
      ORDER BY ticket_count DESC;
    `;
  const result = await db.query(query, params);
  return result.rows;
};

export const getResolvedTicketsByVisitType = async ({ days, startDate, endDate }) => {
  const { clause, params } = buildDateFilter({ days, startDate, endDate }, 't.closed_at');
  console.log(clause.length);

  const query = `SELECT
  COUNT(DISTINCT CASE WHEN sv.name = 'Onsite' THEN t.id END) AS onsite_resolved,
  COUNT(DISTINCT CASE WHEN sv.name = 'Remote' THEN t.id END) AS remote_resolved
FROM tickets t
JOIN statuses s ON t.status_id = s.id
JOIN site_visits sv ON t.site_visit_id = sv.id
${clause.length ? clause + " AND s.name = 'Resolved'" : "WHERE s.name = 'Resolved'"};`;

  const result = await db.query(query, params);
  return result.rows[0];
};

export const getTicketsCountByCategory = async () => {
  const query = `SELECT 
COUNT (CASE WHEN c.name = 'EUC' THEN 1 END ) as euc,
COUNT (CASE WHEN c.name = 'Application' THEN 1 END ) as Application,
COUNT (CASE WHEN c.name = 'Networking' THEN 1 END ) as Networking
FROM tickets t
JOIN child_categories cc ON t.child_category_id = cc.id
JOIN sub_categories sc ON cc.sub_category_id = sc.id
JOIN categories c ON sc.category_id = c.id `;

  const result = await db.query(query);
  return result.rows[0];
};
