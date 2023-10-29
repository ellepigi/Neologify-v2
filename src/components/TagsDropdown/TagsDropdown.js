import React, { useState, useEffect } from 'react'
import { getAllCards } from '../../services/CardService';
import { Link } from 'react-router-dom';

export const TagsDropdown = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const documents = await getAllCards();
            const allTags = [];
    
            documents.forEach((doc) => {
              if (doc.tags && Array.isArray(doc.tags)) {
                doc.tags.forEach((tag) => {
                  if (!allTags.includes(tag)) {
                    allTags.push(tag);
                  }
                });
              }
            });
            allTags.sort();
            setTags(allTags);
            setLoading(false);
          } catch (error) {
            console.error("Errore nel recupero dei dati da Firestore:", error);
          }
        };
    
        fetchData();
      }, []);


  return (
    <div className="absolute left-0 top-full h-32 w-full bg-white py-2 px-4 shadow-md">

         <h1 className='mb-2 font-bold'>Tags</h1>
                {tags.map((tag, index) => (
          <Link key={index} to={`/tag/${tag}`}>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-300 mr-2 mb-2">
              {tag}
            </span>
          </Link>
        ))}
              </div>
  )
}
