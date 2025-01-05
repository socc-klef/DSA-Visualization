export function* bubbleSort(arr: number[]): Generator<{ sortedArray: number[], comparing: [number, number] | null, swapping: [number, number] | null, description: string }, void, unknown> {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { sortedArray: [...arr], comparing: [j, j + 1], swapping: null, description: `Comparing ${arr[j]} and ${arr[j + 1]}` };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { sortedArray: [...arr], comparing: null, swapping: [j, j + 1], description: `Swapping ${arr[j]} and ${arr[j + 1]}` };
      }
    }
  }
}

export function* selectionSort(arr: number[]): Generator<{ sortedArray: number[], comparing: [number, number] | null, swapping: [number, number] | null, description: string }, void, unknown> {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { sortedArray: [...arr], comparing: [j, minIdx], swapping: null, description: `Comparing ${arr[j]} with current minimum ${arr[minIdx]}` };
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { sortedArray: [...arr], comparing: null, swapping: [i, minIdx], description: `Swapping ${arr[minIdx]} with ${arr[i]}` };
    }
  }
}

export function* insertionSort(arr: number[]): Generator<{ sortedArray: number[], comparing: [number, number] | null, swapping: [number, number] | null, description: string }, void, unknown> {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    yield { sortedArray: [...arr], comparing: [i, j], swapping: null, description: `Inserting ${key} into sorted portion` };
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      yield { sortedArray: [...arr], comparing: null, swapping: [j + 1, j + 2], description: `Moving ${arr[j + 2]} to make room` };
    }
    arr[j + 1] = key;
    yield { sortedArray: [...arr], comparing: null, swapping: null, description: `Placed ${key} in correct position` };
  }
}

export function* mergeSort(arr: number[]): Generator<{ sortedArray: number[], comparing: [number, number] | null, swapping: [number, number] | null, description: string }, void, unknown> {
  yield* mergeSortHelper(arr, 0, arr.length - 1)
}

function* mergeSortHelper(arr: number[], left: number, right: number): Generator<{ sortedArray: number[], comparing: [number, number] | null, swapping: [number, number] | null, description: string }, void, unknown> {
  if (left < right) {
    const mid = Math.floor((left + right) / 2)
    yield* mergeSortHelper(arr, left, mid)
    yield* mergeSortHelper(arr, mid + 1, right)
    yield* merge(arr, left, mid, right)
  }
}

function* merge(arr: number[], left: number, mid: number, right: number): Generator<{ sortedArray: number[], comparing: [number, number] | null, swapping: [number, number] | null, description: string }, void, unknown> {
  const leftArr = arr.slice(left, mid + 1)
  const rightArr = arr.slice(mid + 1, right + 1)
  
  let i = 0, j = 0, k = left
  
  while (i < leftArr.length && j < rightArr.length) {
    yield { sortedArray: [...arr], comparing: [left + i, mid + 1 + j], swapping: null, description: `Comparing ${leftArr[i]} and ${rightArr[j]}`};
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i]
      i++
    } else {
      arr[k] = rightArr[j]
      j++
    }
    k++
    yield { sortedArray: [...arr], comparing: null, swapping: [k - 1, k], description: `Moving element to sorted array`};
  }
  
  while (i < leftArr.length) {
    arr[k] = leftArr[i]
    i++
    k++
    yield { sortedArray: [...arr], comparing: null, swapping: [k - 1, k], description: `Moving element to sorted array`};
  }
  
  while (j < rightArr.length) {
    arr[k] = rightArr[j]
    j++
    k++
    yield { sortedArray: [...arr], comparing: null, swapping: [k - 1, k], description: `Moving element to sorted array`};
  }
}

export function* quickSort(arr: number[]): Generator<{ sortedArray: number[], comparing: [number, number] | null, swapping: [number, number] | null, description: string }, void, unknown> {
  yield* quickSortHelper(arr, 0, arr.length - 1)
}

function* quickSortHelper(arr: number[], low: number, high: number): Generator<{ sortedArray: number[], comparing: [number, number] | null, swapping: [number, number] | null, description: string }, void, unknown> {
  if (low < high) {
    const pivotIndex = yield* partition(arr, low, high)
    yield* quickSortHelper(arr, low, pivotIndex - 1)
    yield* quickSortHelper(arr, pivotIndex + 1, high)
  }
}

function* partition(arr: number[], low: number, high: number): Generator<{ sortedArray: number[], comparing: [number, number] | null, swapping: [number, number] | null, description: string }, number, unknown> {
  const pivot = arr[high]
  let i = low - 1
  
  for (let j = low; j < high; j++) {
    yield { sortedArray: [...arr], comparing: [j, high], swapping: null, description: `Comparing ${arr[j]} with pivot ${pivot}` }
    if (arr[j] < pivot) {
      i++
      [arr[i], arr[j]] = [arr[j], arr[i]]
      yield { sortedArray: [...arr], comparing: null, swapping: [i, j], description: `Swapping ${arr[i]} and ${arr[j]}` }
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
  yield { sortedArray: [...arr], comparing: null, swapping: [i + 1, high], description: `Swapping pivot ${pivot} into place` }
  return i + 1
}

export function* heapSort(arr: number[]): Generator<{ sortedArray: number[], comparing: [number, number] | null, swapping: [number, number] | null, description: string }, void, unknown> {
  const n = arr.length

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    yield { sortedArray: [...arr], comparing: null, swapping: [0, i], description: `Moving largest element to end` }
    [arr[0], arr[i]] = [arr[i], arr[0]]
    yield { sortedArray: [...arr], comparing: null, swapping: null, description: `` }
    yield* heapify(arr, i, 0)
  }
}

function* heapify(arr: number[], n: number, i: number): Generator<{ sortedArray: number[], comparing: [number, number] | null, swapping: [number, number] | null, description: string }, void, unknown> {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2

  yield { sortedArray: [...arr], comparing: [largest, left], swapping: null, description: `Comparing parent and left child` }
  if (left < n && arr[left] > arr[largest]) {
    largest = left
  }

  yield { sortedArray: [...arr], comparing: [largest, right], swapping: null, description: `Comparing largest and right child` }
  if (right < n && arr[right] > arr[largest]) {
    largest = right
  }

  if (largest !== i) {
    yield { sortedArray: [...arr], comparing: null, swapping: [i, largest], description: `Swapping parent and largest child` }
    [arr[i], arr[largest]] = [arr[largest], arr[i]]
    yield { sortedArray: [...arr], comparing: null, swapping: null, description: `` }
    yield* heapify(arr, n, largest)
  }
}

