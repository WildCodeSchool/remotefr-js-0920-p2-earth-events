FROM  alpine:latest  AS builder
RUN  apk --no-cache add yarn
WORKDIR  /app/
COPY  .  /app
RUN  yarn && yarn build

FROM  nginx:alpine
COPY  --from=builder  /app/build  /usr/share/nginx/html
COPY  docker/nginx.conf  /etc/nginx/conf.d/default.conf
