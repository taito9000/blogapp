FROM node:22.4.1-alpine

RUN apk add g++ make py3-pip

WORKDIR /backend/

COPY ./backend /backend/

RUN apk add --no-cache git
RUN npm install -g npm@10.8.1
RUN npm install -g node-gyp
RUN npm upgrade --save --legacy-peer-deps
RUN npm install

CMD ["npm","run","start:dev"]