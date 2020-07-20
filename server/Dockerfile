FROM node:12

RUN apt-get update && apt-get install -y python python-pip zip && pip install Django && pip install autopep8 

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

CMD ["node", "build/index.js"]