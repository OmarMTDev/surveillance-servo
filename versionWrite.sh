apt-get update && apt-get install -y jq

echo "Version: RepoName@$(jq '.version' versions.json)" >> autoDocs.md