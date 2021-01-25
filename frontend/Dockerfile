FROM node:13

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install
# add app
COPY . ./

EXPOSE 3001

# start app
CMD ["npm", "start"]