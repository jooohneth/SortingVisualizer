export function animateQuickSort(arr) {
    const copy = [...arr];
    const animations = [];
    quickSort(copy, 0, copy.length - 1, animations);
    return animations;
  }
  
  function quickSort(arr, left, right, animations) {
    if (right <= left) return;
    const part = partition(arr, left, right, animations);
    quickSort(arr, left, part, animations);
    quickSort(arr, part + 1, right, animations);
  }
  
  function partition(arr, left, right, animations) {
    let i = left;
    let j = right + 1;
    const pivot = arr[left];
    while (true) {
      while (arr[++i] <= pivot) {
        if (i === right) break;
        animations.push([[i], false]);
      }
      while (arr[--j] >= pivot) {
        if (j === left) break;
        animations.push([[j], false]);
      }
      if (j <= i) break;
      animations.push([[i, arr[j]], true]);
      animations.push([[j, arr[i]], true]);
      [arr[j], arr[i]] = [arr[i], arr[j]]
    }
    animations.push([[left, arr[j]], true]);
    animations.push([[j, arr[left]], true]);
    [arr[left], arr[j]] = [arr[j], arr[left]]
    return j;
  }
  