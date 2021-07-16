import { useReducer } from 'react'
import {
  GET_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  UPDATE_TEXT
} from './actions.js'

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_ITEMS: {
      return {
        ...state,
        items: action.items
      }
    }
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.item],
        text: ''
      }
    case UPDATE_ITEM:
      let items = JSON.parse(JSON.stringify(state.items))
      items = items.map(item => {
        if (item._id === action._id) {
          item.isDone = !item.isDone
        }
        return item
      })
      return {
        ...state,
        items
      }
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action._id)
      }
    case UPDATE_TEXT:
      return {
        ...state,
        text: action.text
      }
    default:
      return state
  }
}

export function useItemReducer(state) {
  return useReducer(reducer, state)
}
