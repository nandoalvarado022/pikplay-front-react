export default function handler(req,
    res) {
    const response = {
        list: [
            {
                name: 'Gustavo',
                insignia: "liga-oro",
                exp: 100,
                city: "BAQ",
                coins: 10234,
                league: "oro",
                background_color: "linear-gradient(45deg, #3095b359, #dc1919b5)",
                picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTocyW2umRck0TqNczW9WF2oATylSBQR4cdoQ&s"
            },
            {
                name: 'Darkside',
                insignia: "daily-login",
                exp: 500,
                city: "BAQ",
                coins: 2934,
                league: "plata",
                picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2xW2RFl2QLAchkHyt4DDU5RA5glgOA7sjUw&s"
            },
            {
                name: 'Guest_D3',
                insignia: "daily-login",
                exp: 843,
                city: "BOG",
                coins: 234,
                background_color: "linear-gradient(45deg, #3095b359, #81127eb5)",
                league: "",
                picture: "https://static.wikia.nocookie.net/26e0b874-613b-4136-8f13-453f2ea74af2/scale-to-width/755"
            },
            {
                name: 'Guest_T4',
                insignia: "daily-login",
                exp: 923,
                city: "CAL",
                coins: 354,
                league: "",
                picture: "https://i0.wp.com/graveravens.com/wp-content/uploads/2016/11/Random-Profile-Pictures-Transformed-into-3D-Portraits-10.jpg?fit=1120%2C1120&ssl=1"
            },
            {
                name: 'Guest_D5',
                insignia: "daily-login",
                exp: 243,
                city: "BOG",
                coins: 234,
                league: "",
                picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTuhQi2i3zbaiN_OQkjIcESQXumPArgJbmkA&s"
            },
        ]
    }
    res.status(200).json(response)
}
