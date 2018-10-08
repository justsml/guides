#!/bin/bash
set -e

echo "###### @justsml's express template #######"
[ ! -f ./app.js ] && curl -Ssl -o ./app.js https://raw.githubusercontent.com/justsml/guides/master/express/setup-guide/app.js
echo '### basic app.js server setup...'

[ ! -f ./package.json ] && npm init -y
npm install express cors body-parser morgan nodemon
echo '### added dependencies...'

# echo "### start app.js..."
# ./node_modules/.bin/nodemon app.js
echo "###=> TODO: don't forget to setup your routes & package.json 'start script'"
echo "###=> TODO: add 'start' script to your package.json!"
sleep 1s
