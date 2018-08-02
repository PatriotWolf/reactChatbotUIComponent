/**
 *
 * ChatBox
 *
 */

import React from 'react';
import Avatar from 'images/robot01_90832.png';
import ChatMessages from 'components/ChatMessages';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';
/* eslint-disable react/prefer-stateless-function */
class ChatBox extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            text: '',
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }
    onHandleChange(e) {
        this.setState({
            text: e.target.value
        });
    }
    onHandleSubmit(e) {
        e.preventDefault();
        const text = this.state.text;
        this.props.action(text);
        this.setState({
            text: '',
        });
    }
    render() {
        return (
            <div>
                <div className="ChatBox">

                    <div className="chat">
                        <div className="chat-title">
                            <h1>My Bot</h1>
                            <h2><FormattedMessage {...messages.header} /></h2>
                            <figure className="avatar">
                                <img src={Avatar} />
                            </figure>
                        </div>
                        <div className="messages">
                            <ChatMessages messages={this.props.messages}/>
                        </div>
                        <div className="message-box">
                        <form ref={el => this.myFormRef = el} className="" onSubmit={this.onHandleSubmit}>
                            <textarea type="text" className="message-input" placeholder="Type message..." value={this.state.text} onChange={this.onHandleChange}>
                            </textarea>
                            <button type="submit" className="message-submit">Send</button>
                        </form>
                        </div>
                    </div>
                </div>
                <div className="bg"></div>
            </div>
        );
    }
}

ChatBox.propTypes = {};

export default ChatBox;
