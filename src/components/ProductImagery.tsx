import { ImageOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Zoom,
} from '@mui/material';
import { useState } from 'react';
import composeBackgroundColor from '../utils/composeBackgroundColor';

type Props = {
  images: string[];
  showsDisclaimer?: boolean;
};

const ImageryContainer = styled(Box)<{ blurred: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;

  .blurrable {
    transition: filter 0.2s;
    position: relative;
    filter: ${({ blurred }) => (blurred ? 'blur(50px)' : 'blur(0)')};
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
    object-fit: contain;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch' focusable='false' aria-hidden='true' viewBox='0 0 24 24' data-testid='ImageNotSupportedOutlinedIcon'%3E%3Cpath fill='white' d='m21.9 21.9-6.1-6.1-2.69-2.69L5 5 3.59 3.59 2.1 2.1.69 3.51 3 5.83V19c0 1.1.9 2 2 2h13.17l2.31 2.31 1.42-1.41zM5 19V7.83l6.84 6.84-.84 1.05L9 13l-3 4h8.17l2 2H5zM7.83 5l-2-2H19c1.1 0 2 .9 2 2v13.17l-2-2V5H7.83z'%3E%3C/path%3E%3C/svg%3E")
      no-repeat center ${({ theme }) => composeBackgroundColor(theme)};
    background-size: 40%;
    min-height: 50vh;
  }
`;

const AnimatedImage = ({ active, src }: { active: boolean; src: string }) => {
  if (!active) return <></>;

  return (
    <Zoom in={active}>
      <img className="image" src={src} alt="product" />
    </Zoom>
  );
};

export default function ProductImagery({
  images,
  showsDisclaimer = false,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hidden, setHidden] = useState(showsDisclaimer);
  return (
    <ImageryContainer blurred={hidden}>
      {hidden && (
        <Box className="disclaimer">
          <Typography variant="caption">Disclaimer</Typography>
          <Typography variant="h6" component="strong" sx={{ mb: 2 }}>
            🌍 Internet is an awesome place.
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Here you can learn new things, meet new people, and even buy stuff
            from websites like this one.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            However, it is also a place where people find it funny to upload
            porn, gore, and other NSFW-content to open APIs like the one we are
            using. <br />
            <b>
              Please note that we can't be responsible for the product images
              since anyone can upload anything to the API.
            </b>
          </Typography>
          <Button fullWidth variant="outlined" onClick={() => setHidden(false)}>
            I got it, let me see the images
          </Button>
        </Box>
      )}
      <Box className="blurrable">
        {images.map((image, index) => (
          <AnimatedImage active={currentIndex === index} src={image} />
        ))}
        {images.length > 1 && (
          <ToggleButtonGroup
            value={currentIndex}
            exclusive
            sx={{ mt: 2 }}
            onChange={(_e, value) => setCurrentIndex(value)}
          >
            {images.map((image, index) => (
              <ToggleButton
                disabled={currentIndex === index}
                key={`${image}–${index}`}
                value={index}
              >
                <ImageOutlined />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      </Box>
    </ImageryContainer>
  );
}
