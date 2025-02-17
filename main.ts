import { Database } from "jsr:@db/sqlite@0.11";

export const db = new Database("migrations_advance.db");


const rows = db.prepare(`SELECT * FROM daily_updates`).all();
console.log("Advances:");
for (const row of rows) {
    console.log(row);
}

db.close();
