FROM node:16-alpine3.14

RUN npm i -g nodemon@2.0.7

WORKDIR /server

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","run","startServer"]
