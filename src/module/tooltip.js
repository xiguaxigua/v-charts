import { getFnAndObjValue, getFormat } from '../utils'

export default function setTooltip (options) {
  const { _tooltipSettings = {} } = options
  let trigger = 'item'
  let tooltipAlias = null
  _tooltipSettings.forEach(tooltipItem => {
    const {
      trigger: customTrigger,
      tooltipAlias: customTooltipAlias
    } = tooltipItem
    if (customTrigger) trigger = customTrigger
    if (customTooltipAlias) tooltipAlias = customTooltipAlias
  })
  options.tooltip = {
    show: true,
    trigger,
    formatter (items) {
      const tpl = []
      let title = getFnAndObjValue(tooltipAlias, items[0].name)
      tpl.push(title)
      items.forEach(item => {
        const {
          data: {
            format,
            value,
            extra
          },
          seriesName,
          marker
        } = item
        const val = value.length ? value[1] : value
        tpl.push(`${marker}${seriesName}: ${getFormat(val, format)}`)
        if (extra && extra.length) {
          extra.forEach(extraItem => {
            const { value, format, seriesName } = extraItem
            const val = value.length ? value[1] : value
            tpl.push(`${marker}${seriesName}: ${getFormat(val, format)}`)
          })
        }
      })
      return tpl.join('<br>')
    }
  }
}
