import React, { PureComponent } from 'react';
import './Main.scss';

class Main extends PureComponent {
  render() {
    return (
      <div>
        <div className="container">
          <div className="hero is-fullheight-with-navbar">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">Fullheight title</h1>
                <h2 className="subtitle">Fullheight subtitle</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
