/**
 *
 * ChatbotUserInterface
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ChatBox from 'components/ChatBox';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectChatbotUserInterface from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ChatbotUserInterface extends React.PureComponent {
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
        };
        const myAudio = new Audio(
            'http://66.90.93.122/ost/digimon-world-3/jlujtork/Main%20Lobby.mp3',
        );
        myAudio.addEventListener(
            'ended',
            function() {
                this.currentTime = 0;
                this.play();
            },
            false,
        );
        myAudio.play();
        this.addText = this.addText.bind(this);
        this.addImage = this.addImage.bind(this);
        this.removeMessages = this.removeMessages.bind(this);
        this.disableButton = this.disableButton.bind(this);
    }
    addText(text) {
        const newObj = {
            id: new Date().getTime(),
            from: 'user',
            text,
            isFile: false,
            timestamp: new Date(),
        };
        this.setState(prevState => ({
            messages: [...prevState.messages, newObj],
        }));
    }
    addImage(url) {
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
    }
    removeMessages(arrayElement) {
        const array = [...this.state.messages]; // make a separate copy of the array
        const index = array.indexOf(arrayElement);
        array.splice(index, 1);
        this.setState({
            messages: array,
        });
    }
    disableButton(element, newMessages) {
        const array = [...this.state.messages]; // make a separate copy of the array
        const index = array.indexOf(element);
        array[index].isButtonDisabled = true;
        this.setState({
            messages: array,
        });
        this.addText(newMessages);
    }
    render() {
        return (
            <div className="container">
                <FormattedMessage {...messages.header} />
                <ChatBox
                    messages={this.state.messages}
                    action={this.addText}
                    actionImage={this.addImage}
                    removeMessages={this.removeMessages}
                    disableButton={this.disableButton}
                />
            </div>
        );
    }
}

ChatbotUserInterface.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    chatbotuserinterface: makeSelectChatbotUserInterface(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'chatbotUserInterface', reducer });
const withSaga = injectSaga({ key: 'chatbotUserInterface', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ChatbotUserInterface);
