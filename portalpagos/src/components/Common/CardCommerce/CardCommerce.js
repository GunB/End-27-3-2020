import React from 'react'

const CardCommerce = props => {
  const { commerceData } = props
  return (
    <div className="card">
      <div className="card__img">
        <img src={commerceData.image} alt="commerce" className="w-100 bradius-sm" />
      </div>
      <div className="card__body">
        <h3 className="reset-margin bold fs-secondary">{commerceData.public_name}</h3>
        <p className="reset-margin">{commerceData.public_address}</p>
        <p className="reset-margin">{commerceData.public_phone}</p>
        <p className="reset-margin">{commerceData.city}</p>
      </div>
    </div>
  )
}

export default CardCommerce
