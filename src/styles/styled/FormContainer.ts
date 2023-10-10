import { Box, styled } from '@mui/material';
import composeBackgroundColor from '../../utils/composeBackgroundColor';

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

  .image-preview {
    background: ${({ theme }) => composeBackgroundColor(theme, 2)};
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-right: 1em;
    margin-bottom: 1em;
  }
`;

export default FormContainer;
