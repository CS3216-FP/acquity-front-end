import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { connect } from 'react-redux';

import Socket from './socketService';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500]
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  textField: {
    marginTop: theme.spacing(1)
  }
}));

const UserChatInput = ({ chatRoomId }) => {
  const classes = useStyles();
  const [value, setValues] = React.useState('');

  const handleChange = () => event => {
    setValues(event.target.value);
  };

  return (
    <div>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Brandon">{'Brandon'.match(/\b(\w)/g).join('')}</Avatar>
          </ListItemAvatar>
          <TextField
            id="chat-input"
            multiline
            rowsMax="6"
            value={value}
            className={classes.textField}
            onChange={handleChange()}
            placeholder="Write a message..."
            fullWidth
            onKeyPress={ev => {
              if (!ev.ctrlKey && ev.key === 'Enter') {
                ev.preventDefault();
                Socket.sendNewMessage({
                  text: value.replace(/^\s+|\s+$/g, ''),
                  chatRoomId
                });
                setValues('');
              }
              if (ev.ctrlKey && ev.key === 'Enter') {
                setValues(`${value}\n`);
              }
            }}
          />
          <SendIcon
            className={classes.textField}
            onClick={() => {
              Socket.sendNewMessage({
                text: value.replace(/^\s+|\s+$/g, ''),
                chatRoomId
              });
              setValues('');
            }}
          />
        </ListItem>
      </List>
    </div>
  );
};

function matchStateToProps(state) {
  return {
    chatRoomId: state.chat.chat_room_id
  };
}

// eslint-disable-next-line no-unused-vars
function matchDispatchToProps(dispatch) {
  return {};
}

export default connect(
  matchStateToProps,
  matchDispatchToProps()
)(UserChatInput);
