FROM node:18.2.0 as build-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:stable-alpine
#Install and generate self-signed certificate
RUN apk update && \
    apk add sed &&\
    apk add --no-cache openssl && \
    openssl req -x509 -nodes -days 365 \
    -subj  "/C=ES/ST=CA/O=RaulGimenez/CN=raulgimenez.com" \
     -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key \
     -out /etc/ssl/certs/nginx-selfsigned.crt;
#Enable ssl on nginx
RUN sed -i '/server_name/i listen 443 ssl http2 default_server;\nlisten [::]:443 ssl http2 default_server;\nssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;\nssl_certificate_key  /etc/ssl/private/nginx-selfsigned.key;\n' /etc/nginx/conf.d/default.conf
COPY --from=build-deps /app/build /usr/share/nginx/html