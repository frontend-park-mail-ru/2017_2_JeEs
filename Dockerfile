FROM nginx:alpine

USER root

RUN apk update && apk add bash nodejs

EXPOSE 80

WORKDIR /root/Quoridor
COPY . .
COPY quoridor-nginx.conf /etc/nginx/conf.d/

RUN npm build && cp -r dist /var/www/
