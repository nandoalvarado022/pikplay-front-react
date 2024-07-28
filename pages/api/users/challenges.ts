export default function handler(req, res) {
    let response = [
        {
            "completed": false,
            "detail": "Completa este desafio para obtener tu primer regalo!",
            "id": 1,
            "reward": "",
            "rewardImage": "/images/icons/gif.svg",
            "title": "Prueba el modo oscuro",
            buttonText: "Regalo sorpresa",
            height: 60,
            width: 60,
        },
        {
            "completed": false,
            "detail": "Realiza 20 compras en nuestro sitio, c/u debe ser por mínimo 100 mil pesos",
            "id": 1,
            "reward": "",
            "rewardImage": "/images/icons/gif.svg",
            "title": "Realiza 20 compras en Pikplay",
            buttonText: "Regalo sorpresa",
            height: 60,
            width: 60,
        },
        {
            "completed": false,
            "detail": "Obtñen descuentos exclusivos y participa en concursos solo para liga Plata",
            "id": 1,
            "reward": "",
            "rewardImage": "/images/icons/liga-oro-hiervas.svg",
            "title": "Alcanza a liga Plata",
            buttonText: "¿Como alcanzar Plata?",
            height: 60,
            starsEffect: true,
            width: 60,
        },
        {
            "id": 1,
            "title": "Personaliza tu Avatar",
            "detail": "Añade un widget a tu avatar, gafas, sombrero, etc.",
            "completed": false,
            "reward": "coins",
            coins: 2500,
        },
        {
            "id": 1,
            "title": "Participar en 2 actividades",
            "detail": "Participar en uno de los concursos de nuestros Aliados Comerciales",
            "completed": true,
            coins: 1200,
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
    const limit = req.query?.limit
    if (limit) response = response.slice(0, limit)
    res.status(200).json(response)
}
