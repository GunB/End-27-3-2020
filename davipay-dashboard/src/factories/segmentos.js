export const segmentosSelectedToTree = ({ segments = null, Segments = null }) => {
  let data = []
  const segmentos = Segments || segments
  if (Array.isArray(segmentos)) {
    data = segmentos.map(s => s.segment_id || s.id)
  }

  return data
}

export const segmentosTreeToCupon = (array = []) => {
  let data = []
  if (Array.isArray(array)) {
    data = array.map(s => ({
      segment_id: s,
    }))
  }
  return data
}

export default {
  segmentosSelectedToTree,
}
