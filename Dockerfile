FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY .env .
COPY index.js .

CMD [ "node", "index.js" ]