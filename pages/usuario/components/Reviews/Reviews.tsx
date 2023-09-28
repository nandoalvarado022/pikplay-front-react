import React from 'react'
import ImageProfile from '../../../../components/imageProfile/ImageProfile'
import styles from './styles.module.scss'

const Reviews = () => {
  const reviews = [
    {
      user: {
        name: 'Maritza',
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9sc7R1HGio7fgubDdpkPeiTPZ8V-bPSjXMl7RX8ltCoE5n0PUG_CcxwAnFdSd6DSCJSk&usqp=CAU',
      },
      calification: true,
      comment:
        'Un lujo, son cómodas para entrenar. Se agarran bastante bien a las superficies y son fachas combinan con todo',
      picture:
        'https://www.shutterstock.com/shutterstock/photos/2340486353/display_1500/stock-photo-little-boy-with-his-father-and-sister-playing-video-game-at-home-2340486353.jpg',
    },
    {
      user: {
        name: 'Juliana',
        photo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfVM6gvwE6PRYyaqiGUkV1-Gw9wOLfl8axvA&usqp=CAU',
      },
      calification: true,
      comment:
        'Un lujo, son cómodas para entrenar. Se agarran bastante bien a las superficies y son fachas combinan con todo',
      picture:
        'https://www.shutterstock.com/shutterstock/photos/2340486353/display_1500/stock-photo-little-boy-with-his-father-and-sister-playing-video-game-at-home-2340486353.jpg',
    },
  ]

  return (
    <div className={styles.Review}>
      <h2>Referencias de clientes</h2>
      {reviews.map((review, index) => {
        return (
          <article key={index}>
            <div>
              <ImageProfile url={review.user.photo} />
              <h3>{review.user.name}</h3>
              <div className={styles.comment}>
                Loren ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                ultricies, nisl id ultricies rhoncus, ipsum nisl aliquet velit,
                nec
                <img src={review.picture} />
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default Reviews
