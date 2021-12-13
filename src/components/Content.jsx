import React, { Component } from "react";
import PropTypes from 'prop-types';
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import myPhoto from 'Source/images/my-photo.jpg';
import { WorkBlock, SkillBlock, EducationBlock } from 'Source/widget/Block';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        fontSize: (props) => props.fontSize,
        margin: (props) => props.margin,
        color: (props) => props.color
    },
});

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            intro: null,
            email: '',
            phone: '',
            blog: '',
            work: [],
            skill: []
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps.profile) !== JSON.stringify(this.props.profile)) {
            const { profile } = this.props;

            this.setState({
                intro: profile ? profile.intro : '',
                email: profile ? profile.email : '',
                phone: profile ? profile.phone : '',
                blog: profile ? profile.blog : ''
            });
        }
    }

    renderLeftContent = () => {
        return (<div className="left">
            <div className="photo">
                <div className="image">
                    {/* <img width="100%" height="100%" src={myPhoto}></img> */}
                    <img width="100%" height="100%" src={`${window.location.href}api/thumbnail/holycho`} />
                </div>
                <div className="image-border"></div>
            </div>

            <AboutMe
                subject="關於我"
                intro={this.state.intro} />
            <ContactMe
                subject="聯繫我"
                email={this.state.email}
                phone={this.state.phone}
                blog={this.state.blog} />
        </div>);
    }

    renderRightContent = () => {
        return (<div className="right">
            <WorkBlock subject="工作經歷" work={this.props.work} />
            <SkillBlock subject="專長" skill={this.props.skill} />
            <EducationBlock subject="學歷" education={this.props.education} />
        </div>);
    }

    render() {
        return (<div className="content">
            {this.renderLeftContent()}
            <div className="sep" />
            {this.renderRightContent()}
        </div>);
    }
}

const AboutMe = props => {
    return (<div class="left-section">
        <span class="title">{props.subject}</span>
        <div class="h-sep"></div>
        <div class="intro">{props ? props.intro : ''}</div>
    </div>);
}

const ContactMe = props => {
    return (<div class="left-section">
        <span class="title">{props.subject}</span>
        <div class="h-sep"></div>
        {renderIcon(PhoneAndroidRoundedIcon, props.phone)}
        {renderIcon(MailOutlineRoundedIcon, props.email)}
        {renderIcon(DescriptionRoundedIcon, props.blog, true, "技術分享文章")}
    </div>);
}

const renderIcon = (
    Icon,
    info,
    isLink,
    linkName
) => {
    const classes = useStyles({ fontSize: 24, margin: 3, color: 'green' });

    return (<div>
        <div className="icon">
            <Icon className={classes.root} />
        </div>
        {!isLink ?
            <div class="contact-info">{info}</div>
            :
            <div class="contact-info"><a href={info} target="_blank">{linkName}</a></div>}
    </div>);
}

Content.propTypes = {
    profile: PropTypes.object,
    work: PropTypes.array,
    skill: PropTypes.array,
    education: PropTypes.object
}

export default Content;