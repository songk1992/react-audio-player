import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const talk = keyframes`
0% {background-image: url('/Sprite0001.png');}
40% {background-image: url('/Sprite0002.png');}
60% {background-image: url('/Sprite0003.png');}
80% {background-image: url('/Sprite0002.png');}
100% {background-image: url('/Sprite0001.png');}
`;

const Cat = styled.div`
  width: 300px;
  height: 300px;
  background-size: cover;
  animation: ${talk} 2s linear infinite;
`;
const TalkingCat = styled.div`
  width: 300px;
  height: 300px;
  background-size: cover;
  background-image: url('/Sprite0001.png');
`;
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #ecce;
`;

export default class TestCl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTalking: false,
    };
    console.log( "생성자 한번만 실행");
  }

  render = () => {
    return (
      <Container>
        {this.state.isTalking ? <Cat /> : <TalkingCat />}
        
        <button
          onClick={() =>
            this.setState((prevState) => {
              return { isTalking: !prevState.isTalking };
            })
          }
        >
          class talking: {this.state.isTalking ? "true" : "false"}
        </button>
      </Container>
    );
  };
}
