import { blue, cyan, orange, pink, purple, red } from '@mui/material/colors';

const hashBadgeColor = (hashBase: string) => {
  const colors = [orange, pink, blue, purple, red, cyan];
  let iter = 0;
  let pointer = 0;
  while (iter < hashBase.length) {
    iter++;
    if (pointer + 1 === colors.length) {
      pointer = 0;
      continue;
    }
    pointer++;
  }
  return colors[pointer];
};

export default hashBadgeColor;
