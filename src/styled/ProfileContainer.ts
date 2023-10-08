import { Box, styled } from '@mui/material';
import composeBackgroundColor from '../utils/composeBackgroundColor';

const ProfileContainer = styled(Box)`
  margin-top: 4em;
  background-color: ${({ theme }) => composeBackgroundColor(theme)};
  border-radius: 1em;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default ProfileContainer;
