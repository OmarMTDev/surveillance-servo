apt-get update
apt-get -y install mongo-tools
apt install -y curl
apt-get install unzip -y

curl -fsSL https://deno.land/install.sh | sh

/root/.deno/bin/deno --version


/root/.deno/bin/deno run test