import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import NumberToCurrency from './numberToCurrency'

moment.locale('es')

const CuponesActivos = ({ cupon }) => {
  const percentage = (cupon.amount_current_redeem / cupon.amount_limit_redeem) * 100

  const showPercentage = ((percent, fechaFinalizado) => {
    const isPorcentajeFaltante = percent >= 80
    const hoy = moment()
    const fin = moment(fechaFinalizado)
    const diasFaltantes = fin.diff(hoy, 'days')
    const isCasiFechaFinalizado = diasFaltantes <= 5
    return isPorcentajeFaltante || isCasiFechaFinalizado
  })(percentage, cupon.date_to)

  return (
    <div className="card px-5 py-5">
      <div className="row">
        <div className="col-6" style={{ fontSize: '15px' }}>
          <strong>{cupon.code}</strong>
        </div>
        <div className="col-6 text-right" style={{ fontSize: '15px' }}>
          <strong>
            <NumberToCurrency value={cupon.amount_current_redeem} />
          </strong>
        </div>
        <div className="col-6" style={{ visibility: showPercentage ? 'initial' : 'hidden' }}>
          Cupón por finalizar
        </div>
        <div className="col-6 text-right">
          <span>
            <NumberToCurrency value={cupon.amount_limit_redeem} />
          </span>
        </div>
        <div className="col-12 my-3">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${percentage}%`, backgroundColor: '#FE200F' }}
              aria-valuenow={cupon.amount_current_redeem}
              aria-valuemin={0}
              aria-valuemax={cupon.amount_limit_redeem}
            />
          </div>
        </div>
        <div className="col-8" style={{ color: '#504C68' }}>
          Finaliza: {moment(cupon.date_to).format('DD/MM/YYYY')}
        </div>
        <div className="col-4 text-right" style={{ color: '#504C68' }}>
          <strong>{moment(cupon.date_to).fromNow()}</strong>
        </div>
      </div>
    </div>
  )
}

export default CuponesActivos
