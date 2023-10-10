import { Box, styled } from '@mui/material';
import composeBackgroundColor from '../../utils/composeBackgroundColor';

const ImageryContainer = styled(Box)<{ blurred: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;

  .blurrable {
    transition: filter 0.2s;
    position: relative;
    filter: ${({ blurred }) => (blurred === 1 ? 'blur(50px)' : 'blur(0)')};
  }

  .disclaimer {
    position: absolute;
    top: 30%;
    left: calc(50% - 35%);
    display: flex;
    align-items: center;
    padding: 2em;
    border-radius: 1em;
    flex-direction: column;
    background-color: ${({ theme }) => composeBackgroundColor(theme)};
    box-shadow: ${({ theme }) => theme.shadows[1]};
    z-index: 1;
    width: 70%;
  }

  .image {
    width: 100%;
    min-width: 290px;
    object-fit: contain;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch' focusable='false' aria-hidden='true' viewBox='0 0 24 24' data-testid='ImageNotSupportedOutlinedIcon'%3E%3Cpath fill='white' d='m21.9 21.9-6.1-6.1-2.69-2.69L5 5 3.59 3.59 2.1 2.1.69 3.51 3 5.83V19c0 1.1.9 2 2 2h13.17l2.31 2.31 1.42-1.41zM5 19V7.83l6.84 6.84-.84 1.05L9 13l-3 4h8.17l2 2H5zM7.83 5l-2-2H19c1.1 0 2 .9 2 2v13.17l-2-2V5H7.83z'%3E%3C/path%3E%3C/svg%3E")
      no-repeat center ${({ theme }) => composeBackgroundColor(theme)};
    background-size: 90%;
    min-height: 50vh;
  }
`;

export default ImageryContainer;
