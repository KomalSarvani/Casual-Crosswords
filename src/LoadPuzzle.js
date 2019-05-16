import React from 'react';
import {RenderPuzzle} from "./RenderPuzzle.js";

export class LoadPuzzle extends React.Component {
    theme;

    constructor(props) {
        super(props);
        this.state = {
            puzzle: [],
            puzzleFetched: false
        };
    }


    componentDidMount() {
        this.fetchCrossword();
    }

    fetchCrossword() {
        fetch('https://cors-anywhere.herokuapp.com/https://www.xwordinfo.com/JSON/Data.aspx?format=text')
            .then(response => response.json())
            .then(data =>
                this.setState({
                    puzzle: data,
                    puzzleFetched: true
                })
            )
            .catch(error => console.error(error));
    }

    render(){
            if(this.state.puzzleFetched) {
                return(
                <div>
                    <RenderPuzzle crossword={this.state.puzzle} theme={this.props.theme}/>
                </div>
                );
            } else {
                return(
                    <div>
                    </div>
                );
            }
    }
}