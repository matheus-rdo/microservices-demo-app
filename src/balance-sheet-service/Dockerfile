 
FROM node:8-alpine as base

FROM base as builder


WORKDIR /usr/src/app

COPY package*.json ./
COPY node_modules ./

RUN npm install

FROM base

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY . .

EXPOSE 7000

ENTRYPOINT [ "node", "app.js" ]