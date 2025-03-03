import { Database } from "jsr:@db/sqlite";

class Advance {
  total_in_preprod!: number;
  total_in_production!: number;
  migrated_in_prep!: number;
  migrated_in_prod!: number;
}

export function getLastMigratedDays(): Advance {
  const db = new Database("migrations_advance.db");
  const migrated = db.prepare(
    `SELECT * FROM daily_updates ORDER BY created_at DESC limit 1`,
  ).all();

  const migratedParse = JSON.parse(JSON.stringify(migrated))[0] as Advance;

  console.log(migratedParse);

  db.close();

  return migratedParse;
}

export function insertMigrationRecord(
  migrationInfo: Advance,
  totalPrep: number,
  totalProd: number,
) {
  const db = new Database("migrations_advance.db");

  const { total_in_preprod, total_in_production } = migrationInfo;

  console.log(
    `Pre: , ${total_in_preprod} + ${totalPrep} & Prod: , ${total_in_production} + ${totalProd} `,
  );

  const advanceInPre = total_in_preprod + totalPrep;
  const advanceInPro = total_in_production + totalProd;

  db.exec(
    `INSERT INTO daily_updates (migration_date, total_in_preprod , total_in_production , migrated_in_prep , migrated_in_prod, created_at ) VALUES (date('now'), ?, ? , ?, ?, date('now'))`,
    [advanceInPre, advanceInPro, totalPrep, totalProd],
  );

  db.close();
}
