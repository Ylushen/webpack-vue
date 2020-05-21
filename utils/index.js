export const toOptions = (obj, labelName = 'name', valueName = 'id') => {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) return obj
    return Object.keys(obj).map(key => ({ [labelName]: key, [valueName]: obj[key], item: obj }))
  } else throw new Error('参数格式类型错误')
}

export const createHash = (function createHash(length) {
  const charts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  
  return function(length) {
    let result = ''
    while (length--) {
      result += charts[Math.floor(Math.random() * charts.length)]
    }
    return result
  }
}())

