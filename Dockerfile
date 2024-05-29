FROM node:lts as builder

WORKDIR /app

COPY . .

RUN npm install --force

RUN npm run build

FROM node:lts

WORKDIR /app

COPY --from=builder /app  .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm", "run" , "start" ]
