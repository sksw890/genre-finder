#!/bin/sh
npx prisma migrate dev --schema /app/src/data-access/prisma/schema.prisma

npx prisma generate --schema /app/src/data-access/prisma/schema.prisma

nodemon