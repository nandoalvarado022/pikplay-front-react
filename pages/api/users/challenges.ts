export default function handler(req, res) {
    const response = [
        {
            "id": 1,
            "title": "Personaliza tu Avatar",
            "detail": "Añade un widget a tu avatar, gafas, sombrero, etc.",
            "completed": false,
            "reward": "coins",
        },
        {
            "id": 1,
            "title": "Participar en 2 actividades",
            "detail": "Participar en uno de los concursos de nuestros Aliados Comerciales",
            "completed": true,
            "reward": "coins",
        },
        {
            "id": 1,
            "title": "Ingresar 5 referidos",
            "detail": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor, nunc a",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxsqGqyPtsm92LY2ZSwyICsSLTBvUU_RI1XQ&s",
            "completed": false,
            "target": 5,
            "reward": "",
            "rewardImage": "/images/icons/gafas.webp",
            height: 60,
            width: 60,
        },
    ]
    res.status(200).json(response)
}
