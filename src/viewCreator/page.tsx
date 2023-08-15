import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import supabase from '../client.js';
import { CreatorProps } from '../components/ContentCreatorCard.js';

const ViewCreator = () => {
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
    <main>
      <div className='ViewCreator'>
        <section className='creator-image'>
          <img src={resData?.imageURL} alt={resData?.name} />
        </section>

        <section className='creator-info'>
          <h1>{resData?.name}</h1>
          <p>{resData?.description}</p>
          <a href={resData?.url}>
            {resData?.url}
          </a>
        </section>

        <section className='modify-creator'>
          <Link to={`/edit/${id}`}>
            <button>EDIT</button>
          </Link>
          <button onClick={deleteCreator}>
            DELETE
          </button>
        </section>
      </div>
    </main>
  )
}

export default ViewCreator