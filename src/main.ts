import { Database } from "jsr:@db/sqlite@0.11";
import { extractDataFromFile } from "./extractFromFile.ts";
import { getDaysByStatus } from "./filterData.ts";
import { generateReport } from "./generateReport.ts";

const preprod_logs_path = "src/reports/twilio_jobs_preprod.json";
const production_logs_path = "src/reports/twilio_jobs_prod.json";

const completedPre = getDaysByStatus(
  await extractDataFromFile(preprod_logs_path),
  "COMPLETED",
);
console.log(`PreProd-Completed: ${completedPre.length}, List:`, completedPre);

const finishedPre = getDaysByStatus(
  await extractDataFromFile(preprod_logs_path),
  "FINISHED",
);
console.log(`PreProd-Finished: ${finishedPre.length}, List:`, finishedPre);

const completedPro = getDaysByStatus(
  await extractDataFromFile(production_logs_path),
  "COMPLETED",
);
console.log(
  `Production-Completed: ${completedPro.length}, List:`,
  completedPro,
);

const finishedPro = getDaysByStatus(
  await extractDataFromFile(production_logs_path),
  "FINISHED",
);
console.log(`Production-Finished: ${finishedPro.length}, List:`, finishedPro);

export const listProd: Array<string> = [...completedPro, ...completedPre];

export const listPreprod: Array<string> = [...completedPre, ...finishedPre];

export const totalProd = completedPro.length + finishedPro.length || 999;
export const totalPrep = completedPre.length + finishedPre.length || 999;

console.log("Advance from Production: ", totalProd);
console.log("Advance from PreProduction: ", totalPrep);

export const db = new Database("migrations_advance.db");

const rows = db.prepare(
  `SELECT * FROM daily_updates WHERE migration_date == date('now')`,
).all();
console.log("Advances:", rows);

db.close();

await generateReport(totalPrep, totalProd, listProd, listPreprod);
