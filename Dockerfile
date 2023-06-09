FROM node:16.18.1
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]
