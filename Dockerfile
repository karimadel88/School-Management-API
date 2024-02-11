FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


ENV LONG_TOKEN_SECRET=8a3f0b6dcf76e24fc62d145489b10128
ENV SHORT_TOKEN_SECRET=5291e2682a1468d1
ENV NACL_SECRET=d9aa9e702cf30a7e99ec31e0f1abf128


CMD ["npm", "run","dev"]