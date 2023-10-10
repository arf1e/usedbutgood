import { ImageOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Zoom,
} from '@mui/material';
import { useState } from 'react';
import ImageryContainer from '../styles/styled/ImageryContainer';

type Props = {
  images: string[];
  showsDisclaimer?: boolean;
};

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
    <ImageryContainer blurred={hidden ? 1 : 0}>
      {hidden && (
        <Box className="disclaimer">
          <Typography variant="caption">Disclaimer</Typography>
          <Typography
            variant="h6"
            align="center"
            component="strong"
            sx={{ mb: 2 }}
          >
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
          <AnimatedImage
            key={`${image}-${index}`}
            active={currentIndex === index}
            src={image}
          />
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
