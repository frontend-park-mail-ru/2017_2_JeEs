FROM nginx:alpine

USER root

RUN apk update && apk add bash nodejs

# RUN apk add --no-cache certbot curl
# RUN mkdir -p /var/www/webroot
# RUN certbot certonly --webroot -w /var/www/webroot -d quoridor.ru --quiet

EXPOSE 80
EXPOSE 443

COPY quoridor-nginx.conf /etc/nginx/conf.d/

RUN npm build
COPY dist var/www/
