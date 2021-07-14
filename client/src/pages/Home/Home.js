import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import { QUERY_ITEMS } from '../../utils/queries'
import { ADD_ITEM } from '../../utils/mutations'

const Home = () => {
  const [itemState, setItemState] = useState({
    text: ''
  })

  const { loading, data } = useQuery(QUERY_ITEMS)

  const [addItem, { error }] = useMutation(ADD_ITEM)

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
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div>
      <h1>The Home Page</h1>
      <form>
        <p>
          <label htmlFor='text'>item</label>
          <input
            type='text'
            name='text'
            value={itemState.item}
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
                data.items.map(item => <li key={item._id}>{item.text}</li>)
              }
            </div>
          )
      }
    </div>
  )
}

export default Home
