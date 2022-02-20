FROM node:14.19.0
WORKDIR /usr/src/app
RUN npm install
COPY . .
CMD ["npm","run","dev"]