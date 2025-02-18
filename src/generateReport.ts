export async function generateReport(
  migratedDaysPrep: number,
  migratedDaysProd: number,
  listProd: string[],
  listPreprod: string[],
) {
  const datofRep = `Report made at: ${new Date().toDateString()}`;

  console.log(migratedDaysPrep, migratedDaysProd, listProd, listPreprod);
  await Deno.writeTextFile(
    "src/twilioReport.html",
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
            box-shadow: 1px 1px 12px #2DC4ED;
            height: 35vh;
            width: max(303px, 50%);
            padding: 0.5em 1em;
            margin: 3em 1em;
            display: grid;
            grid-template-columns: 33% 66%;
            grid-template-rows: 20% 80%;
        }

        .card-adv {
            box-shadow: 1px 1px 12px #0C548C;
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

        div.adv-info>b {
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
        <img src="./tendril-logo.svg" alt="IMG" />
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
                <h2>Advance</h2>
            </div>
            <div class="subcardC">
                <div class="adv-info">
                    <h3>Days advanced in Production:</h3>
                    <b id="advDaysProd">9</b>
                </div>

                <div class="adv-info">
                    <h3>Days migrated in Production:</h3>
                    <b id="migDaysProd">730</b>
                </div>

                <div class="adv-info">
                    <h3>Advance in Production:</h3>
                    <b id="percAdvProd">70% </b>
                </div>
            </div>

            <div class="subcardC">
                <div class="adv-info">
                    <h3>Missing days in Production:</h3>
                    <b id="missDaysProd">9</b>
                </div>

                <div class="adv-info">
                    <h3>Scheduled Jobs</h3>
                    <b id="schedDaysProd">730</b>
                </div>

                <div class="adv-info">
                    <h3>Finish ETA:</h3>
                    <b id="etaProd">11-3-2025</b>
                </div>
            </div>
        </div>

        <div class="card-adv">
            <div class="tit">
                <h2>Advance</h2>
            </div>
            <div class="subcardC">
                <div class="adv-info">
                    <h3>Days advanced in Production:</h3>
                    <b id="advDaysPrep">9</b>
                </div>

                <div class="adv-info">
                    <h3>Days migrated in Production:</h3>
                    <b id="migDaysPrep">730</b>
                </div>

                <div class="adv-info">
                    <h3>Advance in Production:</h3>
                    <b id="percAdvPrep">70% </b>
                </div>
            </div>

            <div class="subcardC">
                <div class="adv-info">
                    <h3>Missing days in Production:</h3>
                    <b id="missDaysPrep">9</b>
                </div>

                <div class="adv-info">
                    <h3>Scheduled Jobs</h3>
                    <b id="schedDaysPrep">730</b>
                </div>

                <div class="adv-info">
                    <h3>Finish ETA:</h3>
                    <b id="etaPrep">11-3-2025</b>
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
