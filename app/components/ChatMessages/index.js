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
    console.log(props.messages);
    return (
        <div className="messages-content container">
            {props.messages.map(element => {
                console.log(element);
                if (element.from === 'bot') {
                    return (
                        <div className="message new" key={element.id}>
                            <figure className="avatar">
                                <img src={Avatar} alt="Bot's Avatar" />
                            </figure>
                            {element.text}
                            <div className="timestamp">
                                {formatDate(element.timestamp)}
                            </div>
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
