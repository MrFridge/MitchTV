const fs = require('fs')

export function readDataFromJsonFile(path: string): any {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
  } catch (err) {
    console.error(err)
    return []
  }
}

export function writeDataToJsonFile(
  inputData: any,
  path: string,
  needsItemsContainer = true
): void {
  const jsonObject = needsItemsContainer ? { items: inputData } : inputData
  try {
    fs.writeFileSync(path, JSON.stringify(jsonObject), 'utf8')
  } catch (err) {
    console.error(err)
  }
}
