import React from 'react';
import "./SortingVisualiser.css";
import getMergeSortAnimations from "../../helpers/sortingAlgorithms.js"
import playNote from "../../helpers/sound.js"

class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            speed: 1
        }
    }




    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 250; i++) {
            array.push(randomIntFromInterval(5, 800));
        }
        this.setState({ 'array':array, 'speed':this.state.speed });
    }

    sortArray() {
        const animations = getMergeSortAnimations(this.state.array);
        const newAnimations = [];
        for (const animation of animations) {
            newAnimations.push(animation);

        }

        for (let i = 0; i < newAnimations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = newAnimations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? "red" : "green";
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    playNote(barOneIdx * 10, 1 * this.state.speed)

                }, i * this.state.speed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = newAnimations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    playNote(barOneIdx * 10, 1 * this.state.speed)
                }, i * this.state.speed);
            }
        }
    }

    render() {
        const array = this.state.array;
        return (
            <>
                <div className="array-container">
                    {array.map((value, index) => (
                        <div
                            className="array-bar"
                            key={index}
                            tone={value}
                            style={{ height: `${value}px` }}
                        >
                        </div>
                    ))}
                </div>
                <div className="button-container">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.sortArray()}>Sort</button>
                    <div>
                        <input onChange={(e) => this.setState({speed:e.target.value})} type="range" id="speed" name="speed"
                                min="1" max="10" value={this.state.speed}></input>
                        <label>Speed</label>
                    </div>
                    {this.state.speed}
                </div>
            </>
        )
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/* function arraysAreEqual(array1, array2){
    if(array1.length !== array2.length){
        return false;
    }
    for(let i=0; i<array1.length; i++){
        if(array1[i] !== array2[i]){
            return false;
        }
    }
    return true;
} */


export default SortingVisualiser;