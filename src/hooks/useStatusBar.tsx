import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import composeBackgroundColor from '../utils/composeBackgroundColor';

export const FORM_IDLE = 'IDLE';
export const FORM_LOADING = 'LOADING';
export const FORM_SUCCESS = 'SUCCESS';
export const FORM_ERROR = 'ERROR';

type FormState =
  | typeof FORM_IDLE
  | typeof FORM_LOADING
  | typeof FORM_SUCCESS
  | typeof FORM_ERROR;

export const StatusBar = styled(Box)<{ state: FormState }>`
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 2em;
  border-top-right-radius: 2em;
  transition: 0.2s;
  height: ${({ state }) => (state === FORM_IDLE ? '0' : '2em')};
  opacity: ${({ state }) => (state === FORM_IDLE ? '0' : '1')};
  background-color: ${({ theme, state }) => {
    const color = {
      [FORM_IDLE]: 'transparent',
      [FORM_LOADING]: composeBackgroundColor(theme, 2),
      [FORM_SUCCESS]: theme.palette.success.main,
      [FORM_ERROR]: theme.palette.error.main,
    }[state];
    return color;
  }};
`;

export default function useStatusBar() {
  const [formState, setFormState] = useState<FormState>(FORM_IDLE);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (formState === FORM_LOADING) {
      setMessage('Loading...');
    }
    if (![FORM_IDLE, FORM_LOADING].includes(formState)) {
      t = setTimeout(() => {
        setFormState(FORM_IDLE);
        setMessage(null);
      }, 2400);
    }
    return () => clearTimeout(t);
  }, [formState, setFormState, setMessage]);

  return { formState, message, setFormState, setMessage };
}
