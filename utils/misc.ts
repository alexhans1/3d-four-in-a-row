export const compareArrayEquals = (arr1: number[], arr2: number[]) => {
  for (const key in arr1) {
    const index = parseInt(key)
    if (arr1[index] !== arr2[index]) {
      return false
    }
  }
  return true
}
