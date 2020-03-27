import { FILTER } from 'constants/web_workers'
import { listenerWebWorker, postWebWorker } from 'helpers/webWorker'
import { filterData } from '.'

listenerWebWorker(self, FILTER.IN, WORKER_filterData)

function WORKER_filterData(eventData = {}) {
  const { data } = eventData
  if (!data) return
  const { dataSource, filters: { name, professions } = {} } = data
  const filtered = filterData(dataSource, { name, professions })
  postWebWorker(self, FILTER.OUT, filtered)
}
