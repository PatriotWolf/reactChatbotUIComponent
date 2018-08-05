/**
 *
 * ChatBox
 *
 */

import React from 'react';
import Avatar from 'images/robot01_90832.png';
import ChatMessages from 'components/ChatMessages';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';
/* eslint-disable react/prefer-stateless-function */
class ChatBox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
        this.messagesEnd = null;
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.onHandleFileUpload = this.onHandleFileUpload.bind(this);
        this.onHandleClick = this.onHandleClick.bind(this);
        this.onHandleKeyPress = this.onHandleKeyPress.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.onHandleDeleteMessage = this.onHandleDeleteMessage.bind(this);
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
    onHandleFileUpload(e) {
        const reader = new FileReader();
        let url;
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            url = reader.result;
            this.props.actionImage(url);
        };
    }
    onHandleClick(e, element) {
        this.props.disableButton(element, e.target.innerHTML);
        this.setState({
            text: '',
        });
        this.scrollToBottom();
    }
    onHandleKeyPress(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            const { text } = this.state;
            this.props.action(text);
            this.setState({
                text: '',
            });
            this.scrollToBottom();
        }
    }
    onHandleChange(e) {
        this.setState({
            text: e.target.value,
        });
    }
    onHandleSubmit(e) {
        e.preventDefault();
        const { text } = this.state;
        this.props.action(text);
        this.setState({
            text: '',
        });
        this.scrollToBottom();
    }
    onHandleDeleteMessage(index) {
        this.props.removeMessages(index);
    }
    render() {
        return (
            <div>
                <div className="ChatBox">
                    <div className="chat">
                        <div className="chat-title">
                            <h1>My Bot</h1>
                            <h2>
                                <FormattedMessage {...messages.header} />
                            </h2>
                            <figure className="avatar">
                                <img src={Avatar} alt="Bot's Avatar" />
                            </figure>
                        </div>
                        <div className="messages">
                            <ChatMessages
                                messages={this.props.messages}
                                onHandleClick={this.onHandleClick}
                                onHandleDeleteMessage={
                                    this.onHandleDeleteMessage
                                }
                            />
                            <div
                                style={{ float: 'left', clear: 'both' }}
                                ref={el => {
                                    this.messagesEnd = el;
                                }}
                            />
                        </div>
                        <div className="message-box">
                            <form className="" onSubmit={this.onHandleSubmit}>
                                <textarea
                                    type="text"
                                    className="message-input"
                                    placeholder="Type message..."
                                    value={this.state.text}
                                    onChange={this.onHandleChange}
                                    onKeyUp={this.onHandleKeyPress}
                                />
                                <button type="button" className="fileContainer">
                                    File
                                    <input
                                        type="file"
                                        className="input-pic"
                                        onChange={e =>
                                            this.onHandleFileUpload(e)
                                        }
                                        accept="image/*"
                                    />
                                </button>
                                <button
                                    type="submit"
                                    className="message-submit"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="bg" />
            </div>
        );
    }
}

ChatBox.propTypes = {
    action: PropTypes.func,
    actionImage: PropTypes.func,
    removeMessages: PropTypes.func,
    disableButton: PropTypes.func,
    messages: PropTypes.array,
};

export default ChatBox;
