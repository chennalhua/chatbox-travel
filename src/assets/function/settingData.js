//@ 設定檔
export function typeData(type) {
    switch (type) {
        case '美食': return {
            color: '#dd844c'
        }
        case '景點': return {
            color: '#6c9fd5'
        }
        case '住宿': return {
            color: '#b1bf7b'
        }
        case '其他': return {
            color: '#000'
        }
        default: break;
    }
}