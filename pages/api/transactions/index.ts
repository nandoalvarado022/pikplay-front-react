export default function handler(req, res) {
    const response = {
        code: 200,
        message: "",
        data: [
            {
                created_at: "17 agosto 2029",
                detail: "asdasd",
                pid: "12",
                p_image: "http://localhost/_next/image?url=%2Fimages%2Fpublications%2Fhiro-gorra.webp&w=640&q=75",
                p_title: "Gorra Plana Bart Simpson",
                publication: "",
                status: "1",
                type: "",
                u_name: "",
                u_phone: "",
                user: "",
                user_to: "",
                slug: "",
            }
        ]
    }
    res.status(200).json(response)
}
