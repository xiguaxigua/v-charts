export const simpleDataConverter = (data) => {
  if (!data || !data.columns || !data.rows) return data
  const { columns, rows } = data
  const result = { columns }
  result.rows = rows.map(row => {
    const temp = {}
    row.forEach((val, index) => {
      temp[columns[index]] = val
    })
    return temp
  })
  return result
}
