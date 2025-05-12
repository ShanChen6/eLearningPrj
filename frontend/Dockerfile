FROM node:23.11.0-alpine3.18

WORKDIR /eLearningPrj/frontend

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start", "dev"]
