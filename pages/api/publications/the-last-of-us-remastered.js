export default function handler(req, res) {
    const response = [
        {
            "pid": 16,
            "title": "The Last Of Us Remastered",
            "slug": "the-last-of-us-remastered",
            "active": true,
            "accept_changes": null,
            "description": "<p>Tomura Shigaraki cuyo nombre real es Tenko Shimura, es un villano y l&iacute;der interno de la liga de villanos junto con All For One.<br /><br />Llega ahora a Funko, Tomura Shigaraki en su versi&oacute;n Pop! para a&ntilde;adir a tu colecci&oacute;n de villanos y h&eacute;roes favoritos del anime y manga My Hero Academia.<br /><br />Aviso legal<br />&bull; La edad m&iacute;nima recomendada para utilizarla es 3 a&ntilde;os.</p>",
            "is_new": true,
            "is_verified": false,
            "category_id": 7,
            "price": 49000,
            "cashback_available": true,
            "quantity": 1,
            "order": 0,
            "created_at": "2024-02-24T13:40:24.000Z",
            "user": {
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
            "images": [
                {
                    "id": 13,
                    "url": "https://pikplay-bucket.nyc3.cdn.digitaloceanspaces.com/users/1710547479718-descarga.jpeg",
                    "order": null,
                    "created_at": "2024-02-24T13:47:46.000Z"
                },
            ]
        }
    ]
    res.status(200).json(response)
}
