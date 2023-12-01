/**
 * @param  {Array}  list     查詢組數
 * @param  {String} keyWord  關鍵字
 * @return {Array}           結果
 */
export default function fuzzyQuery(rule, keyWord) {
  if (keyWord.search(rule) > -1) {
    return true;
  } else {
    return false
  }
}