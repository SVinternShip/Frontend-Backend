![image](https://user-images.githubusercontent.com/53938323/180675735-6d46cd47-6844-4174-a281-dcec6f71dba5.png)



# Frontend & Backend

## Index
- [Lego2me](#lego2me)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Installation Process](#2-installation-process)
  - [3. Getting Started](#3-getting-started)
  - [4. File Manifest](#4-file-manifest)
  - [5. Copyrights / End User Licesnse](#5-copyrights--end-user-licesnse)
  - [6. Contact Information](#6-contact-information)

## 1. Prerequisites

Our service was created through the AI Application Development by Silicon Valley Engineering program organized by Headstart Silicon Valley.
http://www.learnflagly.com/courses/347/

## 2. Installation Process

```
$ git clone https://github.com/SVinternShip/Frontend-Backend.git
$ docker-compose up --build -d
```

## 3. Getting Started
- If you are running in your own server, modify domain.

### *Issuing SSL Certificates for HTTPS*

    You must first obtain ssl authentication to run https.
    
    Frontend-Backend/ssl-certification/init-letsencrypt.sh << Enter your domain at init-lensencrypt.sh
    
![image](https://user-images.githubusercontent.com/53938323/180370292-8915ef02-16bf-490a-b995-07582c8a186d.png)

    Then just run init-lensencrypt.sh with sudo. 
    
    When docker composed, a data folde is generated and an ssl certificate is automatically issued.
  
  
### *Two DB Declarations* 

  And two DBs should be declared.
  1. Postgres SQL DataBase
  2. Google Storage
  
#### Postgres DB 

    Set DB NAME to DB PORT to your environment in the .env_server file.
    
    DB_NAME=AssiCT
    DB_USER=dbmasteruser
    DB_HOST=ls-be2b7899bb8e4a14b10c9b048a594941c00a2e35.cd0wtijqfgih.ap-northeast-2.rds.amazonaws.com
    DB_PASSWORD=svproject22
    DB_PORT=5432
    
#### Google Storage

    Get the gc_connect.json file and save it with the same name
    
    
#### Alert Manager

    Modify the recipient email information and auth password in config.yml.
    For your information. The auth password is a Google application password, which you want to set according to your settings.
    
    
   

### *FrontEnd*

#### Modify Target domain

    In the setupProxy.js file, modify target to your domain.
    
    
### *Finale*

Finally, go to the top-level folder and type the command below in the terminal.
    
    docker-compose up --build -d
    
    
    
### *Pages by port*

#### prometheus  - (host):9090
![image](https://user-images.githubusercontent.com/53938323/181163124-12b7092c-5b3c-4793-addd-18baad36bd08.png)
#### grafana - (host):3000
![image](https://user-images.githubusercontent.com/53938323/181163151-de6c168f-a266-4792-b28b-618a9d5afb6b.png)
#### web - (host)
![image](https://user-images.githubusercontent.com/53938323/181163082-98fbd1e5-5176-4e93-a55e-b7551aced112.png)
#### swagger - (host)/api/swagger
![image](https://user-images.githubusercontent.com/53938323/181163058-0baff6e9-f2d9-41b2-b610-68975d097917.png)
--------------------------------------------------
#### celery - (host):5555
![image](https://user-images.githubusercontent.com/53938323/181163021-a398b9c9-e742-4b8d-9e33-30521a89fd48.png)
