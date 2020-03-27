import React from 'react'
import imagedefault from 'assets/img/04.png'

const Banner = ({ image = imagedefault, children = null }) => {
  return (
    <div className="banner">
      <div className="banner__imageContainer">
        <img src={image} alt="banner" className="banner__imageContainer__image" />
      </div>
      <div className="banner__coverGradient" />
      <div className="banner__container banner__container--bottom">
        <h2 className="fc-white fs-title container-content">{children}</h2>
      </div>
    </div>
  )
}

export default Banner
