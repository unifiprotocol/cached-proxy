FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf

COPY cert/cert.pem /etc/ssl/cert.pem
COPY cert/key.pem /etc/ssl/key.pem