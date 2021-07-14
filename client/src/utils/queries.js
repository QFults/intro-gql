import { gql } from '@apollo/client'

export const QUERY_ITEMS = gql`
  query {
    items {
      _id
      text
      isDone
    }
  }
`
