# 1-й слой — сборка
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2-й слой — минимальный production
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --only=production

ENV NODE_ENV=production
EXPOSE 5001
CMD ["npm", "run", "start:prod"]