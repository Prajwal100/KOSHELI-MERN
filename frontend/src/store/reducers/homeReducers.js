import {
  GET_HOME_SLIDERS,
  GET_HOME_CATEGORIES,
  GET_HOME_BRANDS,
  GET_HOME_TOP_PRODUCTS,
  GET_HOME_SETTINGS,
} from "../constants/homeConstants";

const initalState = {
  sliders: [],
  categories: [],
  brands: [],
  topProducts: [],
  settings: {},
};
export default function homeReducers(state = initalState, action) {
  switch (action.type) {
    case GET_HOME_SLIDERS: {
      return {
        ...state,
        sliders: action.payload,
      };
    }
    case GET_HOME_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case GET_HOME_BRANDS: {
      return {
        ...state,
        brands: action.payload,
      };
    }
    case GET_HOME_TOP_PRODUCTS: {
      return {
        ...state,
        topProducts: action.payload,
      };
    }
    case GET_HOME_SETTINGS: {
      return {
        ...state,
        settings: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
