import React from 'react'
import { Link } from 'react-router-dom'

const CardItem = props => {
  const { img, title, to } = props
  return (
    <>
      <Link className="cardItem__link" to={to}>
        <div className="cardItem__container">
          <div className="cardItem__img">
            <img src={img} alt="icon category" className="w-100" />
          </div>
          <p className="cardItem__title">{title}</p>
        </div>
      </Link>
    </>
  )
}

export default CardItem
