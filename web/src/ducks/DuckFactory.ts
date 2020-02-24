import { Action } from "redux";

export type PayloadAction<T extends string, P> = Action<T> & { payload: P };

type DuckCreator<T extends string, TPayload, TState> = (
  payload: TPayload
) => (state: TState, action: PayloadAction<T, TPayload>) => TState;

type DuckCreatorWithType<T extends string, TPayload, TState> = {
  type: T;
  duckCreator: DuckCreator<T, TPayload, TState>;
};

export default class DuckFactory<TState> {
  creators: DuckCreatorWithType<any, any, TState>[];

  constructor() {
    this.creators = [];
  }

  createAction<T extends string, TPayload>(
    type: T,
    duckCreator: DuckCreator<T, TPayload, TState>
  ): (payload?: TPayload) => PayloadAction<T, TPayload | undefined> {
    const duplicate = this.creators.find(c => c.type === type);
    if (duplicate) {
      throw new Error(`Duplicate action: ${type}`);
    }
    this.creators.push({ type, duckCreator });
    return (payload?: TPayload) => ({
      type,
      payload
    });
  }

  createReducer<T extends string, TPayload>(initialState: TState) {
    const creators = this.creators;
    return function(
      state: TState = initialState,
      action: PayloadAction<T, TPayload>
    ) {
      const result = creators.find(c => c.type === action.type);
      if (result) {
        return result.duckCreator(action.payload)(state, action);
      }
      return state;
    };
  }
}
