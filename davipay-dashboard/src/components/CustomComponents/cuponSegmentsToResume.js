import React from 'react'
import * as uuidv4 from 'uuid/v4'

const CuponSegmentsToResume = ({ segments = [], rawSegments, showLabel = true, ...props }) => {
  return (
    <div {...props}>
      {Array.isArray(segments) &&
      Array.isArray(rawSegments) &&
      segments.length > 0 &&
      rawSegments.length > 0
        ? segments.map(c => {
            const element = rawSegments.find(
              r =>
                `${r.id}` === `${c.segment_id}` || `${r.id}` === `${c.id}` || `${r.id}` === `${c}`,
            )
            if (element) {
              const { name } = element
              return (
                <div key={uuidv4()}>
                  {showLabel ? <strong>Segmento: </strong> : null}
                  <span>{name}</span>
                </div>
              )
            }
            return null
          })
        : null}
    </div>
  )
}

export default CuponSegmentsToResume
