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
                    text: 'asdasdasdasd',
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
    }
    addText(text) {
        console.log('hey!');
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
    render() {
        return (
            <div className="container">
                <FormattedMessage {...messages.header} />
                <ChatBox messages={this.state.messages} action={this.addText} />
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
