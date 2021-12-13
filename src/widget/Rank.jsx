import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import 'Source/less/rank.less';

const LEVEL_MAX = 5;

const Rank = props => {
    const [level, setLevel] = useState(0);

    // 相似於 componentDidMount 和 componentDidUpdate
    useEffect(() => {
        const { value } = props;

        setLevel(value);
    });

    const renderContainer = () => {
        let container = [];
        for (let i = 2; i <= LEVEL_MAX; i++) {
            container.push(<div className={`lv-${i}`} />);
        }

        return container;
    }

    const renderLevel = (level) => {
        return <div className={`value-${level}`} />
    }

    return <div className="rank">
        {renderContainer()}
        {renderLevel(level)}
    </div>
}

Rank.propTypes = {
    value: PropTypes.number
}

export default Rank;