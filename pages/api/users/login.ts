export default function handler(req, res) {
    const response = {
        "code": 200,
        "data": {
            "uid": 1,
            "name": "El Avatar",
            "is_certificated": true,
            "login_code": 1131,
            "city": 10,
            "email": "nandoalvarado022@gmail.com",
            "phone": "573187414972",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjU3MzE4NzQxNDk3MiIsImNvZGUiOjExMzEsImlhdCI6MTcyMDI3NDQ0MSwiZXhwIjoxNzIwMjc0NTAxfQ.14F8g_YRrfeXbzR6tWIGirhvwTNeImiU7hpaQ9th9nY",
            "is_admin": true,
            "picture": "https://pikplay-bucket.nyc3.cdn.digitaloceanspaces.com/users/1710547479718-descarga.jpeg",
            "identification_number": null,
            "created_at": "2023-12-10T19:55:45.000Z"
        },
        "message": "Ingresó con exito"
    }
    res.status(200).json(response)
}
