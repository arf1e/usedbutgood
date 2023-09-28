import cartReducer, {
  addToCart,
  CartState,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectTotalPrice,
  selectTotalQuantity,
} from '../../slices/cartSlice';
import productsFixture from '../__fixtures__/products';

describe('actions', () => {
  describe('addToCart', () => {
    it('should add an item to the cart', () => {
      const state = { items: [] };
      const payload = { product: productsFixture[0], quantity: 1 };
      const action = addToCart(payload);
      const result = cartReducer(state, action);
      expect(result.items).toHaveLength(1);
    });

    it('should increase the quantity of an existing item', () => {
      const productToAdd = productsFixture[0];
      const state = { items: [{ product: productToAdd, quantity: 1 }] };
      const payload = { product: productToAdd, quantity: 2 };
      const action = addToCart(payload);
      const result = cartReducer(state, action);
      expect(result.items).toHaveLength(1);
      expect(result.items[0].quantity).toBe(3);
    });
  });

  describe('clearCart', () => {
    it('should clear the cart', () => {
      const state = { items: [{ product: productsFixture[0], quantity: 1 }] };
      const action = clearCart();
      const result = cartReducer(state, action);
      expect(result.items).toHaveLength(0);
    });
  });

  describe('removeFromCart', () => {
    let state: CartState = { items: [] };

    beforeEach(() => {
      state = {
        items: [
          { product: productsFixture[0], quantity: 1 },
          { product: productsFixture[1], quantity: 2 },
        ],
      };
    });

    it('should remove the given item from the cart', () => {
      const action = removeFromCart(productsFixture[0]);
      const result = cartReducer(state, action);
      expect(result.items).toHaveLength(1);
      expect(result.items[0].product.id).toBe(productsFixture[1].id);
    });

    it('should not mutate the state if the item is not in the cart', () => {
      const action = removeFromCart(productsFixture[2]);
      const result = cartReducer(state, action);
      expect(result.items.length).toBe(2);
    });
  });

  describe('incrementQuantity', () => {
    let state: CartState = { items: [] };

    beforeEach(() => {
      state = {
        items: [
          { product: productsFixture[0], quantity: 1 },
          { product: productsFixture[1], quantity: 2 },
        ],
      };
    });

    it('should increment the quantity of the given item', () => {
      const action = incrementQuantity(productsFixture[0]);
      const result = cartReducer(state, action);
      expect(result.items[0].quantity).toBe(2);
    });

    it('should not mutate the state if the item is not in the cart', () => {
      const action = incrementQuantity(productsFixture[2]);
      const result = cartReducer(state, action);
      expect(result.items[0].quantity).toBe(1);
      expect(result.items[1].quantity).toBe(2);
    });
  });

  describe('decrementQuantity', () => {
    let state: CartState = { items: [] };
    beforeEach(() => {
      state = {
        items: [
          { product: productsFixture[0], quantity: 1 },
          { product: productsFixture[1], quantity: 2 },
        ],
      };
    });

    it('should decrement the quantity of the given item', () => {
      const action = decrementQuantity(productsFixture[1]);
      const result = cartReducer(state, action);
      expect(result.items[1].quantity).toBe(1);
    });

    it('should not decrement the quantity below 1', () => {
      const action = decrementQuantity(productsFixture[0]);
      const result = cartReducer(state, action);
      expect(result.items[0].quantity).toBe(1);
    });

    it('should not mutate the state if the item is not in the cart', () => {
      const action = decrementQuantity(productsFixture[2]);
      const result = cartReducer(state, action);
      expect(result.items[0].quantity).toBe(1);
      expect(result.items[1].quantity).toBe(2);
      expect(result.items).toHaveLength(2);
    });
  });
});

describe('selectors', () => {
  describe('selectTotalQuantity', () => {
    it('should return the total quantity of items in the cart', () => {
      const state = {
        items: [
          { product: productsFixture[0], quantity: 1 },
          { product: productsFixture[1], quantity: 2 },
        ],
      };
      const result = selectTotalQuantity(state);
      expect(result).toBe(3);
    });

    it('should return 0 if the cart is empty', () => {
      const state = { items: [] };
      const result = selectTotalQuantity(state);
      expect(result).toBe(0);
    });
  });

  describe('selectTotalPrice', () => {
    it('should return the total price of items in the cart', () => {
      const state = {
        items: [
          { product: productsFixture[0], quantity: 1 },
          { product: productsFixture[1], quantity: 2 },
        ],
      };
      const expectedSum =
        productsFixture[0].price + productsFixture[1].price * 2;
      const result = selectTotalPrice(state);
      expect(result).toBe(expectedSum);
    });

    it('should return 0 if the cart is empty', () => {
      const state = { items: [] };
      const result = selectTotalPrice(state);
      expect(result).toBe(0);
    });
  });
});
