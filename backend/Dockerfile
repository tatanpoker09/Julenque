FROM node:13

WORKDIR /app
COPY package*.json ./

# need this for processing videos
RUN npm install

COPY . ./backend