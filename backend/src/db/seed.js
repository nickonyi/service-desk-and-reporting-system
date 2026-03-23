import fs from "fs";
import csv from "csv-parser";
import pkg from "pg";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_PROD,
});

// Step 1 — Read CSV
const readCSV = async (filePath) => {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

// Step 2 — Load look up tables
const loadLookUp = async (tableName) => {
  const res = await pool.query(`SELECT id,name FROM ${tableName}`);
  const map = {};
  res.rows.forEach((row) => {
    map[row.name] = row.id;
  });
  return map;
};

// Step 3 — Insert tickets
const insertTickets = async (tickets) => {
  for (const ticket of tickets) {
    await pool.query(
      `INSERT INTO tickets
       (call_id, title, description, status_id, location_id, child_category_id,site_visit_id, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        ticket.call_id,
        ticket.title,
        ticket.description,
        ticket.status_id,
        ticket.location_id,
        ticket.child_category_id,
        ticket.site_visit_id,
        ticket.created_at,
      ],
    );
  }
};

const createTicketComments = (tickets) => {
  const commentsArr = tickets.map(
    (ticket) => `Error:${ticket.description} sku:${ticket.extras}`,
  );
  return commentsArr;
};

const main = async () => {
  try {
    //Load csv
    const csvFilePath = path.resolve("./src/db/tickets.csv");
    const rows = await readCSV(csvFilePath);
    console.log("CSV rows loaded", rows.length);

    //Load lookup maps
    const locationMap = await loadLookUp("locations");
    const statusMap = await loadLookUp("statuses");
    const childCategoriesMap = await loadLookUp("child_categories");
    const siteVisitMap = await loadLookUp("site_visits");

    //Transform rows
    const tickets = rows.map((row) => ({
      call_id: row.id,
      title: row.category,
      description: row.comment,
      created_at: row.date,
      location_id: locationMap[row.location],
      status_id: statusMap[row.status],
      site_visit_id: siteVisitMap[row.state],
      child_category_id: childCategoriesMap[row.category],
    }));

    const comments = createTicketComments(rows);
    const ticketsWithComments = tickets.map((ticket, index) => ({
      ...ticket,
      description: comments[index],
    }));

    await insertTickets(tickets);
    console.log("Tickets inserted successufully...");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await pool.end();
  }
};

main();
