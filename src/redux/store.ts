import { Action, configureStore, ConfigureStoreOptions, ThunkAction } from "@reduxjs/toolkit";
import {useSelector as useReduxSelector,   useDispatch as useReduxDispatch, TypedUseSelectorHook} from 'react-redux'

import {reducer} from "./reducer"
import {middleware} from "./middleware"

export const reduxStore = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(middleware)
    },
  });

  const configreStoreDefaultOptions: ConfigureStoreOptions = { reducer
   }

export const makeReduxStore = (
    options: ConfigureStoreOptions = configreStoreDefaultOptions
) => {
    const store = configureStore(options)

    return store
}

export const useDispatch = () => useReduxDispatch<ReduxDispatch>()
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector

/* Types */
export type ReduxStore = typeof reduxStore
export type ReduxState = ReturnType<typeof reduxStore.getState>
export type ReduxDispatch = typeof reduxStore.dispatch
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
    ReturnType,
    ReduxState,
    unknown,
    Action
>  