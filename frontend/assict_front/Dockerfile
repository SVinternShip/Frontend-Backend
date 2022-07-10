FROM node:16.15.1

#작업 디렉토리 설정
WORKDIR /frontend
#Dockerfile과 같은 위치에 있는 package.json을 /app에 복사
COPY .. .

RUN npm install --save --legacy-peer-deps


#Prod
RUN ["npm", "run", "build"]