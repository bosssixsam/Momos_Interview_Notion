'use client'

import { createWrapper } from 'next-redux-wrapper'
import { createInjectorsEnhancer } from 'redux-injectors'
import createSagaMiddleware, { Task } from 'redux-saga'
import { Action, Store, ThunkAction, configureStore } from '@reduxjs/toolkit'
import createReducer from './rootReducer'
import rootSaga from './rootSaga'

// import rootSaga from "./rootSaga";
// import { rootReducer } from "./rootReducer";

// import counterReducer from '../features/counter/counterSlice';

// const sagaMiddleware = createSagaMiddleware();

export interface SagaStore extends Store {
    sagaTask?: Task
}

const devEnv = process.env.APP_ENV === 'local'

const makeStore = (preloadedState = {}) => {
    // 1: Create the middleware
    const sagaOptions = {}
    const sagaMiddleware = createSagaMiddleware(sagaOptions)

    // 2: Add an extra parameter for applying middleware:
    const middlers = [sagaMiddleware]
    const enhancers: any = [
        createInjectorsEnhancer({
            createReducer,
            runSaga: sagaMiddleware.run
        })
    ]

    const store = configureStore({
        reducer: createReducer(),
        // devTools: devEnv,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            }).concat(middlers),
        preloadedState,
        enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancers)
    })

    // 3: Run your sagas on server
    ;(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga)

    // 4: now return the store:
    return store
}

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware({
//       serializableCheck: false,
//     });
//   },
// });

// sagaMiddleware.run(rootSaga);

// export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// type CleanState<T> = T extends CombinedState<infer S> ? { [K in keyof S]: CleanState<S[K]> } : T;

export type AppStore = ReturnType<typeof makeStore>
// export type RootState = CleanState<
//   ReturnType<AppStore["getState"]> & {
//     readonly [$CombinedState]?: undefined;
//   }
// >;

export const store = makeStore()

export const wrapper = createWrapper<AppStore>(makeStore)
