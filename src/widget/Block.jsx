import React, { Component, useState } from "react";
import PropTypes from 'prop-types';
import Rank from "Source/widget/Rank";

const SKILL_TITLE = ["略懂", "普通", "精通"];

const WorkBlock = props => {
    console.log('hl start rendering WorkBlock')
    if (!props.work) {
        return null;
    }

    const renderWork = (work, index) => {
        if (!work) {
            return null;
        }

        let thisYear = new Date().getFullYear();

        // only show the year
        if (!work.company) {
            return (<div className={`tp-${index + 1}`}>
                <div className={`${+work.timePoint === thisYear ? "this-" : ""}year`}>{work.timePoint}</div>
            </div>);
        }

        // show the position and description
        let positions = work.positionList.map((it, index) => {
            return {
                position: `${it.duration} | ${it.position}`,
                desc: it.desc
            }
        });
        
        let no = index + 1;
        let _list = [];
        _list.push(<div className={`tp-${no}`}>
            <div className={`${+work.timePoint === thisYear ? "this-" : ""}year`}>{work.timePoint}</div>
            <div className={`line${no}`} />
        </div>);
        _list.push(<CompanyCard
            clsName={`work${no}`}
            company={work.company}
            positionList={positions} />);
        
        return _list;
    }

    return (<div className="block">
        <span className="title">{props.subject}</span>
        <div className="h-sep" />
        <div className="timeline">
            <div className="time-bar" />
            {props.work.map((it, index) => {
                return renderWork(it, index);
            })}
        </div>
    </div>);
}

const CompanyCard = props => {
    let posList = [];
    props.positionList.map((it, index) => {
        posList.push(<div className="position">{it.position}</div>)
        posList.push(<div className="work-desc">{it.desc}</div>)
    });

    return (<div class={props.clsName}>
        <div className="circle"></div>
        <div className="company">{props.company}</div>
        {posList}
    </div>);
}

const SkillBlock = props => {
    if (!props.skill) return null;

    const renderSkillTitle = (options) => {
        let _titles = [];
        options.map((it, index) => {
            if (index === options.length - 1) {
                _titles.push(<div className="lv-name">{it}</div>);
            } else {
                _titles.push(<div className="lv-name">{it}</div>);
                _titles.push(<div className="lv-name-sep"></div>);
            }
        })

        return (<div className="skill-title">
            {_titles}
        </div>);
    }

    const renderSkillCard = skills => {
        if (!skills) {
            return null;
        }

        return skills.map((it, index) => {
            return (<SkillCard
                skillName={it.name}
                level={it.level} />);
        });
    }

    return (<div className="block">
        <span className="title">{props.subject}</span>
        <div className="h-sep" />
        {renderSkillTitle(SKILL_TITLE)}
        {renderSkillCard(props.skill)}
    </div>);
}

const SkillCard = props => {
    return (<div className="skill">
        <div className="skill-name">{props.skillName}</div>
        <Rank value={props.level} />
    </div>);
}

const EducationBlock = props => {
    if (!props.education) return null;
    const [viewmode, setViewmode] = useState('card');
    let { college, master } = props.education;

    const onRadioChange = e => {
        setViewmode(e.target.value);
    }

    const renderCardMode = () => {
        let _list = [];
        if (college) {
            _list.push(<EducationCard school={college.school} duration={college.duration} />);
        }
        _list.push(<div class="v-sep" />);
        _list.push(<div class="v-space" />);
        if (master) {
            _list.push(<EducationCard school={master.school} duration={master.duration} comment={master.paper} />);
        }

        return _list;
    }

    const onRadioClick = val => {
        setViewmode(val);
    }

    const renderTableMode = () => {
        let _list = [];

        _list.push(<div className="edu-section">
            <EducationTable college={college} master={master} />
        </div>);

        _list.push(<div className="edu-section">
            <div className="dot-2" />
            <div className="paper-title">{"論文名稱"}</div>
            <div className="edu-comment">{master.paper}</div>
        </div>);

        return _list;
    }

    return (<div className="block-200">
        <span className="title">{props.subject}</span>
        <div className="radio-group">
            <input className="radio-input" type="radio" id="viewmode-table" name="viewmode" value="table" checked={viewmode === "table"} onChange={onRadioChange} />
            <label className="radio-label">
                <span className="radio-button" onClick={e => { onRadioClick('table') }}></span>
                {"表格"}
            </label>
        </div>
        <div className="radio-group">
            <input className="radio-input" type="radio" id="viewmode-card" name="viewmode" value="card" checked={viewmode === "card"} onChange={onRadioChange} />
            <label className="radio-label">
                <span className="radio-button" onClick={e => { onRadioClick('card') }}></span>
                {"卡片"}
            </label>
        </div>

        <div className="h-sep" />
        {viewmode === "card" ? renderCardMode() : renderTableMode()}
    </div>);
}

const EducationCard = props => {
    return (<div className="edu">
        <div className="dot" />
        <div className="edu-title">{props.school}</div>
        <div className="edu-duration">{props.duration}</div>
        {props.comment ? <div class="edu-comment">{`論文名稱 : ${props.comment}`}</div> : null}
    </div>);
}

const EducationTable = props => {
    let { master, college } = props;

    return (<div className="edu-section">
        <table>
            <thead>
                <tr>
                    <td className="td-main-title" colSpan="2">{"大學"}</td><td className="td-main-title" colSpan="2">{"碩士"}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="td-sub-title">{"時間"}</td><td>{college.duration}</td><td className="td-sub-title">{"時間"}</td><td>{master.duration}</td>
                </tr>
                <tr>
                    <td className="td-sub-title">{"名稱"}</td><td>{college.school}</td><td className="td-sub-title">{"名稱"}</td><td>{master.school}</td>
                </tr>
            </tbody>
        </table>
    </div>);
}

export {
    WorkBlock,
    SkillBlock,
    EducationBlock
}