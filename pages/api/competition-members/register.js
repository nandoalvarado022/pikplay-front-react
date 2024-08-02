export default function handler(req, res) {
    const response = {
        "competition_id": 3,
        "number": 12,
        "competition": {
            "id": 3,
            "title": "Act 3. Playstation 5 Slim",
            "slug": "test-1",
            "description": "la mejor",
            "created_at": "2024-01-16T21:56:34.000Z",
            "is_active": true,
            "date_release_quotas": "Sábado 12 de Junio",
            "award": "Playstation 5 Slim 1 TB",
            "price": 25900,
            "members_capacity": 50,
            "uid": 2
        },
        "id": 153
    }
    res.status(200).json(response)
}
