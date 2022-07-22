## [ 초 안 ]

# Frontend & Backend

frontend &amp; api-server

### *HTTPS 를 위한 SSL 인증서 발급*

    You must first obtain ssl authentication to run https.
    
    Frontend-Backend/ssl-certification/init-letsencrypt.sh << Enter your domain at init-lensencrypt.sh
    
![image](https://user-images.githubusercontent.com/53938323/180370292-8915ef02-16bf-490a-b995-07582c8a186d.png)

    When docker composes, a data folder is generated and an ssl certificate is automatically issued.

    Write down the path, enter nginx.conf, and enter your domain as well.
  
  
### *2개의 DB 선언* 

  그리고 2개의 DB 가 선언되어야 한다. 
  1. Postgres SQL DataBase
  2. Google Storage
  
#### Postgres DB 

    경로적어주고 .env_server 파일에 DB NAME 부터 DB PORT 까지 자신의 환경에 맞게 설정하라.
    
    대충 DB 코드들 
    
#### Google Storage

    gc_connect.json 파일 발급받아서 같은 이름으로 저장하라.
    
    
#### Alert Manager

    config.yml 에서 receivers email 정보랑 auth password 를 수정하라.
    참고로. auth password 는 google application password 로, 자신의 설정에 맞게 설정하길 바란다.
    
    
   

### *FrontEnd*

#### Target domain 수정하기

    경로 적어주고, setupProxy.js 파일에서 target 에 너의 도메인으로 수정하면 된다.
    
    
### *피날레*

마지막으로 최상위 폴더로 가서 터미널에 아래 명령어를 입력하라.
    
    docker-compose up --build -d

