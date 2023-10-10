import { Button, Collapse, TextField, Zoom } from '@mui/material';
import { Box } from '@mui/system';
import { TransitionGroup } from 'react-transition-group';
import _ from 'lodash';
import { useCallback, useMemo } from 'react';
import getRandomImage from '../utils/getRandomImage';
import Heading from '../styles/styled/Heading';

const MAX_IMAGES_ON_PRODUCT_ALLOWED = 4;

type Props = {
  images: string[];
  addImage: () => void;
  removeImage: (index: number) => void;
  changeHandler: (index: number, value: string) => void;
  errors: string | string[] | undefined;
};

export default function ImageryInput({
  images,
  addImage,
  removeImage,
  changeHandler,
  errors,
}: Props) {
  const calculateIfShouldRenderPreview = useCallback(
    (index: number) => {
      const hasError = _.get(errors, index, false);
      return !hasError;
    },
    [errors]
  );

  const newImageAllowed = useMemo(() => {
    const noErrors = errors === undefined || errors.length === 0;
    const belowMaxLength = images.length < MAX_IMAGES_ON_PRODUCT_ALLOWED;
    // Yup raises .max() error only after it is exceeded, so it's simpler to just check the length manually.
    return noErrors && belowMaxLength;
  }, [errors, images.length]);

  return (
    <Box sx={{ width: '100%' }}>
      <Heading variant="h5" sx={{ my: 2 }}>
        Imagery
      </Heading>
      <Box sx={{ width: '100%' }}>
        <TransitionGroup>
          {images.map(
            (image, index) =>
              calculateIfShouldRenderPreview(index) && (
                <Zoom key={`${image}-${index}`} timeout={300}>
                  <img
                    src={image}
                    className="image-preview"
                    alt={`Product imagery ${index}`}
                  />
                </Zoom>
              )
          )}
        </TransitionGroup>
      </Box>
      <TransitionGroup>
        {images.map((image, index) => (
          <Collapse key={index}>
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'center', my: 1 }}
            >
              <TextField
                key={index}
                fullWidth
                label={`Image ${index + 1}`}
                value={image}
                onChange={(e) => changeHandler(index, e.target.value)}
              />
              <Button
                onClick={() => changeHandler(index, getRandomImage())}
                variant="text"
                color="primary"
                sx={{ ml: 2 }}
              >
                Randomize
              </Button>
              <Button
                onClick={() => removeImage(index)}
                variant="text"
                color="error"
                sx={{ ml: 2 }}
              >
                Remove
              </Button>
            </Box>
          </Collapse>
        ))}
      </TransitionGroup>
      <Button
        onClick={addImage}
        disabled={!newImageAllowed}
        sx={{ mt: 1 }}
        variant="text"
      >
        Add Image
      </Button>
    </Box>
  );
}
