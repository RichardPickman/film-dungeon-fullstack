FROM node:18-alpine AS watcher
WORKDIR /var/www

ARG API_URL
ENV NEXT_PUBLIC_API_URL $API_URL

CMD ["npm", "run", "dev"]

EXPOSE 3000



FROM node:18-alpine AS builder
WORKDIR /var/www

ARG API_URL
ENV NEXT_PUBLIC_API_URL $API_URL

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 3000
