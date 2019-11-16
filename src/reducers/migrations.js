import { initialState as chatInitialState } from 'reducers/ChatDux';

const migrations = {
  0: _previousVersionState => ({ chat: chatInitialState }),
  1: _previousVersionState => ({ chat: chatInitialState }),
  2: _previousVersionState => ({ chat: chatInitialState })
};

export default migrations;
