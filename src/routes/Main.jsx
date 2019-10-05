import React, { PureComponent } from 'react';
import Navbar from 'components/navbar';

class Main extends PureComponent {
  render() {
    return (
      <div>
        <Navbar />
        Hello world
      </div>
    );
  }
}

export default Main;
