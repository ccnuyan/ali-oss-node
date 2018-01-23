[![Build Status](https://www.travis-ci.org/ccnuyan/ass-node.svg?branch=master)](https://www.travis-ci.org/ccnuyan/ass-node)

> This is a lightweight db-less example, helps node.js developers to employ aliyun-oss (ass) as their object storage service:

## Demo 

http://ass-node.herokuapp.com/

notice it is `http://` not `https://`

* session-id as user-id
* private bucket
* policy of uploading with callback

## To run locally:

* `ngrok http 8000`  
    then replace [callback host](./serverConfig/common.js#line1) with generated ngrok host url

* ENV your aliyun bucket and accesskey as
    `OSS_KEY_ID`  
    `OSS_KEY_SECRET`  
    `OSS_BUCKET`  
    `OSS_REGION`  

## Uses:

* Unload JS Module: fine-uploader
* UI: semantic
* Frontend: react redux immutabele
* Backend: express