import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Banner = (props) => {
    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");

    useEffect(() => {
        let { name, secondName } = props;

        setName(name);
        setSecondName(secondName);
    });

    return <div className="banner">
        <div className="name-block">
            <div className="name">{name}</div>
            <div className="banner-separator"></div>
            <div className="second-name">{secondName}</div>
        </div>
        <div className="banner-rect"></div>
    </div>
}

Banner.propTypes = {
    name: PropTypes.string,
    secondName: PropTypes.string
}

export default Banner;