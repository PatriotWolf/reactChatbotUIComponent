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
            messages: [
                {
                    id: new Date().getTime(),
                    from: 'bot',
                    text: 'Hye there!! can I help you?',
                    isFile: false,
                    timestamp: new Date(),
                },
                {
                    id: new Date().getTime() + 1,
                    from: 'user',
                    text: 'Somebody!! Help!',
                    isFile: false,
                    timestamp: new Date(),
                },
                {
                    id: new Date().getTime() + 2,
                    from: 'bot',
                    text: 'But first, what you want to do?',
                    button: [
                        {
                            id: 0,
                            text: 'Sign-In',
                        },
                        {
                            id: 1,
                            text: 'Log-In',
                        },
                    ],
                    isButtonDisabled: false,
                    isFile: false,
                    timestamp: new Date(),
                },
            ],
            isTyping: false,
            text: '',
        };
        this.messagesEnd = null;
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.addBotReply = this.addBotReply.bind(this);
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
    addBotReply(response) {
        const newObj = {
            id: new Date().getTime(),
            from: 'bot',
            text: response.content,
            isFile: false,
            timestamp: new Date(),
        };
        setTimeout(() => {
            this.setState(prevState => ({
                messages: [...prevState.messages, newObj],
                isTyping: false,
            }));
            this.nameInput.focus();
        }, response.content.split(' ').length * (60000 / 50));
    }
    onHandleFileUpload(e) {
        const reader = new FileReader();
        let url;
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            url = reader.result;
            const newObj = {
                id: new Date().getTime(),
                from: 'user',
                url,
                isFile: true,
                timestamp: new Date(),
            };
            this.setState(prevState => ({
                messages: [...prevState.messages, newObj],
            }));
            this.scrollToBottom();
        };
    }
    onHandleClick(e, element) {
        let array = [...this.state.messages]; // make a separate copy of the array
        const index = array.indexOf(element);
        array[index].isButtonDisabled = true;
        const newObj = {
            id: new Date().getTime(),
            from: 'user',
            text: e.target.innerHTML,
            isFile: false,
            timestamp: new Date(),
        };
        this.props.messageUpdate(e.target.innerHTML, this.addBotReply);
        array = [...array, newObj];
        this.setState({
            messages: array,
            isTyping: true,
            text: '',
        });
        this.scrollToBottom();
    }
    onHandleKeyPress(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            const { text } = this.state;
            const newObj = {
                id: new Date().getTime(),
                from: 'user',
                text,
                isFile: false,
                timestamp: new Date(),
            };
            this.props.messageUpdate(text, this.addBotReply);
            this.setState(prevState => ({
                messages: [...prevState.messages, newObj],
                isTyping: true,
                text: '',
            }));
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
        const newObj = {
            id: new Date().getTime(),
            from: 'user',
            text,
            isFile: false,
            timestamp: new Date(),
        };
        this.props.messageUpdate(text, this.addBotReply);
        this.setState(prevState => ({
            messages: [...prevState.messages, newObj],
            isTyping: true,
            text: '',
        }));
        this.scrollToBottom();
    }
    onHandleDeleteMessage(arrayElement) {
        const array = [...this.state.messages]; // make a separate copy of the array
        const index = array.indexOf(arrayElement);
        array.splice(index, 1);
        this.setState({
            messages: array,
        });
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
                                messages={this.state.messages}
                                isTyping={this.state.isTyping}
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
                                    ref={input => {
                                        this.nameInput = input;
                                    }}
                                    value={this.state.text}
                                    onChange={this.onHandleChange}
                                    onKeyUp={this.onHandleKeyPress}
                                    disabled={this.state.isTyping}
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
                                        disabled={this.state.isTyping}
                                    />
                                </button>
                                <button
                                    type="submit"
                                    className="message-submit"
                                    disabled={this.state.isTyping}
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
    messageUpdate: PropTypes.func,
};

export default ChatBox;
