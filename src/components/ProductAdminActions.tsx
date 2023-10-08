import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import useAdminRights from '../hooks/useAdminRights';

export default function ProductAdminActions() {
  const hasAdminRights = useAdminRights();

  if (hasAdminRights) {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 2,
        }}
      >
        <Button variant="outlined" sx={{ mr: 2 }} endIcon={<EditOutlined />}>
          Update Product
        </Button>
        <Button variant="text" color="error" endIcon={<DeleteOutlined />}>
          Delete Product
        </Button>
      </Box>
    );
  }

  return <></>;
}
