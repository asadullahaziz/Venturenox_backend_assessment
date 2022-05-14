!/bin/bash

# set -e

echo "Running database migrations"
npm run migrate

# echo "Seeding database"
npm run prismaGenerate

echo "Starting server"
npm start