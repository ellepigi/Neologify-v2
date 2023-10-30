import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router';
import { Card } from '../../components/Card/Card'
import { getAllCards } from '../../services/CardService'
import { Spinner } from '../../components/Spinner/Spinner';
import { Pagination } from '../../components/Pagination/Pagination';

export const Tag = () => {

    const { tagName } = useParams();
    const [taggedDocuments, setTaggedDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const documents = await getAllCards();
          const filteredDocuments = documents.filter(
            (doc) => doc.tags && doc.tags.includes(tagName)
          );
          setTaggedDocuments(filteredDocuments);
          setLoading(false);
        } catch (error) {
          console.error("Errore nel recupero dei dati da Firestore:", error);
        }
      };
  
      fetchData();
    }, [tagName]);

  //pagination
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 12;
  const pageCount = Math.ceil(taggedDocuments.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = taggedDocuments.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

 

  return (
    <div className='min-h-screen p-4 flex flex-col justify-between'>
      {loading? (
        <div className="min-h-screen flex justify-center items-center">
        <Spinner />
        </div>
      ) : (
        <>
        <h1 className=" text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">  {tagName.charAt(0).toUpperCase() + tagName.slice(1)}</h1>
        <div className="cards-container flex gap-2 justify-center flex-wrap mt-8">
        {currentItems.map((item, index) => {
          return (
            <Card id={item.id} title={item.title} comment={item.comment} image={item.photo} username={item.userName} 
            tags={item.tags} key={index} />
          )
        })}
        </div>
        </>
      )}
       <div className="pagination mt-4">
          <Pagination handlePageChange={handlePageChange} pageCount={pageCount}/>
        </div> 
    </div>
  )
}
