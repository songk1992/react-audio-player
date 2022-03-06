import TestCl from '../components/TestCl'
import TestFn from '../components/TestFn'
import React, { useState } from "react";
import styled from "styled-components";

const ChangeTestBtn = styled.button`
    width: 200px;
    height: 100px;
    z-index: 100;
    position: fixed;
    bottom: 100px;
    right: 100px;
`;

export default function Home() {

  const [isClass, setIsClass] = useState(false);

  return (

    <>
      {isClass ? <TestCl /> : <TestFn />}
      <ChangeTestBtn onClick={() => setIsClass(!isClass)}>function talking : {isClass ? "true" : "false"}</ChangeTestBtn>
    </>
  )
}
