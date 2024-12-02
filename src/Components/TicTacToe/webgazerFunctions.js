const xMin = 598
const xMax = 1351
const yMin = 161
const yMax = 701

export function timeToFirstGaze(gazeData) {
  let cumulativeTime = 0

  for (let i = 0; i < gazeData.length; i++) {
    const { x, y, time } = gazeData[i]

    cumulativeTime += time

    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
      return cumulativeTime
    }
  }

  return -1
}

export function countTimesOutsideArea(gazeData) {
  let isInsideArea = false
  let countOutside = 0

  gazeData.forEach(({ x, y }) => {
    const insideArea = x >= xMin && x <= xMax && y >= yMin && y <= yMax

    if (isInsideArea && !insideArea) {
      countOutside++
    }

    isInsideArea = insideArea
  })

  return countOutside
}
