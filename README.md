# NAACP Web App

## Add Users

To add yourself to the repository, open a Pull Request modifying `COLLABORATORS`, entering your GitHub username in a newline.

All Pull Requests must follow the Pull Request Template, with a title formatted like such `[Project Name]: <Descriptive Title>`

## Requirements

- [Documentations](https://drive.google.com/drive/u/3/folders/111UoqdDX_7xjtfTVhit67edlxe55N0EU)
- [Web design](https://www.figma.com/file/qYARPNC6bkn50yPXRkKdIp/NAACP-Flows?node-id=0%3A1)

## Archiecture

- web-app - FrontEnd application
- web-api - BackEnd service
- MongoDB - database

## Setup Workplace

- setup MongoDB
- setup buckets in AWS S3
- setup web-app and web-api

## Setup MongoDB

- install [Docker](https://www.docker.com/get-started/)
- open a terminal and run following commands
- create directory mongodb, where data will be saved when mongodb shut down

```
mkdir mongodb
```

- docker will download mongodb image and run

```
cd mongodb
docker run -d -p 27017:27017 -v ~/mongodb:/data/db --name naacpdb mongo:latest
```

- create database naacpdb

```
docker ps
docker exec -it naacpdb bash
mongo
show dbs
use naacpdb
```

## Setup AWS S3

!For now make bucket public, proper permission configuration is needed

- create Access Key and Key ID (account -> Security credentials -> Access keys (access key ID and secret access key))
- create new Bucket se-naacp-web1
- create directories images/articles/ and images/users
- change a bucket permission into public
- change Object Ownership into ACLs enabled -> Object writer
- change Access control list (ACL) into Bucket owner (your AWS account) List Write and Read Write
- change bucket policy

```
{
    "Version": "2012-10-17",
    "Id": "Policy1648758660008",
    "Statement": [
        {
            "Sid": "Stmt1648758657919",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": [
                "s3:DeleteObject",
                "s3:GetObject",
                "s3:PutObject",
                "s3:ReplicateDelete",
                "s3:ReplicateObject"
            ],
            "Resource": "arn:aws:s3:::se-naacp-web1/images/articles/"
        }
    ]
}
```

- enable CORS

```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE",
            "GET"
        ],
        "AllowedOrigins": [
            "http://localhost",
            "http://localhost:3000"
        ],
        "ExposeHeaders": []
    }
]
```

## Setup web-app and web-api

- clone the source code from GitHub

```
git clone git@github.com:BU-Spark/se-naacp.git
```

- open directories web-app and web-api using IDE (Visual Studio Code) separately
- follow instructions in README files
