import { Action, ListElement, State } from "./typings";

export const defaultSchema = {
  properties: {
    id: {
      title: 'ID',
      width: 50,
    },
    text: {
      title: 'Frase de la fortuna',
      minWidth: 350,
    }
  },
}

export const initialState = {
  tableList: undefined as ListElement[] | undefined,
  show: false,
  input: ''
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_TABLE_LIST':
      return { ...state, tableList: action.payload };
    case 'SET_SHOW':
      return { ...state, show: action.payload };
    case 'SET_INPUT':
      return { ...state, input: action.payload };
    default:
      return state;
  }
};
