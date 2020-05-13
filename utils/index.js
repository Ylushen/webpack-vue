export const toOptions = (obj, labelName = 'name', valueName = 'id') => {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) return obj
    return Object.keys(obj).map(key => ({ [labelName]: key, [valueName]: obj[key], item: obj }))
  } else throw new Error('参数格式类型错误')
}
