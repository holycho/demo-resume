import React, { Component } from "react";
import PropTypes from 'prop-types';
import _ from "lodash";
import Banner from "Source/widget/Banner";
import Content from 'Source/components/Content';
import { getProfile, getSkill, getEducation, getCareer } from 'Source/utils';

// css
import 'Source/less/resume.less';
import 'Source/less/radio-group.less';
import 'Source/less/button.less';

class Resume extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            secondName: '',
            profile: null,
            work: [],
            skill: [],
            viewPaper: false
        };
    }

    componentDidMount() {
        const convertCareerFor = function (data) {
            let viewModel = [];
            if (data && data.work) {
                data.work.map((it, index) => {
                    let _positionList = [];
                    it.position.map(pos => {
                        _positionList.push({
                            duration: `${pos.begin} ～ ${pos.end}`,
                            desc: pos.workContent,
                            position: pos.name
                        });
                    });

                    let workItem = {
                        ...it,
                        timePoint: it.begin,
                        positionList: _positionList
                    };

                    viewModel.push(workItem);
                });
                viewModel.push({ timePoint: 2021 });
            }

            return viewModel;
        }

        const convertEducationFor = function (data) {
            return Object.keys(data).reduce((accumulator, currentValue) => {
                let _key = currentValue;
                let begin = _.get(data, `${_key}.begin`, undefined);
                let end = _.get(data, `${_key}.end`, undefined);
                let _duration = '';
                if (begin && end) {
                    _duration = `${begin} ～ ${end}`;
                } else {
                    if (begin) {
                        _duration = `${begin} 迄今`;
                    } else {
                        _duration = '--';
                    }
                }

                accumulator[_key] = {
                    ...data[_key],
                    duration: _duration
                };

                return accumulator;
            }, {});
        }

        Promise.all([
            getProfile(),  // index: 0
            getCareer(),   // index: 1
            getSkill(),    // index: 2
            getEducation() // index: 3
        ]).then(rawData => {
            // console.log("result: ", rawData);

            this.setState({
                name: '卓憲宗',
                secondName: 'Holy Cho',
                profile: !rawData[0] ? {} : rawData[0],
                work: convertCareerFor(rawData[1]),
                skill: _.get(rawData[2], "skill", []),
                education: convertEducationFor(rawData[3])
            });
        })
    }

    renderPaperSummary = () => {
        let _summary = [
            "根據歸納，有三個問題會影響到情境感知應用程式(Context-aware application)執行的可靠度，第一個問題是當情境感知應用程式執行時，因為缺陷所造成最終狀態的不可達，",
            "第二個問題是因為有限資源所造成促動器(Actuator)的超載使用，這將使得情境感知應用程式執行失敗或執行品質降低，",
            "第三個問題是當多個情境感知應用程式執行時，由於彼此資源搶奪可能會產生死結問題而導致情境感知應用程式無法達成使用者需求，但目前仍沒有完善的驗證機制用以避免上述問題，因此本論文將針對這三個問題提出相對應的解決方法。",
            "本論文為了分析上述問題，以服務品質需求觀點的品質驅動派翠網(Quality-driven Petri Net, QPN)來建立多個情境感知應用程式執行流程之模型，並根據QPN基礎提出一個驗證方法來驗證執行流程的可靠度，本方法是經由期望狀態的可達計算、超載偵測與死結的分析來驗證此模型的可靠度。",
            "本篇論文所開發的驗證器(Context-aware QPN-based Validator, CQV)可以提供使用者利用QPN來建立模型，進而驗證目前所有情境感知應用程式執行的可靠度，最後經由設計規畫，映射至實際例子來說明。"
        ]

        return (<div className={"cv-page animation"}>
            <span className="title">論文摘要</span>
            <div className="h-sep"></div>
            {_summary.map(line => {
                return <p className="cv-section">
                    <span className="cv-1st-letter">{line.slice(0, 1)}</span>{line.slice(1)}
                </p>
            })}
        </div>);
    }

    renderWorkExperience = () => {
        let _items = [
            {
                title: "【永洋科技 - 軟體工程師 任職 1年多】",
                experience: [
                    "為公司產品開發週邊應用軟體, 如備份程式、簡易安裝程式等，使用 C++(BCB) 開發，此外, 亦維護公司的研發日誌網站, 使用 ASP 開發。"
                ],
                comment: []
            },
            {
                title: "【大猩猩科技 - 軟體工程師/資深工程師 任職 2009 年 ~ 2021 年】",
                experience: [
                    "1. 於軟體工程師時期, 參與數位推播系統(Content Server)的開發, 負責用戶端程式(PublicScreen), 使用 C# WinForm 開發, 團隊為4人。",
                    "2. 參與電子看板推播系統(Digital Signage)與單機版排播程式(Ez Signage), 負責用戶端管理與播放程式, 使用 C# WinForm、WPF 開發, 團隊為2人。",
                    "3. 參與了監錄系統 iPlatform 開發, 負責用戶端管理模組與電視牆程式, 使用 C# WinForm 開發, 導入並實作 MVVM 的架構, 團隊為6人。與此同時, 逐步建立設計與開發文件、教學文件, 以利團隊降低教育訓練與長期維護系統的成本, 並於此階段升任資深工程師。",
                    "4. 參與了某專案監控系統的後台開發, 負責電視牆、電子地圖服務模組, 其他模組由本團隊同仁開發, 使用 Python 開發, 團隊為4人, 歷時3個月。",
                    "5. 參與了某專案監視系統的開發, 負責用戶端管理與電視牆播放程式 (CMSClient, TVWall), 使用 C# WinForm 開發, 團隊為 4~5 人。",
                    "6. 於 2018 年至 2021 年, 參與了監控系統 IVAR 的前端開發(IVAR Portal/VMS Portal), 分別使用 React 與 Express 作為前端與後台框架, 目前為公司的主要產品之一, 前端團隊為3~4人。"
                ],
                comment: [ "因涉及公司業務機密, 故皆以『某專案』帶過" ]
            }
        ]

        return (<div className="cv-page">
            <span className="title">工作經歷 - 細節描述</span>
            <div className="h-sep"></div>
            {_items.map(it => {
                return (<p className="cv-section">
                    <strong>{it.title}</strong>
                    <ul>
                        {it.experience.map(exp => {
                            return (<li className="cv-li">{exp}</li>);
                        })}
                    </ul>
                    <small>{it.comment && it.comment.length > 0 ? `* ${it.comment.join(',')}。` : ""}</small>
                </p>);
            })}
        </div>);
    }

    render() {
        return (<div>
            <Banner
                name={this.state.name}
                secondName={this.state.secondName} />
            <Content
                profile={this.state.profile}
                work={this.state.work}
                skill={this.state.skill}
                education={this.state.education} />
            <div className="cv-button" onClick={e => { this.setState({ viewPaper: !this.state.viewPaper }) }}>{this.state.viewPaper ? "隱藏論文摘要" : "檢視論文摘要"}</div>
            {this.state.viewPaper ? this.renderPaperSummary() : null}
            {this.renderWorkExperience()}
        </div>);
    }
}

Resume.propTypes = {

};

export default Resume;