import Link from "next/link"
const { motion } = require("framer-motion")

const VenderButton = () => {
    return <Link href="/publicacion/crear" as="/publicacion/crear">
        <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}>
            Vender
        </motion.a>
    </Link>
}

export default VenderButton