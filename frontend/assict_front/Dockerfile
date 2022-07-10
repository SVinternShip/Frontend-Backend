FROM node:16.15.1

#작업 디렉토리 설정
WORKDIR /frontend
#Dockerfile과 같은 위치에 있는 package.json을 /app에 복사
COPY . .

RUN yarn global add npm@8.11.0

RUN npm install


#Prod
RUN ["npm", "run", "build"]