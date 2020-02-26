/*eslint-disable */
const parseVuexObject = object => {
  return JSON.parse(JSON.stringify(object))
}

export default parseVuexObject
