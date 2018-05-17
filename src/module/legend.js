import { getFnAndObjValue } from '../utils'

export default function setLegend (options) {
  let legend
  const settings = options._legendSettings[0]
  const {
    displayMetrics,
    legendAlias,
    labelAlias
  } = settings
  if (!legendAlias && !labelAlias) legend = { data: displayMetrics }
  const data = labelAlias
    ? displayMetrics.map(item => getFnAndObjValue(labelAlias, item))
    : displayMetrics
  legend = [
    {
      data,
      formatter (name) {
        return getFnAndObjValue(legendAlias, name)
      }
    }
  ]
  options.legend = legend
}
