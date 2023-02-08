FROM node:16.18.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./

COPY . .

RUN npm install
RUN npx prisma generate

EXPOSE 9000
CMD [ "npm", "run", "server" ]