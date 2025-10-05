FROM node:16.17.1-alpine3.16 as build
WORKDIR /usr/app
COPY . /usr/app
RUN npm install
RUN npm run build

FROM nginx:1.23.1-alpine
EXPOSE 80

COPY --from=build /usr/app/public /usr/share/nginx/html