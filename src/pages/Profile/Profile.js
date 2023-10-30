import React, { useEffect, useState } from "react";
import { useAuthValue } from "../../contexts/AuthContext";
import { getAllCards } from "../../services/CardService";
import { Card } from "../../components/Card/Card";
import { Spinner } from "../../components/Spinner/Spinner";

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
        {profileDocuments.map((item) => (
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
    </div>
  );
};
