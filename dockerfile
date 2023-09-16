FROM node:18-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
COPY . ./
RUN npm run build
RUN npm install -g serve

CMD [ "serve", "-s", "build/" ]
