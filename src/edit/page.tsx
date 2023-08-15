import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../client.js';
import { CreatorProps } from '../components/ContentCreatorCard.js';

type EditProps = {
  disableDeleteButton: boolean
}

const Edit = (props : EditProps) => {
  const { id } = useParams()
  const [resData, setResData] = useState<CreatorProps | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
        const { data } = await supabase.from('creators').select().eq('id', id)
        setResData(data[0])
        console.log('DATA', data[0])
    }

    if (resData) {
      return
    }
    
    fetchData()
  }, [resData])

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const url = formData.get('youtube')
    const imageURL = formData.get('image')
    const description = formData.get('description')

    if (!id) {
      // add creator
      const { data, error } = await supabase
        .from('creators')
        .insert([{ name, url, imageURL, description }])
      
      if (error) {
        alert(error.message)
      } else {
        window.location.href = "/"
        alert('Creator added successfully!')
      }
      return
    }

    const { data, error } = await supabase
      .from('creators')
      .update({ name, url, imageURL, description })
      .match({ id: id })
  
    if (error) {
      alert(error.message)
    } else {
      // take user to view creator page
      window.location.href = "/"

      alert('Creator updated successfully!')
    }
  }

  const deleteCreator = async () => {
    // display confirmation dialog
    const confirmation = window.confirm('Are you sure you want to delete this creator?')

    if (!confirmation) {
      return
    }

    const { data, error } = await supabase
      .from('creators')
      .delete()
      .match({ id: id })

    if (error) {
      alert(error.message)
    } else {
      // take user to view creator page
      window.location.href = "/"
      alert('Creator deleted successfully!')
    }
  }

  return (
    <main id="add-creator">
      <div className="AddEditCreator">
        <form className="editor-form" onSubmit={submitForm}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" defaultValue={resData?.name} required />
          
          <label>
            <span className="fa-brands fa-youtube"></span> URL
            <p>Provide a link to an image of your creator. Be sure to include the http://</p>
          </label>
          <input type="text" id="youtube" name="youtube" defaultValue={resData?.url} required />

          <label htmlFor="image">Image
            <p>Provide a link to an image of your creator. Be sure to include the http://</p>
          </label>
          <input type="text" id="image" name="image" defaultValue={resData?.imageURL} required />

          <label>Description
            <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
          </label>
          <textarea name="description" rows={3} cols={50} id="description" defaultValue={resData?.description} />

          <button type="submit">SUBMIT</button>

          { !props.disableDeleteButton ?
          <button type="button" onClick={deleteCreator} className="delete-button">
            DELETE
          </button> : null
          }
        </form>
      </div>
    </main>
  )
}

export default Edit