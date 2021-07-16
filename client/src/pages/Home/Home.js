import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { useStoreContext } from '../../utils/GlobalState'
import { QUERY_ITEMS } from '../../utils/queries'
import { ADD_ITEM, MARK_DONE, DELETE_ITEM } from '../../utils/mutations'

const Home = () => {
  const [state, dispatch] = useStoreContext()
  const { loading, data } = useQuery(QUERY_ITEMS)

  const [addItem] = useMutation(ADD_ITEM)
  const [markDone] = useMutation(MARK_DONE)
  const [deleteItem] = useMutation(DELETE_ITEM)

  const handleInputChange = ({ target }) => {
    dispatch({
      type: 'UPDATE_TEXT',
      text: target.value
    })
  }

  const handleAddItem = async event => {
    event.preventDefault()
    const item = {
      text: state.text,
      isDone: false
    }

    try {
      const { data } = await addItem({
        variables: item
      })
      dispatch({
        type: 'ADD_ITEM',
        item
      })
      // window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }

  const handleMarkDone = async (_id, isDone) => {
    try {
      const { data } = await markDone({
        variables: { _id, isDone }
      })
      dispatch({
        type: 'UPDATE_ITEM',
        _id
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteItem = async _id => {
    try {
      const { data } = await deleteItem({
        variables: { _id }
      })
      dispatch({
        type: 'DELETE_ITEM',
        _id
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (data) {
      console.log(data)
      dispatch({
        type: 'GET_ITEMS',
        items: data.items
      })
    }
  }, [data])

  return (
    <div>
      <h1>The Home Page</h1>
      <form>
        <p>
          <label htmlFor='text'>item</label>
          <input
            type='text'
            name='text'
            value={state.text}
            onChange={handleInputChange}
          />
        </p>
        <button onClick={handleAddItem}>Add Item</button>
      </form>
      {
        loading
          ? (
            <span>loading... please wait</span>
            )
          : (
            <div>
              {
                state.items.map(item => (
                  <li key={item._id}>
                    <span onClick={() => handleMarkDone(item._id, !item.isDone)}>
                      {item.text} | Finished: {item.isDone ? 'Yes' : 'No'}
                    </span>
                    <button onClick={() => handleDeleteItem(item._id)}>x</button>
                  </li>
                ))
              }
            </div>
            )
      }
    </div>
  )
}

export default Home
