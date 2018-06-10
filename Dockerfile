FROM node:10-alpine as build
WORKDIR /src
COPY . .

RUN npm install
RUN npm run build

FROM node:10-alpine
WORKDIR /app
COPY --from=build /src/dist .
RUN npm install -g http-server

EXPOSE 3000

CMD  ["http-server", "/app", "-p", "3000"]
