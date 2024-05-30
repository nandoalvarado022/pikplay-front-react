import React from 'react'

const { motion } = require('framer-motion')

const VenderButton = () => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
      Categoria
    </motion.div>
  )
}

export default VenderButton
