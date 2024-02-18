const Testimonials = () => {
  const getTestimonials = async () => {
    const res = await fetch('http://localhost:5000/publications')
    const data = await res.json()
  }

  getTestimonials()

  return <div>Testimonios</div>
}

export default Testimonials
