import _ from 'lodash';

type InputHelpersType = {
  onSuccess: (result: any) => void;
  onError: (error: string) => void;
  fallbackErrorMsg?: string;
};

/**
 * Wrapper for handling async operations in cases where it's too comples to use RTK-Query helpers.
 * It's a simple wrapper around try/catch block which provides { onSuccess, onError } callbacks for side-effects handling.
 *
 * @param submitFn - async function to be executed
 * @param onSuccess - callback to be executed in case of success.
 * @param onError - callback to be executed in case of error.
 */
const handleAsyncOperation = async (
  submitFn: () => Promise<any>,
  {
    onSuccess,
    onError,
    fallbackErrorMsg = 'Unknown error happened.',
  }: InputHelpersType
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

export default handleAsyncOperation;
