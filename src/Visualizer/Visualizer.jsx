import React, { useState, useEffect, useRef } from 'react';
import './Visualizer.css';
import { animateQuickSort } from '../Algorithms/QuickSort';
import { animateInsertionSort } from '../Algorithms/InsertionSort';
import { animateMergeSort } from '../Algorithms/MergeSort';

const arrayLength = 100;
const minNum = 5;
const maxNum = 80;
const delay = 10;
const accessedColor = "#FCF6F5FF";
const sortedColor  = '#FCF6F5FF';

const Visualizer = props => {
  const [arr, setArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const containerRef = useRef(null);

  useEffect(generateArray, []);

  function generateArray() {
    if (isSorting) return;
    if (isSorted) resetArrayColour();
    setIsSorted(false);
    const arr = [];
    for (let i = 0; i < arrayLength; i++) {
      arr.push((maxNum - minNum) * (i / arrayLength) + minNum);
    }
    shuffle(arr);
    setArr(arr);
  }

  function mergeSort() {
    const animations = animateMergeSort(arr);
    animateArrayUpdate(animations);
  }

  function insertionSort() {
    const animations = animateInsertionSort(arr);
    animateArrayUpdate(animations);
  }

  function quickSort() {
    const animations = animateQuickSort(arr);
    animateArrayUpdate(animations);
  }

  function animateArrayUpdate(animations) {
    if (isSorting) return;
    setIsSorting(true);
    animations.forEach(([comparison, swapped], index) => {
      setTimeout(() => {
        if (!swapped) {
          if (comparison.length === 2) {
            const [i, j] = comparison;
            animateArrayAccess(i);
            animateArrayAccess(j);
          } else {
            const [i] = comparison;
            animateArrayAccess(i);
          }
        } else {
          setArr((prevArr) => {
            const [k, newValue] = comparison;
            const newArr = [...prevArr];
            newArr[k] = newValue;
            return newArr;
          });
        }
      }, index * delay );
    });
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * delay );
  }

  function animateArrayAccess(index) {
    const arrayBars = containerRef.current.children;
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = accessedColor;
    }, delay );
    setTimeout(() => {
      arrayBarStyle.backgroundColor = '';
    }, delay  * 2);
  }

  function animateSortedArray() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = sortedColor ),
        i * delay ,
      );
    }
    setTimeout(() => {
      setIsSorted(true);
      setIsSorting(false);
    }, arrayBars.length * delay );
  }

  function resetArrayColour() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arr.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      arrayBarStyle.backgroundColor = '';
    }
  }

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[randomIndex];
      arr[randomIndex] = temp;
    }
  };

  return (
    <div className="visualizer-container">
      <div className="array-container" ref={containerRef}>
        {arr.map((barHeight, index) => (
          <div
            className="array-bar"
            style={{
              height: `${barHeight}vmin`,
              width: `${100 / arrayLength}vw`,
            }}
            key={index}
          ></div>
        ))}
      </div>
      <footer className="app-footer">
        <ul>
          <li>
            <button className="app-button" onClick={generateArray}>
              Generate Array
            </button>
          </li>
          <li>
            <button className="app-button" onClick={mergeSort}>
              Merge sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={insertionSort}>
              Insertion sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={quickSort}>
              Quick sort
            </button>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Visualizer;