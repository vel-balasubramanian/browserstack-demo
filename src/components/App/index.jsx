import React, { Component } from 'react';
import axios from '../../services/axios';
import Header from '../Header';
import Footer from '../Footer';

import Shelf from '../Shelf/index';
import FloatCart from '../FloatChart/index';

class App extends Component {
  state = {
    is2G: null
  }

  componentDidMount() {
    const connection = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection;
    const is2gConnection = connection && connection.effectiveType && connection.effectiveType.indexOf('2g') >= 0 || false;
    this.setState({ is2G: is2gConnection });

    // Bug: failed request
    axios.get('/failed-request').catch((e) => console.log(e));

    // Initialize Bird Eats Bug widget
    (function() {
      const birdeatsbug = (window.birdeatsbug = window.birdeatsbug || []);
      if (birdeatsbug.initialize) return;
      if (birdeatsbug.invoked) {
        if (window.console && console.error) {
          console.error('birdeatsbug snippet included twice.');
        }
        return;
      }
      birdeatsbug.invoked = true;
      birdeatsbug.methods = [
        'setOptions',
        'trigger',
        'resumeSession',
        'takeScreenshot',
        'startRecording',
        'stopRecording',
        'stopSession',
        'uploadSession',
        'deleteSession'
      ];
      birdeatsbug.factory = function(method) {
        return function() {
          const args = Array.prototype.slice.call(arguments);
          args.unshift(method);
          birdeatsbug.push(args);
          return birdeatsbug;
        };
      };
      for (let i = 0; i < birdeatsbug.methods.length; i++) {
        const key = birdeatsbug.methods[i];
        birdeatsbug[key] = birdeatsbug.factory(key);
      }
      birdeatsbug.load = function() {
        const script = document.createElement('script');
        script.type = 'module';
        script.async = true;
        script.src = 'https://sdk.birdeatsbug.com/v2/core.js';
        const mountJsBefore = document.getElementsByTagName('script')[0] || document.body.firstChild;
        mountJsBefore.parentNode.insertBefore(script, mountJsBefore);
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = 'https://sdk.birdeatsbug.com/v2/style.css';
        const mountCssBefore = document.querySelector('link[rel="stylesheet"]') || mountJsBefore;
        mountCssBefore.parentNode.insertBefore(style, mountCssBefore);
      };
      birdeatsbug.load();
      window.birdeatsbug.setOptions(
        { 
          publicAppId: '',
          
        },
        {
          ui: {
            previewScreen: {
              /* either screenshot or screen recording needs to be provided */
              visualProof: 'required',
              /* screenshot button is hidden, but screen recording is shown */
              visualProofButtons: {
                screenshot: true,
                screenRecording: true,
              },
              /* email input needs to be filled */
              email: 'required',
              /* title input visible, but optional */
              title: 'required',
              /* description textarea not visible */
              description: true,
            },
          }
        }
      );
    })();
  }

  render() {
    const { is2G } = this.state;
    if(is2G === null) {
      return <></>;
    }

    if (is2G) {
      return (
        <div className="App">
          <Header />
          <main style={{padding: '50px 5%', margin: '0 auto', textAlign: 'center', height: '100vh'}}>
            <strong>Good news is we are online but bad news is you are on slow network</strong>
          </main>
          <Footer />
        </div>
      );
    }
    return (
      <div className="App">
        <Header />
        <main style={{padding: '20px 2%', margin: '0 auto'}}>
          <Shelf />
        </main>
        <FloatCart />
        <Footer />
      </div>
    );
  }
}

export default App;