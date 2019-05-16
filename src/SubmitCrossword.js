import React from 'react';
import {Row, Col} from "react-bootstrap";
import woohoo from "./images/woohoo.jpg";
import tryAgain from "./images/try_again.jpg"
import {SeeSolution} from "./SeeSolution";
export class SubmitCrossword extends React.Component {

    actualSolutions;
    theme;

    constructor(props) {
        super(props);
        this.state = {
            won: false,
            submitted: false,
        };
    }

    renderTheme(){
        if (this.props.theme === 'Dies' || this.props.theme === 'Vesperum') {
            return "btn btn-outline-dark";
        } else if(this.props.theme === 'Noctis') {
            return "btn btn-outline-light";
        }
    }

    crossCheck() {
        this.setState({submitted: true});


        let correctGuesses = 0;
        for (let i = 0; i < 225; i++) {
            let playerResponse = localStorage.getItem(i.toString());
            if (playerResponse) {
                if (playerResponse.toUpperCase() !== this.props.actualSolutions['grid'][i]) {
                    break;
                }
            } else {
               correctGuesses++;
            }
        }
        if(correctGuesses > 150) {
            this.setState({won: true});
        }
    }

    rechooseTheme() {
        localStorage.removeItem("Theme");
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    render(){
        const {won, submitted} = this.state;
        return(
            <div className={"crosscheck"}>
            <Row>
                <Col md={4}>
            <button className={this.renderTheme() + " crosscheck"} onClick={() => this.crossCheck()}> Cross Check! </button>
                </Col>
                <Col md={4}>
                    <button className={this.renderTheme() + " crosscheck"} onClick={() => this.rechooseTheme()}> Rechoose Theme! </button>
                </Col>
                <Col md={4}>
                <SeeSolution actualSolutions={this.props.actualSolutions} theme={this.props.theme}/>
                </Col>
                <br/>
            </Row>
                {submitted ?
                    <Row className={"crosscheck"}>
                        {won ?
                            <div>
                                <img src={woohoo} className={"img-fluid"}
                                     alt={"Woohoo!! Nice work! See you tomorrow!"}/>
                            </div>
                            :
                            <div>
                                <img src={tryAgain} className={"img-fluid"} alt={"Nice work, try again tomorrow!"}/>
                            </div>
                        }
                    </Row>
                    :
                    <span> Check result here after clicking CrossCheck! </span>
                }
            </div>
        );
    }
}