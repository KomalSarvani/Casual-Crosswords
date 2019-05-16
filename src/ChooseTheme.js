import React from 'react';
import {Row, Col, Carousel} from "react-bootstrap";
import dies from "./images/dies.png";
import vesperum from "./images/vesperum.png";
import noctis from "./images/noctis.png";
import {LoadPuzzle} from "./LoadPuzzle";

export class ChooseTheme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dayTheme: false,
            eveningTheme: false,
            nightTheme: false
        };
        this.handleDies = this.handleDies.bind(this);
        this.handleVesperum = this.handleVesperum.bind(this);
        this.handleNoctis = this.handleNoctis.bind(this);
    }

    handleDies() {
        this.setState({
            dayTheme: true,
        });
        localStorage.setItem("Theme","Dies");
    }
    handleVesperum() {
        this.setState({
            eveningTheme: true,
        });
        localStorage.setItem("Theme","Vesperum");
    }
    handleNoctis() {
        this.setState({
            nightTheme: true,
        });
        localStorage.setItem("Theme","Noctis");
    }

    renderCarousel(){
        return(<Carousel className={"col-md-10 carousel"} interval={2000}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={dies}
                    alt="Dies Theme"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={vesperum}
                    alt="Vesperum Theme"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={noctis}
                    alt="Noctis Theme"
                />
            </Carousel.Item>
        </Carousel>);
    }

    render() {
        const currentTheme = localStorage.getItem("Theme");

        if(currentTheme){
            return(<LoadPuzzle theme={currentTheme}/>);
        }

        return (
            <div>
                <Row className="row-bg">
                    <Col md={8} className="crosswordImg">
                            <h3 className="display-4 app-title col-md-3">Casual Crosswords</h3>
                    </Col>
                    <Col md={4} className="welcome">
                        <Col className={"hehehe"}>
                        <p className={"container text-center"}>
                            Hello and Welcome to Casual Crosswords!
                            Choose a theme to get started on today's New York Times Crossword Puzzle!
                        </p>
                    </Col>
                        <button className="theme btn btn-outline-light" onClick={this.handleDies}>Dies</button>
                        <button className="theme btn btn-outline-light" onClick={this.handleVesperum}>Vesperum</button>
                        <button className="theme btn btn-outline-light" onClick={this.handleNoctis}>Noctis</button>
                        <Row className={"justify-content-center"}>
                            {this.renderCarousel()}
                        </Row>
                        <h4 className={"text-center"}>
                            Happy Solving!
                        </h4>
                    </Col>
                </Row>
            </div>
        );
    }
}
