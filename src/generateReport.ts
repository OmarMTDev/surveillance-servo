const FIRST_DAY_PROD = new Date("2022-06-16T00:00:00.000Z").getTime();
const FIRST_DAY_PREP = new Date("2022-06-15T00:00:00.000Z").getTime();

const DAYS_PROD = Math.ceil(
  (new Date().getTime() - FIRST_DAY_PROD) /
    (1000 * 60 * 60 * 24),
);
const DAYS_PREP = Math.ceil(
  (new Date().getTime() - FIRST_DAY_PREP) /
    (1000 * 60 * 60 * 24),
);

export async function generateReport(
  migratedDaysPrep: number,
  migratedDaysProd: number,
  listProd: string[],
  listPreprod: string[],
  totalProd: number,
  totalPrep: number,
  scheduledPrep: number,
  scheduledProd: number,
) {
  const datofRep = `Report made on: ${new Date().toDateString()}`;
  const etaCalc = new Date(
    new Date().getTime() +
      Math.ceil(
          (DAYS_PREP - totalPrep) /
            (migratedDaysPrep + migratedDaysProd / 2),
        ) *
        1000 * 60 *
        60 * 24,
  ).toDateString();

  console.log(migratedDaysPrep, migratedDaysProd, listProd, listPreprod);
  await Deno.writeTextFile(
    `src/reports/${new Date().getFullYear()}-${new Date().getUTCMonth() + 1}-${
      new Date().getDate()
    }-migrationsReport.html`,
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1310, initial-scale=1.0">
    <title>Twilio Migrations Report</title>
    <style>
        body {
            display: grid;
        }
        

        section {
            border-bottom: gray solid 1px;
            width: 95%;
            display: flex;
            padding: 0 8px;
        }

        h1 {
            padding: 0 1em;
        }

        .card-container {
            width: max(680px, 100%);
            height: 40vh;
            display: flex;
        }

        .card-container-foot {
            width: max(680px, 100%);
            height: 20vh;
            display: flex;
            flex-wrap: nowrap;
        }

        .card {
            box-shadow: 1px 1px 2px #2DC4ED;
            height: 35vh;
            width: max(303px, 50%);
            padding: 0.5em 1em;
            margin: 3em 1em;
            display: grid;
            grid-template-columns: 33% 66%;
            grid-template-rows: 20% 80%;
        }

        .card-adv {
            box-shadow: 1px 1px 2px #2DC4ED;
            height: 35vh;
            width: max(340px, 50%);
            padding: 0.5em 1em;
            margin: 3em 1em;
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 20% 80%;
        }

        .subcardA {
            display: grid;
            grid-column: 1;
            grid-row: 2;
        }

        b {
            align-self: start;
            height: 8em;
            font-size: 2em;
        }

        b.kpi {
            font-size: 1.2em;
            height: 1em;
            align-self: center;
            margin-left: 1em;
         }  
         
         .perc {
         text-decoration: underline;
         color: blue;
         } 
         
         div.adv-info>b.advDaysProd {
            font-size: 1.2em;
            height: 1em;
            align-self: center;
            margin-left: 1em;
            color: green !important;
         }   
         div.adv-info>b.advDaysPrep {
            font-size: 1.2em;
            height: 1em;
            align-self: center;
            margin-left: 1em;
            color: green !important;
         }   
         
        
       
        
        div.adv-info>b.missDaysProd {
        color: red !important;
        font-size: 1.2em;
            height: 1em;
            align-self: center;
            margin-left: 1em;
        }
        div.adv-info>b.missDaysPrep {
        color: red !important;
        font-size: 1.2em;
            height: 1em;
            align-self: center;
            margin-left: 1em;
        }
        

        .adv-info {
            display: flex;
            align-items: center;
        }

        h3 {
            width: 13ch;
        }

        .subcardB {
            display: flex;
            flex-wrap: wrap;
            grid-column: 2;
            grid-row: 2;
            justify-items: start;
        }

        .subcardC {
            display: flex;
            flex-wrap: wrap;
            grid-row: 2;
        }

        .tit {
            align-items: start;
            grid-row: 1;
        }

        ul {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            padding: 1px 0;
        }

        li {
            margin: 0 10px;
        }

        footer {
            position: absolute;
            top: 90%
        }
        img {
            width: 70px;
            height: 70px;
        }
        
        
    </style>
</head>

<body>
    <section>
        <img src="../tendril-logo.svg" alt="IMG" />
        <h1>Twilio Migrations Report </h1>
    </section>
    <div class="card-container">
        <div class="card">
            <div class="tit">
                <h2>Production</h2>
            </div>
            <div class="subcardA">
                <h3>Days migrated in Production:</h3>
                <b id="numDaysProd">${migratedDaysProd}</b>
            </div>
            <div class="subcardB">
                Days:
                <ul id="listDaysProd">
                ${
      listProd.map((el) => {
        return `<li>${el}<li>`;
      })
    }
                </ul>
            </div>
        </div>

        <div class="card">
            <div class="tit">
                <h2>PreProd</h2>
            </div>
            <div class="subcardA">
                <h3>Days migrated in PreProduction:</h3>
                <b id="numDaysPrep">${migratedDaysPrep}</b>
            </div>
            <div class="subcardB">
                Days:
                <ul id="listDaysPrep">
                ${
      listPreprod.map((el) => {
        return `<li>${el}<li>`;
      })
    }
                </ul>
            </div>
        </div>
    </div>

    <div class="card-container-foot">
        <div class="card-adv">
            <div class="tit">
                <h2>Advance Production</h2>
            </div>
            <div class="subcardC">
                <div class="adv-info">
                    <h3>Days advanced in Production:</h3>
                    <b class="advDaysProd">${migratedDaysProd}</b>
                </div>

                <div class="adv-info">
                    <h3>Days migrated in Production:</h3>
                    <b class="kpi">${totalProd}</b>
                </div>

                <div class="adv-info">
                    <h3>Advance in Production:</h3>
                    <b class="kpi perc">${
      Number(totalProd / DAYS_PROD * 100).toFixed(2)
    }%</b>
                </div>
            </div>

            <div class="subcardC">
                <div class="adv-info">
                    <h3>Missing days in Production:</h3>
                    <b class="missDaysProd">${DAYS_PROD - totalProd}</b>
                </div>

                <div class="adv-info">
                    <h3>Scheduled Jobs</h3>
                    <b class="kpi">${scheduledProd}</b>
                </div>

                <div class="adv-info">
                    <h3>Finish ETA:</h3>
                    <b class="kpi">${etaCalc}</b>
                </div>
            </div>
        </div>

        <div class="card-adv">
            <div class="tit">
                <h2>Advance PreProd</h2>
            </div>
            <div class="subcardC">
                <div class="adv-info">
                    <h3>Days advanced in Preproduction:</h3>
                    <b class="advDaysPrep">${migratedDaysPrep}</b>
                </div>

                <div class="adv-info">
                    <h3>Days migrated in Preproduction:</h3>
                    <b class="kpi">${totalPrep}</b>
                </div>

                <div class="adv-info">
                    <h3>Advance in Preproduction:</h3>
                    <b class="kpi perc">${
      Number(totalPrep / DAYS_PREP * 100).toFixed(2)
    }% </b>
                </div>
            </div>

            <div class="subcardC">
                <div class="adv-info">
                    <h3>Missing days in Preproduction:</h3>
                    <b class="missDaysPrep">${DAYS_PREP - totalPrep}</b>
                </div>

                <div class="adv-info">
                    <h3>Scheduled Jobs</h3>
                    <b class="kpi">${scheduledPrep}</b>
                </div>

                <div class="adv-info">
                    <h3>Finish ETA:</h3>
                    <b class="kpi">${etaCalc}</b>
                </div>
            </div>
        </div>

    </div>
    <footer>
        <h2 id="dateRepo">${datofRep}</h2>
    </footer>
</body>
</html>`,
  );
}
