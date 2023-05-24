FROM node:18-buster-slim

RUN npm install -g http-server

WORKDIR /src

COPY . .

RUN npm install --registry=https://registry.npmmirror.com

RUN npm run build

EXPOSE 80
CMD [ "http-server", "dist" ]