export function getCityData(keyWord) {
    const data = require('assets/data/cityCountyData.json').data
    return data.find(item => item.COU_NAME === keyWord)
}