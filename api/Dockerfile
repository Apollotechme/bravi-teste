FROM node:18.16.1

WORKDIR /app

COPY "package.json" .

RUN npm install

COPY . .

COPY ./config/docker.sh /entrypoint.sh

RUN chmod a+x /entrypoint.sh

RUN npx prisma generate && npx tsc

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 8000

CMD ["./entrypoint.sh"]