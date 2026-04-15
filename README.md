# Smart Waitlist System

A serverless web application that allows customers to join a restaurant waitlist remotely and check real-time crowd levels.

## Features
- Join waitlist online
- Real-time crowd indicator (Low / Medium / Busy)
- Staff dashboard to manage queue
- Mark customers as ready
- Remove customers from queue
- SMS notification using AWS SNS

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: AWS Lambda (Serverless)
- Database: Amazon DynamoDB
- API: API Gateway
- Notifications: Amazon SNS
- Hosting: AWS Amplify

## Architecture
Serverless architecture using AWS services. No traditional server is required.

## How It Works
1. Customer submits request from website
2. API Gateway sends request to Lambda
3. Lambda stores data in DynamoDB
4. Staff manages queue from dashboard
5. SMS is sent when table is ready

## Live Demo
(https://main.d21vnwvx4jrlny.amplifyapp.com/)
## Author
Razan Alzaid
