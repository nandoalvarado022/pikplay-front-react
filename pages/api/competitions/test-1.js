export default function handler(req, res) {
    res.status(200).json({
        "id": 3,
        "title": "Act 3. Playstation 5 Slim",
        "slug": "test-3",
        "description": "la mejor",
        "created_at": "2024-01-17T02:56:34.000Z",
        "is_active": true,
        "date_release_quotas": "Sábado 12 de Junio",
        "award": "Playstation 5 Slim 1 TB",
        "quota_value": 25900,
        "uid": 2,
        "available_numbers": 82,
        "image": "/images/others/ps5.png",
        "members": [
            {
                "id": 113,
                "is_active": 1,
                "title": "Act 3. Playstation 5 Slim",
                "slug": "test-3",
                "description": "la mejor",
                "uid": 2,
                "quota_value": 25900,
                "award": "Playstation 5 Slim 1 TB",
                "date_release_quotas": "Sábado 12 de Junio",
                "created_at": "2024-06-09T04:23:08.000Z",
                "user_id": 2,
                "competition_id": 3,
                "number": 4,
                "is_paid": 0
            }
        ],
        "seller": {
            "uid": 2,
            "name": "Blue Panther's",
            "is_certificated": false,
            "login_code": 1234,
            "city": null,
            "email": null,
            "phone": "570123456789",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjU3MDEyMzQ1Njc4OSIsImNvZGUiOjEyMzQsImlhdCI6MTcxNjk5MjI3MCwiZXhwIjoxNzE2OTkyMzMwfQ.C6y_YH64-qSVnerIS55vRixlO2QsshCliQDFQkW5OZw",
            "is_admin": false,
            "picture": "https://pikplay-bucket.nyc3.cdn.digitaloceanspaces.com/users/1716992297692-bluepanther-image.jpeg",
            "identification_number": null,
            "created_at": "2024-01-17T04:08:17.000Z"
        }
    })
}
