export function* linearSearch(arr: number[], target: number): Generator<{ currentIndex: number, found?: number }, number, unknown> {
  for (let i = 0; i < arr.length; i++) {
    yield { currentIndex: i }
    if (arr[i] === target) {
      yield { currentIndex: i, found: i }
      return i
    }
  }
  yield { currentIndex: arr.length - 1, found: -1 }
  return -1
}

export function* binarySearch(arr: number[], target: number): Generator<{ currentIndex: number, low: number, mid: number, high: number, found?: number }, number, unknown> {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    yield { currentIndex: mid, low: left, mid, high: right }
    
    if (arr[mid] === target) {
      yield { currentIndex: mid, low: left, mid, high: right, found: mid }
      return mid
    } else if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  yield { currentIndex: -1, low: left, mid: -1, high: right, found: -1 }
  return -1
}

