
/**
 *
 * @param {*} data
 */
const opName = [
  'enter',
  
]
export const track = data => {
  if (opName.indexOf(data.flag) > -1) {
    data.logid = '001'
  } else {
    data.logid = '002'
  }
}
