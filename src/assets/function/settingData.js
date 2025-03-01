//@ 設定檔
export function typeData(type) {
    switch (type) {
        case '美食':
        case 'food':
            return {
                color: '#dd844c',
                cn: '美食',
                en: 'food'
            }
        case '景點':
        case 'attractions':
            return {
                color: '#6c9fd5',
                cn: '景點',
                en: 'attractions'
            }
        case '住宿':
        case 'hotel':
            return {
                color: '#b1bf7b',
                cn: '住宿',
                en: 'hotel'
            }
        case '其他': return {
            color: '#000'
        }
        default: break;
    }
}