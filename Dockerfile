FROM balenalib/amd64-node:18-buster-build

ENV UDEV=on

RUN apt-get update && \
    apt-get install \
    build-essential

COPY package*.json ./

RUN JOBS=MAX npm install --production --unsafe-perm && npm cache verify && rm -rf /tmp/*

COPY src /src

COPY src/49-printer-symlink.rules /etc/udev/rules.d/49-printer-symlink.rules

CMD ["npm", "start"]
