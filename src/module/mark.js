export default function setMarks (seriesItem, marks) {
  Object.keys(marks).forEach(key => {
    if (marks[key]) seriesItem[key] = marks[key]
  })
}
