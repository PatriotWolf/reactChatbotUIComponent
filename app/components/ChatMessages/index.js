/**
 *
 * ChatMessages
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Avatar from 'images/robot01_90832.png';

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return `${date.getMonth() +
        1}/${date.getDate()}/${date.getFullYear()} ${strTime}`;
}

function ChatMessages(props) {
    return (
        <div className="messages-content container">
            {props.messages.map(element => {
                let content = null;

                if (element.isFile) {
                    content = <img src={element.url} alt="Sent images" />;
                } else {
                    content = element.text;
                }

                if (element.from === 'bot') {
                    window.responsiveVoice.speak(
                        element.text,
                        'US English Male',
                    );
                    return (
                        <div className="message new" key={element.id}>
                            <figure className="avatar">
                                <img src={Avatar} alt="Bot's Avatar" />
                            </figure>
                            {content}
                            <br />
                            {Object.prototype.hasOwnProperty.call(
                                element,
                                'button',
                            ) && (
                                <span>
                                    <div className="btn-group">
                                        {element.button.map(button => (
                                            <button
                                                className="btn btn-xs btn-primary"
                                                key={button.id}
                                                onClick={e => {
                                                    props.onHandleClick(
                                                        e,
                                                        element,
                                                    );
                                                }}
                                                disabled={
                                                    element.isButtonDisabled
                                                }
                                            >
                                                {button.text}
                                            </button>
                                        ))}
                                    </div>
                                    <br />
                                </span>
                            )}
                            <div className="timestamp">
                                {formatDate(element.timestamp)}
                            </div>
                            <button
                                className="text-white"
                                onClick={() => {
                                    props.onHandleDeleteMessage(element);
                                }}
                            >
                                <u>delete</u>
                            </button>
                        </div>
                    );
                }
                return (
                    <div
                        className="message message-personal new"
                        key={element.id}
                    >
                        {content}
                        <br />
                        <button
                            className="text-white"
                            onClick={() => {
                                props.onHandleDeleteMessage(element);
                            }}
                        >
                            <u>delete</u>
                        </button>
                        <div className="timestamp">
                            {formatDate(element.timestamp)}
                        </div>
                    </div>
                );
            })}
            <div className="message loading new">
                <figure className="avatar">
                    <img src={Avatar} alt="Bot's Avatar" />
                </figure>
                <span />
            </div>
        </div>
    );
}

ChatMessages.propTypes = {
    messages: PropTypes.array,
};

export default ChatMessages;
