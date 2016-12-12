# :beers: BEER-SERVER :beers:

API for the Beer Compass Client.  Provides authentication and authorisation.  Stores and provides tracking data to the app.

## :beers: METHODS :beers:

#### base URL: http://localhost:3000/api/v1

ENDPOINT | METHOD | REQ. AUTH
---------|--------|----------
/signup | POST | NO
/login | POST | NO
/quit | POST | YES
/newAdventure | POST | YES
/saveAdventure | POST | YES
/adventures | GET | YES
/adventures/:adventureId | GET | YES
/adventures/:adventureId | POST | YES

## :beers: ENDPOINTS :beers:

#### /api/v1/signup
:beer: POST signup details (username, password, email) to DB, username and email address must be unique.  Password is encrypted and stored.

:beer: SUCCESS:
```
{status: 201, message: OK}
```
:beer: FAILURE:
```
{status: 409, message: user or email already exists}
```

#### /api/v1/login
:beer: POST user details to server for authentication

:beer: SUCCESS:
```
{
  "user": {
    "user_id": 1,
    "username": "sowisburger"
  }
}
```
:beer: FAILURE:
```
401 - Unauthorized
```

#### /api/v1/quit
:beer: POST user_id to server, deletes user account

:beer: SUCCESS:
```
{status: 200, message: "account removed"}
```
:beer: FAILURE:
```
{status: 400, message: "could not remove account"}
```

#### /api/v1/newAdventure
:beer: POST user_id to server, checks id of last adventure and returns a new id for the new adventure.

:beer: SUCCESS:
```
{
  "adventure_id": 2
}
```
:beer: If no adventures in table will return:
```
{
  "adventure_id": 1
}
```
:beer: Failure:
```
401 - Unauthorized
```

#### /api/v1/saveAdventure
:beer: POST map tracking data to DB

:beer: eg:
```
{"user_id": "2", "adventure_id": "1", "lat": "-40.292198", "long": "175.776004"}
```
:beer: SUCCESS:
```
{
  "status": 201,
  "message": "data saved"
}
```
:beer: FAILURE:
```
401 - Unauthorized
```

#### /api/v1/adventures
:beer: GET all adventures for the authenticated user

:beer: SUCCESS:
```
[
  {
    "id": 1,
    "user_id": 1,
    "adventure_id": 1,
    "lat": "-41.296798",
    "long": "174.773789",
    "createdAt": "2016-12-10 02:22:47"
  },
  {
    "id": 2,
    "user_id": 1,
    "adventure_id": 1,
    "lat": "-41.296478",
    "long": "174.773951",
    "createdAt": "2016-12-10 02:23:47"
  },
  {
    "id": 3,
    "user_id": 1,
    "adventure_id": 1,
    "lat": "-41.296139",
    "long": "174.774068",
    "createdAt": "2016-12-10 02:24:47"
  }
]
```
:beer: FAILURE:
```
401 - Unauthorized
```

#### /api/v1/adventures/:adventureId
:beer: GET a specific adventure by adventure ID

:beer: SUCCESS:
```
[
  {
    "id": 1,
    "user_id": 1,
    "adventure_id": 1,
    "lat": "-41.296798",
    "long": "174.773789",
    "createdAt": "2016-12-10 02:22:47"
  },
  {
    "id": 2,
    "user_id": 1,
    "adventure_id": 1,
    "lat": "-41.296478",
    "long": "174.773951",
    "createdAt": "2016-12-10 02:23:47"
  },
  {
    "id": 3,
    "user_id": 1,
    "adventure_id": 1,
    "lat": "-41.296139",
    "long": "174.774068",
    "createdAt": "2016-12-10 02:24:47"
  }
]
```
:beer: FAILURE:
```
401 - Unauthorized
```

#### /api/v1/adventures/:adventureId
:beer: POST adventure ID for authorized user to DB to delete the adventure.

:beer: SUCCESS:
```
{status: 200, message: "adventure removed"}
```
:beer: FAILURE:
```
{status: 400, message: "could not remove adventure"}
```
