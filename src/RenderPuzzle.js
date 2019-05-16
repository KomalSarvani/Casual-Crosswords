import React from 'react';
import {Col,Row, Table} from "react-bootstrap";
import {SubmitCrossword} from "./SubmitCrossword";

export class RenderPuzzle extends React.Component {
    crossword;
    theme;

    constructor(props) {
        super(props);


        this.state = {
            answers: new Array((new Date()).getDay() === 0 ? 441 : 225).fill("."),
            solutions: this.props.crossword
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (index, evt) {
        const { answers } = this.state;
        answers.splice(index, 1, evt.target.value);
        localStorage.setItem(index, evt.target.value);
        this.setState({ answers: [...answers] });
    }

    renderHeader(){
        return(
            <div className={"text-center header"}>
                <h1><strong> The New York Times Crossword </strong></h1>
                <h3><strong> {this.props.crossword['title']}</strong></h3>
                <h5><strong> Author : {this.props.crossword['author']} </strong></h5>
                <h5><strong>Editor : {this.props.crossword['editor']} </strong></h5>
            </div>)
    }

    renderTheme1(){
        let dayMode = {
            color: 'black',
            backgroundColor: '#FFEBCD'
        };

        let eveningMode = {
            color: 'black',
            backgroundColor: '#FFDBA5'
        };

        let nightMode = {
            color: '#FFE9CD',
            backgroundColor: '#242124'
        };

        if (this.props.theme === 'Dies') {
            return dayMode;
        } else if (this.props.theme === 'Vesperum'){
            return eveningMode;
        } else if(this.props.theme === 'Noctis') {
            return nightMode;
        }
    }

    renderTheme2(){
        let dayMode = {
            backgroundColor: 'black'
        };

        let eveningMode = {
            backgroundColor: 'black'
        };

        let nightMode = {
            backgroundColor: '#FFE9CD'
        };

        if (this.props.theme === 'Dies') {
            return dayMode;
        } else if (this.props.theme === 'Vesperum'){
            return eveningMode;
        } else if(this.props.theme === 'Noctis') {
            return nightMode;
        }
    }

    renderTheme3(){
        let dayMode = {
            color: 'black',
            backgroundColor: '#F9DDC5'
        };

        let eveningMode = {
            color: 'black',
            backgroundColor: '#F7BE8D'
        };

        let nightMode = {
            color: '#FFE9CD',
            backgroundColor: '#656365'
        };

        if (this.props.theme === 'Dies') {
            return dayMode;
        } else if (this.props.theme === 'Vesperum'){
            return eveningMode;
        } else if(this.props.theme === 'Noctis') {
            return nightMode;
        }
    }

    renderTheme4(){
        if (this.props.theme === 'Dies' || this.props.theme === 'Vesperum') {
            return "border border-dark";
        } else if(this.props.theme === 'Noctis') {
            return "border border-light";
        }
    }


    renderAcross(){
        const across = this.props.crossword['clues']['across'];

        const acrossClues = across.map((across) =>
            <span>{across.replace(/&quot;/g,'"')}<br/></span>
        );

        return(
            <div className="acrosslist" style={this.renderTheme3()}>
                <h6 className="text-center across"> ACROSS </h6>
            <div>{acrossClues}</div>
            </div>
        );
    }

    renderDown() {
        const down = this.props.crossword['clues']['down'];

        const downClues = down.map((down) =>
            <span>{down.replace(/&quot;/g, '"')}<br/></span>
        );



        return(
            <div className="acrosslist" style={this.renderTheme3()}>
                <h6 className="text-center"> DOWN </h6>
            <div>{downClues}</div>
            </div>
        );
    }


    renderTable(width){
        const gridnums = this.props.crossword['gridnums'];
        const grid = this.props.crossword['grid'];
        let final = [];
        let temp = [];
            for (let i = 0; i < width; i++) {
                temp = gridnums.slice(width * i, width * (i + 1));

                let temp3 = temp.map((letter, index) =>
                    (grid[index + width*i] === '.') ?
                        <td className={this.renderTheme4()} style={this.renderTheme2()}>
                            <div></div>
                        </td>
                        :
                        <td className={this.renderTheme4()+ " eachcell"} id={index + width*i} >
                            <div className="wordNum" style={this.renderTheme1()}><strong>{letter === 0 ? '\u00A0' : letter}</strong></div>
                            <input id={index + width*i} style={this.renderTheme1()}
                                   maxLength={1}
                                   className="input-group border-0 font-weight-bold text-center"
                                   value={localStorage.getItem(index + width*i)}
                                   onChange={(evt) => this.handleChange(index + width*i,evt)}/>
                        </td>
                );
                const temp2 = <tr className={this.renderTheme4()}>{temp3}</tr>;
                final = final.concat(temp2);
            }

        return (
            <div className="crossword">
                {this.renderHeader()}
                <Row fluid="true">
                    <Col className={"clues"}>
                        {this.renderAcross()}
                    </Col>
                    <Col md={6} className="md-flex justify-content-md-center">
                        <Table bordered size="sm" className={this.renderTheme4()}>
                            <tbody className={this.renderTheme4()}>{final}</tbody>
                        </Table>
                    </Col>
                    <Col className={"clues"}>
                        {this.renderDown()}
                    </Col>
                </Row>
                <Row>
                    <SubmitCrossword actualSolutions={this.state.solutions} theme={this.props.theme}/>
                </Row>

            </div>
        );
    }

    render(){
        const dateStarted = localStorage.getItem("Date");
        if(dateStarted !== (new Date()).getDate().toString()){
            localStorage.clear()
        }

        return(
            <div style={this.renderTheme1()}>
                {localStorage.setItem("Date",(new Date()).getDate().toString())}
                {(new Date()).getDay() === 0 ? this.renderTable(21) :this.renderTable(15)}
            </div>
        );
    }
}
