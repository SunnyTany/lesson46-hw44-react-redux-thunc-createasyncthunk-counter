import { Action, configureStore, Dispatch, Middleware, MiddlewareAPI, ThunkAction } from '@reduxjs/toolkit'
import counterReductor from './counterSlice'
import { useDispatch } from 'react-redux'

export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
export type AppDispatch = typeof store.dispatch

const logger: Middleware = (storeAPI: MiddlewareAPI<Dispatch, RootState>) => (next) => (action) => {
  const prevState = storeAPI.getState().counter.count
  const result = next(action)
  const nextState = storeAPI.getState().counter.count
  console.log(`prevState: ${prevState}, nextState: ${nextState}, Dispatch action: ${(action as Action).type}`)	
  return result
}

const store = configureStore({
  reducer: {
    counter: counterReductor
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store