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
        this.botReply = this.botReply.bind(this);
    }

    botReply(text, pushMessage) {
        fetch('http://13.76.181.19:8080/api/message', {
            method: 'post',
            body: JSON.stringify(text),
        })
            .then(response => response.json())
            .then(data => {
                pushMessage(data);
            });
    }

    render() {
        return (
            <div className="container">
                <FormattedMessage {...messages.header} />
                <ChatBox messageUpdate={this.botReply} />
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
