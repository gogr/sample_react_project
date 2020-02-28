import React, { Component } from 'react';
import './Chat.css';
import ChatPost from './ChatPost';
import SendIcon from '../../components/Icons/SendIcon';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: {
        client : {
          id: "client",
          username: "client",
          real_name: "",
          verified: false
        }
      },
      posts: [],
      status: 'Loading Chat ...',
      postsBusy : true,
      formBusy : false,
      maxPostChars : 140,
      remainingPostChars : 140
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(
        users => {
          // make users addressable by their user id ...
          let usersById = this.state.users;
          users.map(user => {usersById[user.id] = user; return true;})
          this.setState({ users : usersById })
        }
      )
    fetch('/api/posts')
      .then(res => res.json())
      .then(
        posts => this.setState({
          posts : posts,
          status: 'READY!',
          postsBusy: false
        })
      )
  }

  getUserDataByID(userID) {

    if(!this.state.users[userID])
      return null;

    let userData = this.state.users[userID];
    // srcet options would be good here ...
    userData.profileImgSrc = '/media/users/' + userData.username + '.jpg';
    // alt profile image description probably detrimental to screenreaders in this context
    userData.profileImgAlt = '';

    return userData;

  }

  remainingChars = (event) => {
    let remainingChars = this.state.maxPostChars - event.target.value.length;
    this.setState({remainingPostChars: remainingChars});
  }

  scrollToBottom = () => {
    this.refs.chatList.scrollTop = this.refs.chatList.scrollHeight;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({formBusy: true});

    let ts = Date.now() / 1000;
    let newPost = {
      "id": ts,
      "user": 'client',
      "message": this.refs.chatInput.value,
      "ts": ts
    };

    fetch('/api/posts', {
      method: 'post',
      body: JSON.stringify(newPost),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(res => {
      console.log('res', res);
      let newPosts = this.state.posts;
      newPosts.push(newPost);
      this.setState({
        posts: newPosts,
        formBusy: false
      });
      this.refs.chatInput.value = "";
      // maybe forcing focus is a bit much ...
      this.refs.chatInput.focus();
    });

    return false;
  }

  render() {
    return (
      <form
        className="chat" aria-label="Web Chat"
        aria-busy={this.state.formBusy}
        onSubmit={this.handleSubmit} >
        <a href="#chatInput" className="ui_showto-focus" role="button">skip to chat input</a>
        {
          this.state.postsBusy ? (
          <div className="chat-status" role="status" aria-live="polite">
            {this.state.status}
          </div>
          ) : null
        }
        <ul
          className="chat-list"
          aria-label="Chat Log"
          aria-busy={this.state.postsBusy ? "true" : "false"}
          aria-hidden={this.state.postsBusy ? "true" : "false"}
          tabIndex="0"
          ref="chatList"
        >
        {this.state.posts.map(post =>
          <ChatPost
            key={post.id}
            postData={post}
            userData={this.getUserDataByID(post.user)}
            scrollToBottom={this.scrollToBottom}
          />
        )}
        </ul>

        <div className="chat-input-wrap">
          <label htmlFor="chatInput">
            <span className="ui_inclusively-hidden">Chat Input : </span>
            <span className="chat-input-charCount-wrap" aria-live="polite">
              <span className="chat-input-charCount ui_text-small" >{this.state.remainingPostChars}</span>
              <span className="ui_inclusively-hidden">characters remaining</span>
            </span>
          </label>
          <input
            id="chatInput" className="chat-input" type="text" placeholder="what's happening?" maxLength={this.state.maxPostChars} autoComplete="off" required
            ref="chatInput"
            onKeyUp={this.remainingChars}
            disabled={this.state.formBusy}
            />
          <button id="chatSubmit" className="chat-submit" type="submit" disabled={this.state.formBusy}>
            <SendIcon className="chat-submit-icon" />
            <span className="ui_inclusively-hidden">submit</span>
          </button>
        </div>

      </form>
    );
  }
}

export default Chat;
