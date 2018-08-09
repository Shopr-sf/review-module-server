FROM node:8.11.3-alpine

RUN mkdir -p /review-server

WORKDIR /review-server

COPY . /review-server

RUN npm install

EXPOSE 3004

CMD ["npm", "run", "serve"]
