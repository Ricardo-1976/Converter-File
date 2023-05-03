FROM node:16

ENV PORT=3331

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn
# If you are building your code for production
#RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3331

CMD [ "node", "./build/server.js" ]