#!/bin/bash

set -e

if [ ! -f ./app.js ]; then
  printf "FAILED: No app.js found in %s.\\n\\n Execute from root express server path (w/ app.js) \\n" "$PWD"
  exit 99
fi

read -t 15 -p "Enter route name (e.g. kitten, dog, user, widget, etc) " route_name

printf "Choose a template: (1-3)\\n"
printf "  #1 postgres-knex \\n"
printf "  #2 mongodb-monk \\n"
printf "  #3 in-memory-array \\n\\n"
read -t 15 -n 1 -p "Enter number 1-3: " route_template

printf "\\n\\nCreating route for $route_name..."

# set default template
export selected_template="https://raw.githubusercontent.com/justsml/guides/master/express/setup-guide/routes/template-postgres-knex.js"
[ "$route_template" == "1" ] && export selected_template="https://raw.githubusercontent.com/justsml/guides/master/express/setup-guide/routes/template-postgres-knex.js"
[ "$route_template" == "2" ] && export selected_template="https://raw.githubusercontent.com/justsml/guides/master/express/setup-guide/routes/template-mongodb-monk.js"
[ "$route_template" == "3" ] && export selected_template="https://raw.githubusercontent.com/justsml/guides/master/express/setup-guide/routes/template-in-memory-array.js"

mkdir -p ./routes

curl -Ssl -o "./routes/${route_name}.js" $selected_template

sed -i "s/item/${route_name}/g" "./routes/${route_name}.js"

printf "\\n\\n [downloaded template]\\n"
printf "\\n [patched variables]\\n\\n"

printf "\\n### IMPORTANT: add to your app.js: \\n\\n"
printf "  app.use('/api/${route_name}', require('./routes/${route_name}.js'))\\n\\n"
