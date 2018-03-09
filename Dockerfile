FROM node:carbon

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY tslint.json tslint.json
COPY package-lock.json package-lock.json
COPY src src

RUN npm i
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]