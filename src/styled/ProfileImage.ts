import { styled } from '@mui/material';
import composeBackgroundColor from '../utils/composeBackgroundColor';

const ProfileImage = styled('img')`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: ${({ theme }) => composeBackgroundColor(theme)};
`;

export default ProfileImage;
