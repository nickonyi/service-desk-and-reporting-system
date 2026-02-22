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
  categoryId,
  statusId,
  locationId,
  callId,
  assignedToId,
  siteVisitId
) => {
  const query = `INSERT INTO tickets (call_id,title,description,
  category_id,status_id,location_id,assigned_tier_id,site_visit_id)
  VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *
  `;
  const values = [
    callId,
    title,
    description,
    categoryId,
    statusId,
    locationId,
    assignedToId,
    siteVisitId,
  ];
  const result = await db.query(query, values);
  return result.rows[0];
};

export const getCategories = async () => {
  const result = await db.query('SELECT * FROM categories ORDER BY id');
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
  SELECT t.id,t.call_id,t.title,t.description,t.created_at,
  c.name AS category,
  s.name AS status,
  l.name as location,
  tr.name as assigned_to
  FROM tickets t
  JOIN categories c on t.category_id = c.id
  JOIN statuses s on t.status_id = s.id
  JOIN locations l on t.location_id = l.id
  LEFT join support_tiers tr on t.assigned_tier_id = tr.id
  ORDER BY t.created_at DESC; `;

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

export const getTicketsByCountry = async (days) => {
  const query = `
      SELECT
        c.name AS country,
        COUNT(*) AS ticket_count
      FROM tickets t
      JOIN locations l ON t.location_id = l.id
      JOIN countries c ON l.country_id = c.id
      WHERE t.created_at >= NOW() - ($1 || ' days')::interval
      GROUP BY c.name
      ORDER BY ticket_count DESC;
    `;
  const result = await db.query(query, [days]);
  return result.rows;
};
