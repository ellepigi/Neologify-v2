import React, {useState, useEffect} from 'react'
import { Card } from '../../components/Card/Card'
import { getAllCards } from '../../services/CardService'

export const Home = () => {

  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getWords = async () => {
      const data = await getAllCards();
      data.sort((a, b) => b.createdAt - a.createdAt);
      setLatest(data);
      setLoading(false);
      console.log(latest);
    };

    getWords();
  }, []);

  if(loading){
    return(
      <div>
        loading
      </div>
    )
  }

  return (
    <div className='min-h-screen p-4'>
        <h1 className=" text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Latest</h1>
        <div className="cards-container flex gap-2 justify-center flex-wrap mt-8">
        {latest.map((item, index) => {
          return (
            <Card title={item.title} key={index} />
          )
        })}
        </div>
    </div>
  )
}
