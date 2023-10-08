import _ from 'lodash';

type handleFormSubmitInputHelpers = {
  onSuccess: (result: any) => void;
  onError: (error: string) => void;
  fallbackErrorMsg?: string;
};

const handleFormSubmit = async (
  submitFn: () => Promise<any>,
  {
    onSuccess,
    onError,
    fallbackErrorMsg = 'Unknown error happened.',
  }: handleFormSubmitInputHelpers
) => {
  try {
    const result = await submitFn();
    if ('error' in result) {
      const error = _.get(
        result,
        ['error', 'data', 'message'],
        fallbackErrorMsg
      );
      onError(error);
      return;
    }
    onSuccess(result);
  } catch (error: any) {
    const errorMsg = _.get(error, 'message', fallbackErrorMsg);
    onError(errorMsg);
  }
};

export default handleFormSubmit;
