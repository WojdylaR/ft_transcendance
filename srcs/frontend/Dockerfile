FROM alpine:3.15.0

WORKDIR /usr/src/app

RUN apk update;\
apk add nodejs npm;\
apk add nginx;\
mkdir -p /run/nginx;\
mkdir -p public;\
mkdir -p src;


COPY default.conf /etc/nginx/http.d/
COPY package*.json ./
COPY tsconfig.json ./
COPY public/ ./public/
COPY src/ ./src/

EXPOSE 8080

RUN npm install
CMD nginx -g 'daemon off;'