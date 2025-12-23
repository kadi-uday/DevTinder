# DevTinder API's

### authRouter
- POST /signup
- POST /login
- POST /logout

### profileRouter
- POST /profile/view
- PATCH /profile/edit
- PATCH /profile/password

### connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

### userRouter
- GET /user/conntections
- GET /user/requests
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignore, intrested, accepted, rejected.