const parseDeleteMany = (data, value) => {
  let dataDelete = {
    ids: data.map(a => a.id),
    indexes: data.map((a, index) => index),
    values: data.map(a => a[value])
  }

  return dataDelete
}

export default parseDeleteMany
