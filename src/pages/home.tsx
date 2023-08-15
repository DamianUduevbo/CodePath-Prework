import React from 'react'
import { useEffect, useState } from 'react'
import '../App.css'
import ContentCreatorCard, { CreatorProps } from '../components/ContentCreatorCard'
import supabase from '../client.js';
import { useRoutes } from 'react-router'

const defaultCreatorData: CreatorProps = {
  id: 0,
  name: '',
  url: '',
  imageURL: '',
  description: '',
}

const Home = () => {
  const [resData, setResData] = useState<CreatorProps[]>([])
  const [creatorData, setCreatorData] = useState<CreatorProps>(defaultCreatorData)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('creators').select()
      setResData(data)
      console.log('DATA', data)
    }

    if (resData.length > 0) {
      return
    }
    fetchData()
  }, [resData])

  return (
    <>
      <main>
        <section className='ShowCreators'>
          {resData.map((data) => (
            <ContentCreatorCard key={data.id} {...data} />
          ))}
        </section>
      </main>
    </>
  )
}

export default Home