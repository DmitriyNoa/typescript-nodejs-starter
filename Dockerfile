FROM node:carbon

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY tslint.json tslint.json
COPY package-lock.json package-lock.json
COPY src src

RUN npm i
RUN npm run build

EXPOSE 8080

ENTRYPOINT npm run start