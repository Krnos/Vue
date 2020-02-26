const parserFilters = filter => {
  let filterParams = ''
  let param = ''

  if (filter.where) {
    Object.keys(filter.where).map((value, key) => {
      if (value !== 'param') {
        (filter.where[value] && !Array.isArray(filter.where[value]) && typeof filter.where[value] !== 'object') && (filterParams += `&${value}=*${filter.where[value]}*`)
        value = Array.isArray(filter.where[value]) ? `,${filter.where[value][0]}|${filter.where[value][1]}` : value
        if (typeof filter.where[value] === 'object') {
          let aux = ''
          Object.keys(filter.where[value]).map(e => {
            if (typeof filter.where[value][e] === 'object') {
              Object.keys(filter.where[value][e]).map(i => {
                aux += `,${value}.${e}.${i}`
              })
            } else {
              aux += `,${value}.${e}`
              filterParams += `&where_relation=${filter.where[value][e]}${aux}`
            }
          })
          value = aux.substr(1)
        }
        param += `,${value}`
      } else {
        (param && filter.where[value].length > 0) && (filterParams += `&param=${filter.where[value]}${param}`)
      }
    })
  }

  if (filter.whereIn) {
    Object.keys(filter.whereIn).map((value, key) => {
      filter.whereIn[value].forEach((el) => {
        filterParams += `&${value}[]=${el}`
      })
    })
  }

  if (filter.whereBetween) {
    Object.keys(filter.whereBetween).map((value, key) => {
      if (filter.whereBetween[value].length > 0) {
        filterParams += `&${value}>${filter.whereBetween[value][0]}`
        filterParams += `&${value}<${filter.whereBetween[value][1]}`
      }
    })
  }

  if (filter.betweenDates) {
    Object.keys(filter.betweenDates).map((value, key) => {
      if (filter.betweenDates[value].length > 0) {
        filterParams += `&between_dates=${filter.betweenDates[value][0]},${filter.betweenDates[value][1]},${value}`
      }
    })
  }

  if (filter.includes) {
    if (filter.includes.length > 0) {
      filterParams += `&includes=${filter.includes}`
    }
  }

  if (filter.orderBy) {
    if (filter.orderBy.length > 0) {
      filterParams += `&order_by=${filter.orderBy}`
    }
  }
  return filterParams
}

export default parserFilters
