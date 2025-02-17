import { Database } from "jsr:@db/sqlite@0.11";
import {extractDataFromFile} from "./extractFromFile.ts";
import {getDaysByStatus} from "./filterData.ts";


const preprod_logs_path = 'src/reports/twilio_jobs_preprod.json';
const production_logs_path = 'src/reports/twilio_jobs_prod.json';

console.log('Report made at: ', new Date().toDateString())


const completedPre = getDaysByStatus(await extractDataFromFile(preprod_logs_path), "COMPLETED");
console.log(`PreProd-Completed: ${completedPre.length}, List:` , completedPre);

const finishedPre = getDaysByStatus(await extractDataFromFile(preprod_logs_path), "FINISHED");
console.log(`PreProd-Finished: ${finishedPre.length}, List:` ,finishedPre );



const completedPro = getDaysByStatus(await extractDataFromFile(production_logs_path), "COMPLETED");
console.log(`Production-Completed: ${completedPro.length}, List:` ,completedPro );

const finishedPro = getDaysByStatus(await extractDataFromFile(production_logs_path), "FINISHED");
console.log(`Production-Finished: ${finishedPro.length}, List:` ,finishedPro );


const totalProd = completedPro.length +finishedPro.length ;
const totalPrep = completedPre.length + finishedPre.length;

console.log("Advance from Production: ", totalProd);
console.log("Advance from PreProduction: ",totalPrep);

export const db = new Database("migrations_advance.db");


const rows = db.prepare(`SELECT * FROM daily_updates WHERE migration_date == date('now')`).all();
console.log("Advances:", rows);

db.close();


