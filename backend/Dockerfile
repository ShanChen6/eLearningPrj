FROM node:23.11.0-alpine

WORKDIR /eLearningPrj/backend

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]
