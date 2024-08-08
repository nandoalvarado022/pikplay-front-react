export default function handler(req,
    res) {
    const response = {
        list: [
            {
                background_color: "linear-gradient(45deg, #3095b359, #dc1919b5)",
                background_image: "/images/backgrounds/dog-and-guy.png",
                city: "BAQ",
                coins: 10234,
                exp: 100,
                badge: "liga-oro",
                league: "oro",
                name: 'Gustavo',
                picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTocyW2umRck0TqNczW9WF2oATylSBQR4cdoQ&s"
            },
            {
                background_image: "/images/backgrounds/anime.jpeg",
                city: "BAQ",
                coins: 2934,
                exp: 500,
                badge: "daily-login",
                league: "plata",
                name: 'Darkside',
                picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2xW2RFl2QLAchkHyt4DDU5RA5glgOA7sjUw&s"
            },
            {
                name: 'Guest_D3',
                badge: "daily-login",
                exp: 843,
                city: "BOG",
                coins: 234,
                background_color: "linear-gradient(45deg, #3095b359, #81127eb5)",
                background_image: "/images/backgrounds/dog-and-guy.png",
                league: "oro",
                picture: "https://static.wikia.nocookie.net/26e0b874-613b-4136-8f13-453f2ea74af2/scale-to-width/755"
            },
            {
                name: 'Guest_T4',
                badge: "daily-login",
                exp: 923,
                city: "CAL",
                coins: 354,
                league: "plata",
                background_image: "/images/backgrounds/anime.jpeg",
                picture: "https://i0.wp.com/graveravens.com/wp-content/uploads/2016/11/Random-Profile-Pictures-Transformed-into-3D-Portraits-10.jpg?fit=1120%2C1120&ssl=1"
            },
            {
                name: 'Guest_D5',
                badge: "daily-login",
                exp: 243,
                city: "BOG",
                coins: 234,
                league: "oro",
                picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTuhQi2i3zbaiN_OQkjIcESQXumPArgJbmkA&s"
            },
        ]
    }
    res.status(200).json(response)
}
