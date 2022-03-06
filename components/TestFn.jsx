import React, { useEffect, useCallback, useRef, useState } from "react";
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

const useConstructor = (callBack = () => {}) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) return;
    callBack();
    hasBeenCalled.current = true;
  }

const TestFn = () =>  {
      const [isTalking, setIsTalking] = useState(false);

      useConstructor(() => {
        console.log( "useConstructor 실행 (initial render 전에 한번만 실행)");
      });

      useEffect(()=> {
        console.log( "isTalking useEffect 실행");
      }, [isTalking])

      useEffect(()=> {
        console.log( "[] useEffect 실행");
      }, [])

    return (
      <Container>
        {isTalking ? <Cat /> : <TalkingCat />}
        <button onClick={() => setIsTalking(!isTalking)}>function talking : {isTalking ? "true" : "false"}</button>
      </Container>
    );
}

export default TestFn;
