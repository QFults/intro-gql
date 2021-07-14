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
