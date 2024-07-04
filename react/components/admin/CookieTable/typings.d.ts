export type ListElement = {
  id: number,
  text: string
}

export interface State {
  tableList: ListElement[] | undefined;
  show: boolean;
  input: string;
}

export type Action =
  | { type: 'SET_TABLE_LIST'; payload: ListElement[] | undefined }
  | { type: 'SET_SHOW'; payload: boolean }
  | { type: 'SET_INPUT'; payload: string };
