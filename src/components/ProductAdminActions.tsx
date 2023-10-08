import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteProductMutation } from '../apis/fakestore';
import useAdminRights from '../hooks/useAdminRights';
import useToaster from '../hooks/useToaster';
import { ProductType } from '../types/product';
import handleAsyncOperation from '../utils/handleAsyncOperation';

type Props = {
  id: ProductType['id'];
};

export default function ProductAdminActions({ id }: Props) {
  const hasAdminRights = useAdminRights();
  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();
  const navigate = useNavigate();
  const { showSuccessMessage, showErrorMessage } = useToaster();

  const onDeleteSuccess = useCallback(() => {
    navigate('/');
    showSuccessMessage('Successfully deleted the product!');
  }, [navigate, showSuccessMessage]);

  const onDeleteError = useCallback(
    (error: string) => {
      showErrorMessage(error);
    },
    [showErrorMessage]
  );

  const handleDelete = useCallback(async () => {
    await handleAsyncOperation(() => deleteProduct(id), {
      onSuccess: onDeleteSuccess,
      onError: onDeleteError,
      fallbackErrorMsg: 'Failed to delete the product.',
    });
  }, [deleteProduct, id, showErrorMessage, showSuccessMessage]);

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
        <Button
          variant="text"
          color="error"
          onClick={handleDelete}
          disabled={isDeleteLoading}
          endIcon={<DeleteOutlined />}
        >
          {isDeleteLoading ? 'Working on it...' : 'Delete Product'}
        </Button>
      </Box>
    );
  }

  return <></>;
}
