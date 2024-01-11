from node:20

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
CMD ["yarn", "start"]
