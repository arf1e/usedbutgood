import { ImageOutlined } from '@mui/icons-material';
import {
  Box,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Zoom,
} from '@mui/material';
import { useState } from 'react';
import composeBackgroundColor from '../utils/composeBackgroundColor';

type Props = {
  images: string[];
};

const ImageryContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

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

export default function ProductImagery({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <ImageryContainer>
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
    </ImageryContainer>
  );
}
