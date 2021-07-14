import { gql } from '@apollo/client'

export const ADD_ITEM = gql`
  mutation addItem($text: String!, $isDone: Boolean!) {
    addItem(text: $text, isDone: $isDone) {
      _id
      text
      isDone
    }
  }
`

export const MARK_DONE = gql`
  mutation markDone($_id: ID!, $isDone: Boolean!) {
    markDone(_id: $_id, isDone: $isDone) {
      _id
    }
  }
`

export const DELETE_ITEM = gql`
  mutation deleteItem($_id: ID!) {
    deleteItem(_id: $_id) {
      _id
    }
  }
`
