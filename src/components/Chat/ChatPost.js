import React from 'react';
import TimeAgo from 'timeago-react';
import CalendarIcon from '../../components/Icons/CalendarIcon';
import BetterIcon from '../../components/Icons/BetterIcon';

class ChatPost extends React.Component {

  state = {
    animIn : false,
    showingBack : false
  };

  componentDidMount () {
    this.timeoutId = setTimeout(function () {
      this.setState({animIn: true});
      this.props.scrollToBottom();
    }.bind(this), 200);
  }

  componentWillUnmount () {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  toggleBackside = (event) => {
    this.setState({showingBack: ( this.state.showingBack ? false : true ) });
  }

  showBackside = (event) => {
    this.setState({showingBack: true});
  }
  hideBackside = (event) => {
    this.setState({showingBack: false});
  }

  timeStampToMS = (ts) => {
    return ts * 1000;
  }

  getClassName = () => {
    let theseClasses = ["chat-post"];
    if(this.state.animIn)
      theseClasses.push("anim-in");
    if(this.props.userData.id === "client")
      theseClasses.push("chat-post-fromClient");
    return theseClasses.join(" ");
  }

  render() {
    return (
      <li
        className={this.getClassName()}
        tabIndex="0"
        key={this.props.id}
      >
        <div className="chat-post-profileImg">
          <span className="chat-post-profileImg-media">
          {
            this.props.userData.id !== "client" ? (
              <img src={this.props.userData.profileImgSrc} alt={this.props.userData.profileImgAlt} />
            ) : (
              <BetterIcon />
            )
          }
          </span>
        </div>
        <div className="chat-post-body">
          <div className="chat-post-meta ui_flexwrap-edges ui_text-small">
            {
              this.props.userData.id !== "client" ? (
                <div className="chat-meta-user">
                  {this.props.userData.real_name} - @{this.props.userData.username}
                </div>
              ) : (
                <span className="ui_inclusively-hidden">you </span>
              )
            }
            <div className="chat-meta-timeAgo">
              <span className="ui_inclusively-hidden">posted </span>
              <TimeAgo
                datetime={this.timeStampToMS(this.props.postData.ts)}
              />
            </div>
          </div>
          <div
            className="chat-post-content"
            data-state-backside={this.state.showingBack ? 'show' : 'hide'}
            onTouchStart={this.showBackside} onTouchEnd={this.hideBackside}
            >
            <div className="chat-post-message">
              {this.props.postData.message}
            </div>
            <div className="chat-post-backside">
              <p><span className="chat-icon-calendar"><CalendarIcon /></span> active since July 13, 2017</p>
            </div>
          </div>
        </div>
      </li>
    );
  }

};

export default ChatPost;
