import { CircularProgress } from '@mui/material';
import { Container } from '@mui/system';
import { parseInt } from 'lodash';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAdminRights from '../hooks/useAdminRights';
import useToaster from '../hooks/useToaster';
import EditProduct from './EditProduct';

export default function EditProductSwitch() {
  const { isLoading: isAdminRightsLoading, hasAdminRights } = useAdminRights();
  const navigate = useNavigate();
  const { showErrorMessage } = useToaster();
  const { id } = useParams();

  useEffect(() => {
    if (!id || isNaN(parseInt(id))) {
      showErrorMessage('Invalid product id.');
      navigate('/');
    }

    if (!isAdminRightsLoading && !hasAdminRights) {
      showErrorMessage('You do not have admin rights to edit this product.');
      navigate('/');
    }
  }, [navigate, hasAdminRights, isAdminRightsLoading, showErrorMessage, id]);

  return (
    <>
      {!hasAdminRights && (
        <Container
          sx={{
            minHeight: '85vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={100} />
        </Container>
      )}
      {hasAdminRights && id && <EditProduct id={parseInt(id)} />}
    </>
  );
}
