FROM node:10-alpine as builder

COPY package.json package-lock.json ./

RUN npm install && mkdir /app-ui && mv ./node_modules ./app-ui

WORKDIR /app-ui

COPY . .

RUN npm run build:prod


FROM nginx:alpine

#!/bin/sh

# Copy from the stahg 1
COPY --from=builder /app-ui/dist/frontend /usr/share/nginx/html

EXPOSE 80

ADD entrypoint.sh entrypoint.sh
RUN chmod 755 entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]