FROM node:16

#app directory
WORKDIR /app

COPY package*.json /app
COPY tsconfig.json /app
COPY src /app/src

RUN npm install
RUN npm install -g nodemon
RUN ls -a
EXPOSE 5200
CMD ["npm", "run", "serve"]