
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      const existingItem = state.item.find((item) => item._id === newItem._id);

      if (existingItem) {
        return {
          ...state,
          item: state.item.map((item) =>
            item._id === newItem._id
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

    case "REMOVE_FROM_CART":
      return {
        ...state,
        item: state.item.filter((item) => item._id !== action.payload),
      };

    case "UPDATE_CART":
      return {
        ...state,
        item: state.item.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};

  