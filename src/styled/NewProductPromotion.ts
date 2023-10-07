import { Box, styled } from '@mui/material';

const NewProductPromotion = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 1em;
    /* no-image fallback: */
    background: ${({ theme }) => theme.palette.primary.main}
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch' focusable='false' aria-hidden='true' viewBox='0 0 24 24' data-testid='Person4OutlinedIcon'%3E%3Cpath fill='white' d='M18.39 14.56C16.71 13.7 14.53 13 12 13s-4.71.7-6.39 1.56C4.61 15.07 4 16.1 4 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66zM18 18H6v-.78c0-.38.2-.72.52-.88C7.71 15.73 9.63 15 12 15c2.37 0 4.29.73 5.48 1.34.32.16.52.5.52.88V18zm-6-6c2.21 0 4-1.79 4-4V4.5c0-.83-.67-1.5-1.5-1.5-.52 0-.98.27-1.25.67-.27-.4-.73-.67-1.25-.67s-.98.27-1.25.67c-.27-.4-.73-.67-1.25-.67C8.67 3 8 3.67 8 4.5V8c0 2.21 1.79 4 4 4zm-2-6.5h4V8c0 1.1-.9 2-2 2s-2-.9-2-2V5.5z'%3E%3C/path%3E%3C/svg%3E")
      no-repeat center;
    background-size: 70%;
    font-size: 0;
  }

  .quote {
    max-width: 380px;
    text-align: center;
    line-height: 1.5em;
    margin: 1.5em auto;
  }

  ::before,
  ::after {
    content: '';
    position: absolute;
    z-index: -1;
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.primary.light};
  }
  ::before {
    width: 290px;
    height: 120px;
    top: 5%;
    transform: rotate(-15deg);
  }

  ::after {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    bottom: -20%;
    right: 10%;
  }
`;

export default NewProductPromotion;
