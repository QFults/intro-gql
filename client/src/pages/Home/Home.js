import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { QUERY_ITEMS } from '../../utils/queries'
import { ADD_ITEM, MARK_DONE, DELETE_ITEM } from '../../utils/mutations'

const Home = () => {
  const [itemState, setItemState] = useState({
    text: '',
    items: []
  })

  const { loading, data } = useQuery(QUERY_ITEMS)

  const [addItem] = useMutation(ADD_ITEM)
  const [markDone] = useMutation(MARK_DONE)
  const [deleteItem] = useMutation(DELETE_ITEM)

  const handleInputChange = ({ target }) => {
    setItemState({ ...itemState, [target.name]: target.value })
  }

  const handleAddItem = async event => {
    event.preventDefault()

    try {
      const { data } = await addItem({
        variables: {
          text: itemState.text,
          isDone: false
        }
      })
      const items = JSON.parse(JSON.stringify(itemState.items))
      items.push(data.addItem)
      setItemState({ ...itemState, items, text: '' })
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
      const items = JSON.parse(JSON.stringify(itemState.items))
      items.forEach(item => {
        if (item._id === _id) {
          item.isDone = isDone
        }
      })
      setItemState({ ...itemState, items })
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteItem = async _id => {
    try {
      const { data } = await deleteItem({
        variables: { _id }
      })
      let items = JSON.parse(JSON.stringify(itemState.items))
      items = items.filter(item => item._id !== _id)
      setItemState({ ...itemState, items })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (data) {
      setItemState({ ...itemState, items: data.items })
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
            value={itemState.text}
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
                itemState.items.map(item => (
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
