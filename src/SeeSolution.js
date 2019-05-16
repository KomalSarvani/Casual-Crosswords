import React from 'react';
import {Modal, Table} from "react-bootstrap";
export class SeeSolution extends React.Component {
    actualSolutions;

    constructor(props, context) {
        super(props, context);
        this.state = {
            lgShow: false,
        };
    }

    renderTheme(){
        if (this.props.theme === 'Dies' || this.props.theme === 'Vesperum') {
            return "btn btn-outline-dark";
        } else if(this.props.theme === 'Noctis') {
            return "btn btn-outline-light";
        }
    }


    renderSolution(width){
        let final = [];
        let temp = [];
        let gridnums = this.props.actualSolutions['gridnums'];
        let grid = this.props.actualSolutions['grid'];
        for (let i = 0; i < width; i++) {
            temp = gridnums.slice(width * i, width * (i + 1));

            let temp3 = temp.map((letter, index) =>
                (grid[index + width*i] === '.') ?
                    <td className={"border border-dark blackCell"}>
                        <div></div>
                    </td>
                    :
                    <td className={"border border-dark eachcell"} id={index + width*i} >
                        <div className="wordNum"><strong>{letter === 0 ? '\u00A0' : letter}</strong></div>
                        <div id={index + width*i} className="font-weight-bold text-center">{grid[index + width*i]}</div>
                    </td>
            );
            const temp2 = <tr className="border border-dark" >{temp3}</tr>;
            final = final.concat(temp2);
        }

        return(
        <Table bordered className="border border-dark" size="sm">
            <tbody className="border border-dark">{final}</tbody>
        </Table>
        );
    }
    render() {
        let lgClose = () => this.setState({ lgShow: false });

        return (
            <React.Fragment>
                <button className={this.renderTheme() + " crosscheck"}
                        onClick={() => this.setState({ lgShow: true })}>See Solution!
                </button>

                <Modal
                    size="lg"
                    show={this.state.lgShow}
                    onHide={lgClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Solutions for Today's Puzzle
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.renderSolution(15)}</Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}


