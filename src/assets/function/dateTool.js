export function getWeek(val) {
    let weekList = ['日', '一', '二', '三', '四', '五', '六']
    return `週${weekList[val]}`
}