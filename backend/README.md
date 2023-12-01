# Backend
> backend documentation

## Technologies

- Express
- morgan
- jsonwebtoken
- mongoose
- bcrypt
- cryptojs
- socketio


## Routes
- [/auth](#auth) : 
    - [/login](#authlogin)
    - [/register](#authregister)
    - [/reset password](#authresetpassword)
    - [/refresh](#auth)

- [/user](#user) : 
    - [/user](#user)
    - [/user/:id](#userid)
    - [/user/change password](#userchangepassword)
    - [/user/edit](#useredit)


- [/chat](#chat) : 
    - [/messages](#chatmessages)
    - [/request/:id](#chatrequestid)
    - [/accept/:id](#chatacceptid)


- [/call](#call) : 
    - [history](#callhistory)

- [/feedback](#feedback)
    - [/feedback/](#feedback)

- [/admin](#admin) : 
    - others
        - [/overview](#adminoverview)
        - [/calls](#admincalls)
        - [/feedback](#admin)
    - user routes
        - [/user/](#adminuser)
        - [/user/:id](#adminuserid)
        - [/user/block](#adminuserblock)
        - [/user/mail](#adminusermail)
        - [/user/admin](#adminuseradmin)


### /auth

> authentication related routes

#### /auth/login

- method: `POST`
- description: user can login through this route
- request: 
    - body: 
        ```javascript
            {
                email: string,
                password: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                success: boolean,
                message: string,
                token: string
            }
        ```

#### /auth/register

- method: `POST`
- description: user can create an account through this route 
- request: 
    - body: 
        ```javascript
            {
                email: string,
                username: string,
                password: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                success: boolean,
                message: string,
            }
        ```


#### /auth/resetPassword

- method: `POST`
- description: user can login through this route
- request: 
    - body: 
        ```javascript
            {
                email: string,
            }
        ```
- response:
    - body:
        ```javascript
            {
                success: boolean,
                message: string,
            }
        ```

#### /auth/refresh

- method: `GET`
- description: get a new access token with the refresh token
- request: 
    - header:
        ```javascript
            {
                Access-Token: stirng
            }
        ```
- response:
    - body:
        ```javascript
            {
                success: boolean,
                message: string,
                token: string
            }
        ```

### /user
> user related routes

#### /user/

- method: `GET`
- description: fetch current user details
- response:
    - body:
        ```javascript
            {
                success: boolean,
                message: string,
                id: string,
                email: string,
                image: string,
                bio: string,
                username: string,
                active: boolean,
                friends: string[],
                admin: boolean,
                verified: boolean,
            }
        ```
#### /user/:id

- method: `GET`
- description: get user details by id
- request: 
    - params: 
        ```javascript
            {
                id: string
            }
        ```
- response: 
    - body: 
        ```javascript
            {
                success: boolean,
                message: string,
                user: {
                    username: string,
                    bio: string,
                    image: string,
                    friends: Array<User>
                }
            }
        ```

#### /user/edit

- method: `PUT`
- description: edit current user
- request:
    - body:
        ```javascript
            {
                username: string,
                email: string,
                bio: string,
                image: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                success: boolean,
                message: string
            }
        ```

#### /user/changePassword

- method: `POST`
- description: chaneg account password
- request: 
    - body: 
        ```javascript
            {
                email: string,
                password: string,
                newPassword: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                success: boolean,
                message: string 
            }
        ```


### /chat
> chat related routes

#### /chat/messages

- method: `GET`
- description: get all messages
- response: 
    - body: 
        ```javascript
            {
                success: boolean,
                message: string,
                messages: Array<{
                    sender: string,
                    reciever: string,
                    text: string,
                    file: string
                }>
            }
        ```
#### /chat/request/:id

- method: `POST`
- description: send friend request to a user
- request: 
    - params: 
        ```javascript
            {
                id: string
            }
        ```
- response
    - body: 
        ```javascript
            {
                success: boolean,
                message: string
            }
        ```

#### /chat/accept/:id

- method: `POST`
- description: accept a friend request
- request: 
    - params:
        ```javascript
            {
                id: string 
            }
        ```
- response: 
    - body: 
        ```javascript
            {
                success: boolean,
                message: string
            }
        ```

### /call
> call related routes

#### /call/history

- method: `GET`
- description: get call history of current user
- response:
    - body:
        ```javascript
            {
                success: boolean,
                message: string,
                history: Array<{
                        caller: string,
                        reciever: string,
                        time: string,
                        status: string,
                        createdAt: Date
                    }>
            }
        ```

### feedback
> feedback related routes

#### /feedback/

- method: `GET`
- description: get all feedbacks, this route is only for admin
- response
    - body:
        ```javascript
            {
                success: boolean,
                message: string,
                feedbacks: Array<{
                    user: string,
                    content: string,
                    createdAt: Date
                }>
            }
        ```

<br/>

- method: `POST`
- description: create new feedback user and admin
- request:
    - body:
        ```javascript
            {
                user: string,
                content: string 
            }
        ```
- response
    - body:
        ```javascript
            {
                success: boolean,
                message: string
            }
        ```


### /admin
> chat related routes

#### /admin/overview

- method: `GET`
- description: get data for overview
- response:
    - body:
        ```javascript
            {
               success: boolea,
               message: string,
               data: unknow
            }
        ```

#### /admin/user/

- method:`GET`
- description: get all users
- response:
    - body:
        ```javascript
            {
                success: boolean,
                message: string,
                users: Array<{
                        id: string,
                        username: string,
                        email: string,
                        active: boolean
                    }>
            }
        ```

<br /> 

- method: `POST`
- description: create a new user
- request: 
    - body: 
        ```javascript
            {
                username: string,
                email: string,
                bio: string,
                image: string
                password: string
            }
        ```

#### /admin/user/:id

- method: `GET`
- description: get a user by id
- request: 
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                success: boolean,
                message: string,
                user: {
                        id: string,
                        username: string,
                        email: string,
                        active: string,
                        friends: Array<User>
                    }
            }
        ```
<br /> 

- method: `PUT`
- description: edit an existing user
- request: 
    - params: 
        ```javascript
            {
                id: string
            }
        ```
    - body: 
        ```javascript
            {
                id: string,
                username: string,
                email: string,
                admin: boolean,
                active: boolean
                ...

            }
        ```
- response: 
    - body: 
        ```javascript
           {
                success: boolean,
                message: string
           }
        ```

<br /> 

- method: `DELETE`
- description: delete a user by id 
- request: 
    - params: 
        ```javascritp
            {
                id: string
            }
        ```
- response
    - body:
        ```javascript
            {
                success: boolean,
                message: string
            }
        ```

#### /admin/user/block

- method: `POST`
- description: block a user 
- request:
    - body:
        ```javascript
            {
                user: string,
            }
        ```
- response:
    - body: 
        ```javacsript
            {
                success: boolean,
                message: string
            }
        ```


#### /admin/user/mail

- method: `POST`
- description: send mail to a user from company email
- request: 
    - body:
        ```javascript
            {
                user: string,
                subject: string,
                content: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                success: boolean,
                message: string
            }
        ```

- method: `GET`
- description: get all mails
- response: 
    - body:
        ```javascript
            {
                success: boolean,
                message: string,
                mails: Array<{
                    sender: string,
                    content: string,
                    to: string,
                    subject: string,
                    createdAt: Date
                }>
            }
        ```

#### /admin/user/admin

- method: `POST`
- description: make a user admin
- request: 
    - body: 
        ```javascript
            {
                user: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                success: boolean,
                message: string
            }
        ```


#### /admin/calls

- method: `GET`
- description: get call acticities
- response:
    - body: 
        ```javascript
            {
                success: boolean,
                message: string,
                calls: Array<{
                    caller: string,
                    reciever: string,
                    status: "ACCEPTED", "REJECTED", "MISSED",
                    time: Date,
                    createdAt: Date
                }>
            }
        ```
