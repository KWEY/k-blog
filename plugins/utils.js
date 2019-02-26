// guid
function guid(count) {
  let out = ''
  for (let i = 0; i < count; i += 1) {
    /* eslint-disable*/
    out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    /* eslint-enable */
  }
  return out
}
function download(o) {
  const obj = {
    text: '',
    type: 'text/plain;charset=utf-8',
    fileName: 'text.txt',
    ...o
  }
  const blob = new Blob([obj.text], { type: obj.type })
  if (window.navigator.msSaveOrOpenBlob) {
    // For IE
    navigator.msSaveBlob(blob, obj.fileName)
  } else {
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = obj.fileName
    link.style.display = 'none'
    link.target = '_blank'
    link.click()
    window.setTimeout(() => {
      link.remove()
      window.URL.revokeObjectURL(link.href)
    }, 3000)
  }
}
// 暴露出这些属性和方法
export default {
  guid,
  download
}
