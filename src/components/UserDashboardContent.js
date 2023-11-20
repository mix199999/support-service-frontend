import React from 'react';
import OptionBox from './OptionBox';
import styles from '../styles/adminContent.scss';
import {Container, Row, Col} from "react-bootstrap";

const UserDashboardContent = ({ numberOfOptions, optionText, onClick, backgroundImage }) => {
    const options = [];

    for (let i = 0; i < numberOfOptions; i++) {
        options.push(
            <OptionBox
                key={i}
                number={i + 1}
                text={optionText[i]}
                onClick={onClick[i]}
                backgroundImage={backgroundImage[i]}
            />
        );
    }

    return (
        <Container className={"admin-content-container"}>


            <div className="content-panel">
                {options}
            </div>


        </Container>
    );

};
export default UserDashboardContent;
