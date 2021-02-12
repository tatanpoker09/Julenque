FROM node:13

WORKDIR /app

ENV PATH /node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install
# add app
COPY ./ ./

EXPOSE 5379

# start app
CMD ["npm", "start"]
CMD ["npm", "run", "server"]
