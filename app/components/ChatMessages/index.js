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
                if (element.from === 'bot') {
                    return (
                        <div className="message new" key={element.id}>
                            <figure className="avatar">
                                <img src={Avatar} alt="Bot's Avatar" />
                            </figure>
                            {element.text} <br />
                            {Object.prototype.hasOwnProperty.call(
                                element,
                                'button',
                            ) &&
                                element.button.map(button => (
                                    <span>
                                        <button
                                            className="btn btn-xs btn-primary"
                                            key={button.id}
                                            onClick={e => {
                                                props.onHandleClick(e);
                                            }}
                                        >
                                            {button.text}
                                        </button>&nbsp;
                                    </span>
                                ))}
                            {/* this is breaking point of button group or separated button */}
                            {Object.prototype.hasOwnProperty.call(
                                element,
                                'button',
                            ) && (
                                <span>
                                    <br />
                                    <br />
                                    <div className="btn-group">
                                        {element.button.map(button => (
                                            <button
                                                className="btn btn-xs btn-primary"
                                                key={button.id}
                                                onClick={e => {
                                                    props.onHandleClick(e);
                                                }}
                                            >
                                                {button.text}
                                            </button>
                                        ))}
                                    </div>
                                </span>
                            )}
                            <div className="timestamp">
                                {formatDate(element.timestamp)}
                            </div>
                        </div>
                    );
                } else if (element.isFile) {
                    return (
                        <div
                            className="message message-personal new"
                            key={element.id}
                        >
                            <img src={element.url} alt="Sent images" />
                        </div>
                    );
                }
                return (
                    <div
                        className="message message-personal new"
                        key={element.id}
                    >
                        {element.text}
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
