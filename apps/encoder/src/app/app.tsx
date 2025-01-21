import styled from '@emotion/styled';
import Encoder from './encoder';
import { ToastContainer } from 'react-toastify';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Encoder />
      <ToastContainer />
    </StyledApp>
  );
}

export default App;
