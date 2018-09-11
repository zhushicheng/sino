FROM 192.168.85.6:8084/nginx:1.13

MAINTAINER zhang_zheng@sinosoft.com.cn

RUN rm /etc/nginx/nginx.conf

ADD nginx.conf /etc/nginx/

COPY dist/  /usr/share/nginx/html/
