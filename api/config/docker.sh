#!/bin/bash

npx prisma migrate dev --name initial_migrate

npm run start