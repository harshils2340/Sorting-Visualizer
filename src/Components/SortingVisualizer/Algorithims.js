export async function BubbleSort(array, setState) {
    setState({ isSorting: true });
    let len = array.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        // set barOne and barTwo to the indices of the two bars being compared
        setState({ array, barOne: j, barTwo: j + 1 });
        if (array[j] > array[j + 1]) {
          let tmp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tmp;
        }
        // update the state to show the current step of the sorting process
        setState({ array });
        // pause for a short time to allow the animation to be visible
        await new Promise(resolve => setTimeout(resolve, 5));
        // reset barOne and barTwo to -1 to remove the red color
        setState({ array, barOne: -1, barTwo: -1 });
      }
    }
    setState({ isSorting: false, array: [...array], isSorted: true });
    return array;
  }

export async function InsertionSort(inputArr, setState) {
    let n = inputArr.length;
    setState({ isSorting: true });
    for (let i = 1; i < n; i++) {
      // Choosing the first element in our unsorted subarray
      let current = inputArr[i];
      // The last element of our sorted subarray
      let j = i - 1;
      while (j > -1 && current < inputArr[j]) {
        inputArr[j + 1] = inputArr[j];
        j--;
        // update the state to highlight the elements being compared
        setState({ array: [...inputArr], barOne: j + 1, barTwo: j });
        // pause for a short time to allow the animation to be visible
        await new Promise(resolve => setTimeout(resolve, 5));
      }
      inputArr[j + 1] = current;
      // update the state to reflect the current state of the sorting process
      setState({ array: [...inputArr], barOne: -1, barTwo: -1 });
    }
    // update the state to indicate that the array is now sorted
    setState({ array: [...inputArr], isSorted: true, isSorting: false });
    return inputArr;
  }
 

  
export function MergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

let isFinished = false;


export async function QuickSort(array, start, end, setState) {
  // Flag to check if the sorting process is finished
  isFinished = false;

  // Set default values for start and end if not provided
  if (start === undefined) {
    start = 0;
    end = array.length - 1;
  }

  // Base case: If the array has one element or is empty, it is already sorted
  if (start >= end) {
    // Mark the sorting as finished and reset bars to null for visualization
    isFinished = true;
    setState({ array: [...array], barOne: null, barTwo: null });
    return array;
  }

  // Store the initial start and end indices to use in recursive calls
  var rStart = start, rEnd = end;

  // Choose a pivot element randomly within the given range
  var pivot = array[Math.floor(Math.random() * (end - start + 1) + start)];

  // Partition the array and move elements around the pivot
  while (start < end) {
    // Find the next element from the left that is greater than the pivot
    while (array[start] <= pivot) start++;

    // Find the next element from the right that is smaller than the pivot
    while (array[end] > pivot) end--;

    // Swap the elements found on the left and right sides of the pivot
    if (start < end) {
      var temp = array[start];
      array[start] = array[end];
      array[end] = temp;
    }

    // If the sorting process is ongoing, update the state for visualization
    if (!isFinished) {
      setState({
        array: array,
        barOne: start,
        barTwo: end,
      });

      // Wait for 50ms before updating the state again for better visualization
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  // Recursively call QuickSort on the two partitions formed by the pivot
  QuickSort(array, rStart, start - 1, setState);
  QuickSort(array, start, rEnd, setState);
}
