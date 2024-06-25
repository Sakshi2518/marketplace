export const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const newItem = action.payload;
        const existingItem = state.item.find(item => item.id === newItem.id);
  
        if (existingItem) {
          return {
            ...state,
            item: state.item.map(item =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          return {
            ...state,
            item: [...state.item, { ...newItem, quantity: 1 }],
          };
        }
  
      // Handle other actions like REMOVE_FROM_CART, UPDATE_CART, etc.
  
      default:
        return state;
    }
  };
  