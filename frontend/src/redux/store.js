


// export const store = configureStore({
//   reducer: {
//     todos: todosReducer,
//     filters: filtersReducer,
//   },
// })

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import itemReducer from './createSlice/itemSlice.js';
import userReducer from './createSlice/userSlice.js';
import userOrder from './createSlice/orderSlice.js';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({
    item: itemReducer,
    user: userReducer,
    order: userOrder
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);