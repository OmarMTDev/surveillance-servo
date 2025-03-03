yesterday=$(date -d '3 days ago' +"%Y-%m-%dT%H:%M:%SZ")

day_display=$(date -d '3 days ago' +"%Y-%m-%d")

echo "Date used: $day_display"

qa=insertQAUri
prod=insertProdUri

# Mongo export PreProd
mongoexport --uri=$qa -c TwilioJobs \
   -q "{ \"updatedAt\": { \"\$gte\": {\"\$date\":\"$yesterday\"}} }" \
   --fields "startDay,status,updatedAt,createdAt" \
   --sort "{ \"startDay\": 1 }" \
   --type=json \
   --jsonArray \
    --out ../reports/twilio_jobs_preprod.json


mongoexport --uri=$prod -c TwilioJobs \
   -q "{ \"updatedAt\": { \"\$gte\": {\"\$date\":\"$yesterday\"}} }" \
   --fields "startDay,status,updatedAt,createdAt" \
   --sort "{ \"startDay\": 1 }" \
   --type=json \
   --jsonArray \
    --out ../reports/twilio_jobs_preprod.json


