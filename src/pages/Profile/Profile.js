import React, { useEffect, useState } from "react";
import { useAuthValue } from "../../contexts/AuthContext";
import { getAllCards } from "../../services/CardService";
import { Card } from "../../components/Card/Card";
import { Spinner } from "../../components/Spinner/Spinner";
import { Pagination } from "../../components/Pagination/Pagination";

export const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profileDocuments, setProfileDocuments] = useState([]);

  const { currentUser } = useAuthValue();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documents = await getAllCards();
        const filteredDocuments = documents.filter(
          (doc) => doc.userName && doc.userName === currentUser.displayName
        );
        setProfileDocuments(filteredDocuments);
        setLoading(false);
      } catch (error) {
        console.error("Errore nel recupero dei dati da Firestore:", error);
      }
    };

    fetchData();
  }, []);


  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 12;
  const pageCount = Math.ceil(profileDocuments.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = profileDocuments.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  if (loading) {
    <div className="flex justify-center items-center">
      <Spinner />
    </div>;
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="mr-4 text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
        My Words
      </h1>
      <div className="cards flex mt-8 space-y-4 gap-2 flex-wrap justify-center">
        {currentItems.map((item) => (
          <Card
            className="max-w-xs"
            key={item.id}
            id={item.id}
            title={item.title}
            comment={item.comment}
            language={item.language}
            photo={item.photo}
            username={item.userName}
            tags={item.tags}
          />
        ))}
      </div>
      <div className="pagination block mt-4 h-8">
      <Pagination handlePageChange={handlePageChange} pageCount={pageCount} />
      </div>
    </div>
  );
};
