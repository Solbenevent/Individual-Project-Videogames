const merge = (left, right, order = 'asc', attribute = '') => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      const leftValue = attribute ? left[leftIndex][attribute] : left[leftIndex];
      const rightValue = attribute ? right[rightIndex][attribute] : right[rightIndex];
  
      if (order === 'asc' ? leftValue < rightValue : leftValue > rightValue) {
        result.push(left[leftIndex]);
        leftIndex++;
      }
        result.push(right[rightIndex]);
        rightIndex++;
    }
  
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  }
  

export const mergeSort = (arr, order = 'asc', attribute = '') => {
    if (arr.length <= 1) return arr;
  
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
  
    return merge(mergeSort(left, order, attribute), mergeSort(right, order, attribute), order, attribute);
  }
  