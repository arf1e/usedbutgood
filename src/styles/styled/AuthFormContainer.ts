import { Box, styled } from '@mui/material';
import composeBackgroundColor from '../../utils/composeBackgroundColor';

const AuthFormContainer = styled(Box)`
  background-color: ${({ theme }) => composeBackgroundColor(theme)};
  border-radius: 1em;

  form {
    padding: 2em;
    display: flex;
    flex-direction: column;
  }

  .section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .avatar {
    width: 80px;
    height: 80px;
    margin-left: 1em;
    object-fit: contain;
  }
`;

export default AuthFormContainer;
