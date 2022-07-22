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

  And two DBs should be declared.
  1. Postgres SQL DataBase
  2. Google Storage
  
#### Postgres DB 

    경로적어주고 Set DB NAME to DB PORT to your environment in the .env_server file.
    
    대충 DB 코드들 
    
#### Google Storage

    Get the gc_connect.json file and save it with the same name
    
    
#### Alert Manager

    Modify the recipient email information and auth password in config.yml.
    For your information. The auth password is a Google application password, which you want to set according to your settings.
    
    
   

### *FrontEnd*

#### Target domain 수정하기

    경로 적어주고,
    In the setupProxy.js file, modify target to your domain.
    
    
### *피날레*

Finally, go to the top-level folder and type the command below in the terminal.
    
    docker-compose up --build -d

