FROM balenalib/amd64-node:18-buster-run

COPY package*.json ./

RUN JOBS=MAX npm install --production --unsafe-perm && npm cache verify && rm -rf /tmp/*

COPY . ./

CMD ["npm", "start"]
