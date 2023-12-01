//* 文字過長處理
export default function TextLongToDot(str) {
    let maxLength = 30;
    let abbreviatedStr = str.length > maxLength ? str.substring(0, maxLength) + "..." : str;

    return abbreviatedStr
}