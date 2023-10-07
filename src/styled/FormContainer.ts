import { Box, styled } from '@mui/material';
import composeBackgroundColor from '../utils/composeBackgroundColor';

const FormContainer = styled(Box)`
  background-color: ${({ theme }) => composeBackgroundColor(theme)};
  border-radius: 1em;

  form {
    padding: 2em;
  }

  .section {
    display: flex;
    flex-direction: column;
  }
`;

export default FormContainer;
