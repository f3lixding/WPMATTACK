import React from 'react';
import styled from 'styled-components';

const MainDiv = styled.div`
  position: relative;
  min-width: 500px;
  max-width: 800px;
  margin: auto;
`;

const ReadyH3 = styled.h3`
  width:70%;
  margin: auto;
`;

const TestContentDiv = styled.div`
  margin: auto;
  width: 70%;
  height: 300px;
  overflow-y: hidden;
`;

const InputContentDiv = styled.div`
  margin: auto;
  height: 100px;
  width: 70%;
  overflow-y: hidden;
`;

const WordSpan = styled.span`
  font-family: 'Montserrat';
`;

const Highlight = styled(WordSpan)`
  color: blue;
`;

const WrongWord = styled(WordSpan)`
  color: red;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.playArea = React.createRef();
    this.state = {
      challenged: this.props.challenged,
      newWord: true,
      textArray: ['sample', 'texts', 'to', 'be', 'displayed', 'here'],
      inputArray: [],
      currentIndex: 0,
      incorrectIndices: new Set(),
      misstyped: 0,
      wordsTyped: 0,
    }
  }

  componentDidMount() {
    this.playArea.current.focus();
    if (this.state.challenged) {
      // make an api call here to retrieve the paragraph used by the challenger

    } else {
      // make an api call here for the server to generate a fake sentence to be typed
      fetch('/api/newparagraph', {
        method: 'GET',
        headers: {
          'Content-Type': 'text/html'
        }
      }).then((result) => {
        return result.text();
      }).then((text) => {
        const textArray = text.split(' ');
        this.setState({
          textArray: textArray
        })
      }).catch((err) => {
        console.log('error while fetching for new paragraph... ', err);
      });
    }
  }

  checkTypedContent(inputText) {
    // convert typed texts into array by splitting it by space
    // check every one of the elements against the textArray
    // return an array of int signifying the indices of the incorrectly typed words
    let res = new Set();
    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] !== this.state.textArray[i]) {
        res.add(i);
      }
    }
    return res;
  }

  handleKeyPressed(event) {
    const { textArray, inputArray, currentIndex, newWord } = this.state;
    if (event.key === ' ' && currentIndex < textArray.length) {
      let incorrectIndices = this.checkTypedContent(inputArray);
      this.setState({
        currentIndex: currentIndex + 1,
        incorrectIndices: incorrectIndices,
        newWord: true,
      });
    } else if (event.key === 'Backspace') {
      let options = {};
      let lastElement = inputArray.pop();
      if (lastElement === undefined) return;
      lastElement = lastElement.substring(0, lastElement.length - 1);
      if (lastElement.length) {
        inputArray.push(lastElement);
        options.currentIndex = newWord && currentIndex > 0 ? currentIndex - 1 : currentIndex;
        options.newWord = false;
      } else {
        options.currentIndex = currentIndex === 0 ? 0 : currentIndex;
        options.newWord = true;
      }
      options.inputArray = inputArray; 
      this.setState(options);
    } else if (event.key === 'Shift') {
      return;
    } else if (event.key.match(/^[a-z0-9\,\.]+$/i) && event.key.length === 1 && currentIndex < textArray.length) {
      let lastElement = !newWord ? inputArray.pop() : '';
      lastElement += event.key;
      inputArray.push(lastElement);
      this.setState({
        inputArray: inputArray,
        newWord: false,
      });
    } 
  }



  render() {
    const { textArray, inputArray, currentIndex, incorrectIndices, newWord } = this.state;
    return (
      <MainDiv>
        <h1>{currentIndex}</h1>
        <h1>{newWord ? 'new word' : 'not new word'}</h1>
        <TestContentDiv>
          {
            textArray.map((text, index) => {
              return (
              currentIndex === index ? <Highlight key={index}>{text} </Highlight> : <WordSpan key={index}>{text} </WordSpan> 
              );
            })
          }
        </TestContentDiv>
        <ReadyH3>Begin typing when you are ready...</ReadyH3>
        <InputContentDiv onKeyDown={ (event) => { this.handleKeyPressed(event) } } ref={this.playArea} tabIndex='0'>
          <div>
            {
              inputArray.map((word, index) => (
                incorrectIndices.has(index) ? <WrongWord key={index}>{word} </WrongWord> : <WordSpan key={index}>{word} </WordSpan>
              ))
            }
          </div>
        </InputContentDiv>
      </MainDiv>
    );
  }
}

export default App;