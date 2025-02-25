import { extractDataFromFile } from "./extractFromFile.ts";
import { getDaysByStatus } from "./filterData.ts";
import { generateReport } from "./generateReport.ts";
import { getLastMigratedDays, insertMigrationRecord } from "./dbCalls.ts";

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

export const listProd: Array<string> = [...completedPro, ...finishedPro];

export const listPreprod: Array<string> = [...completedPre, ...finishedPre];

export const totalProd = completedPro.length + finishedPro.length || 999;
export const totalPrep = completedPre.length + finishedPre.length || 999;

console.log("Advance from Production: ", totalProd);
console.log("Advance from PreProduction: ", totalPrep);

const scheduledPrep = getDaysByStatus(
  extractDataFromFile(preprod_logs_path),
  "SCHEDULED",
);
const scheduledProd = getDaysByStatus(
  extractDataFromFile(production_logs_path),
  "SCHEDULED",
);

const migrationsCheck = getLastMigratedDays();
insertMigrationRecord(migrationsCheck, totalPrep, totalProd);

const {
  migrated_in_prod,
  migrated_in_prep,
  total_in_production,
  total_in_preprod,
} = getLastMigratedDays();

await generateReport(
  migrated_in_prep,
  migrated_in_prod,
  listProd,
  listPreprod,
  total_in_production,
  total_in_preprod,
  scheduledPrep.length,
  scheduledProd.length,
);
