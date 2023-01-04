import { processGeojson, processCsvData, processRowObject } from 'kepler.gl/processors'

/**
 * docs processor
 * https://docs.kepler.gl/docs/api-reference/processors/processors
 */
export const getProcessor = (type, data) => {
  if(type === 'geojson') return processGeojson(data)
  else if (type === 'csv') return processCsvData(data)
  else return processRowObject(data)
}