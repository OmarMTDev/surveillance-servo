import { Database } from "jsr:@db/sqlite@0.11";
import {extractDataFromFile} from "./extractFromFile.ts";
import {getDaysByStatus} from "./filterData.ts";

export const db = new Database("migrations_advance.db");


const rows = db.prepare(`SELECT * FROM daily_updates`).all();
console.log("Advances:");
for (const row of rows) {
    console.log(row);
}

const preprod_logs_path = 'src/reports/twilio_jobs_preprod.json';
//const production_logs_path = 'src/reports/twilio_jobs_preprod.json';


const info = getDaysByStatus(await extractDataFromFile(preprod_logs_path), "COMPLETED");
console.log(info);

db.close();
