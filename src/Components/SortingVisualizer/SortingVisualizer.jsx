import React from 'react';
import './SortingVisualizer.css';
import { Button } from "./Button.style"
import { BubbleSort, InsertionSort, MergeSort, QuickSort} from './Algorithims';


const MAXBARS = window.innerWidth/5.55

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      numBars: MAXBARS,
      barOne: -1,
      barTwo: -1,
      isSorting: false,
      isSorted: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    const height = window.innerHeight
    // randomizes height of bars for sorting
    for (let i = 0; i < this.state.numBars; i++) {
      array.push(Math.floor((Math.random()*0.8*height))+5);
    }
    this.setState({array, isSorted: false});
  }
  // event handler to update the state of numBars once new value is obtained from the slider
  handleSliderChange = event => {
    this.setState({ numBars: event.target.value }, () => {
      this.resetArray();
  })}


  // these async functions serve as initializers before the sorting process

  async BubbleSort() {
    this.setState({isSorting: true});
    await BubbleSort(this.state.array, this.setState.bind(this));
    this.setState({isSorting: false, isSorted: true});
  }
  
  async InsertionSort(){
    this.setState({isSorting: true});
    await InsertionSort(this.state.array, this.setState.bind(this));
    this.setState({isSorting: false, isSorted: true});
  }

  async QuickSort() {
    this.setState({isSorting: true});
    await QuickSort(this.state.array, 0, this.state.array.length - 1, this.setState.bind(this));
  }
 
 
MergeSort() {
    const animations = MergeSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('arrayBar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? 'red' : 'black';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 10);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 10);
      }
    }
  }

  
  render() {
    const {array} = this.state;

    return (
      <div className="array-container" style={{width: `${window.innerWidth}px`}}>
        {array.map((value, index) => (
            <div 
            className={`arrayBar ${index === this.state.barOne || index === this.state.barTwo ? 'comparing' : ''} ${this.state.isSorted ? 'sorted' : ''}`}
            key={index}
            style={{ height: `${value}px` }}
          >
          </div>
        ))}
        <div className="button-container" style={{width: `${window.innerWidth}px`, postion:"fixed"}}>
        <Button onClick={() => this.resetArray()}>Make New Array!</Button>
        <Button onClick={() => this.InsertionSort()} disabled={this.state.isSorting}>Insertion Sort</Button>
        <Button onClick={() => this.QuickSort()} disabled={this.state.isSorting}>Quick Sort</Button>
        <Button onClick={() => this.MergeSort()} disabled={this.state.isSorting}>Merge Sort</Button>
        <Button onClick={() => this.BubbleSort()} disabled={this.state.isSorting}>Bubble Sort</Button>
        </div>
        <label for="myRange" style={{display:"inline-block", fontFamily : 'sans-serif', fontSize: "23px", verticalAlign: "bottom"}} class="label">Change Number of Bars </label> 
        <div className="Slider-Container" style={{height: "50px"}}>
        <input type="range" id="myRange" min="10" max={`${MAXBARS}`} style={{margin: '5px'}} value={this.state.numBars} onChange={this.handleSliderChange} class="slider"></input>
        </div>
      </div>
    )}
  }





