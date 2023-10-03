import { Skeleton, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useMemo, useState } from 'react';
import { useGetCategoriesQuery } from '../apis/fakestore';
import CategoryBadge from './CategoryBadge';

const LOADING = 'LOADING';
const ERROR = 'ERROR';
const LIST = 'LIST';
const EMPTY = 'EMPTY';

type ScreenStateType =
  | typeof LOADING
  | typeof ERROR
  | typeof LIST
  | typeof EMPTY;

export default function CategoriesList() {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [state, setState] = useState<ScreenStateType>(LOADING);
  const theme = useTheme();

  useEffect(() => {
    if (isLoading) {
      setState(LOADING);
      return;
    }

    if (isError) {
      setState(ERROR);
      return;
    }

    if (categories && categories.length > 0) {
      setState(LIST);
      return;
    }

    setState(EMPTY);
  }, [isLoading, isError, categories]);

  const renderSkeletons = useMemo(() => {
    return new Array(6)
      .fill(0)
      .map((_, i) => <Skeleton key={i} width={120} height={80} />);
  }, []);

  const renderCategories = useMemo(() => {
    return (
      categories?.map((category) => (
        <CategoryBadge category={category} key={category.id} />
      )) || <></>
    );
  }, [categories]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      {state === LIST && renderCategories}
      {state === EMPTY && (
        <Typography variant="body1" color={theme.palette.info.main}>
          No categories to display.
        </Typography>
      )}
      {state === LOADING && renderSkeletons}
      {state === ERROR && (
        <Typography variant="body1" color={theme.palette.error.main}>
          Failed to get categories data.
        </Typography>
      )}
    </Box>
  );
}
