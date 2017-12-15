FROM nginx
EXPOSE 80
COPY quoridor-nginx.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
COPY dist var/www
