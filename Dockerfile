FROM node:10-alpine as build
WORKDIR /src
COPY . .

RUN npm install
RUN npm run build

FROM nginx:1-alpine
WORKDIR /app
COPY --from=build /src/dist .
RUN mkdir -p /etc/nginx/logs
COPY config/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
