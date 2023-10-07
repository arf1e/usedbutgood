import { Dispatch, SetStateAction, createContext, useContext } from 'react';

/**
 * Whether or not the cart overlay is currently shown is clearly a UI state,
 * so since it's recommended to use Redux only for Data domain and App state,
 * I decided to go with React Context for this one.
 * I am also open for a discussion about it.
 *
 * Here's the redux docs page on this topic:
 * https://redux.js.org/usage/structuring-reducers/basic-reducer-structure#basic-state-shape
 */
export const CartOverlayContext = createContext<{
  isShown: boolean;
  setIsShown: Dispatch<SetStateAction<boolean>>;
}>({ isShown: false, setIsShown: () => {} });

export default function useCartOverlay() {
  const { isShown, setIsShown } = useContext(CartOverlayContext);

  const showCartOverlay = () => {
    setIsShown(true);
    document.body.style.overflowY = 'hidden';
  };
  const hideCartOverlay = () => {
    setIsShown(false);
    document.body.style.overflowY = 'auto';
  };

  return {
    isShown,
    showCartOverlay,
    hideCartOverlay,
  };
}
