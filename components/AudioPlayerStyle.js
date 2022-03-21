import styled, { keyframes } from 'styled-components';

export const StyleAudioPlayer = styled.div`
  & {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0f2027; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2c5364, #203a43, #0f2027); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2c5364, #203a43, #0f2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  & .container {
    max-width: 350px;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 28px 28px rgba(0, 0, 0, 0.2);
    margin: auto;
    color: #ffc;
    background: #ccc; /* fallback for old browsers */
  }

  & .artwork {
    width: 200px;
    height: 200px;
    transition: 1s linear;
  }
`;

export const TrackInfo = styled.div`
  text-align: center;
  z-index: 1;
  position: relative;
`;

export const Title = styled.h2`
  font-weight: 700;
  margin-bottom: 4px;
`;

export const Artist = styled.h3`
  font-weight: 300;
  margin-top: 0;
`;
