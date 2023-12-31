import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { Modal } from "../../components/Modal/Modal";

export const Submit = () => {

    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [language, setLanguage] = useState("English");
  
    //Modal
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalText, setModalText] = useState("");
  
    const user = auth.currentUser;
  
    const wordsCollectionRef = collection(db, "words");
  
    const [tags, setTags] = useState([]);
  
    const removeTags = (indexToRemove) => {
      setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = (event) => {
      const tag = event.target.value.trim();
      if (tag !== "") {
        setTags([...tags, tag]);
        event.target.value = "";
      }
    };
  
    const CreateWord = async (e) => {
      e.preventDefault();
      try {
        if (!user) {
          await addDoc(wordsCollectionRef, { title, comment, language });
          // setIsOpen(true);
          setTitle("");
          setComment("");
        } else {
          const { uid, displayName, email, photoURL } = user;
          await addDoc(wordsCollectionRef, {
            title,
            comment,
            language,
            userId: uid,
            userName: displayName,
            userEmail: email,
            photo: photoURL,
            tags: tags,
            createdAt: serverTimestamp(),
          });
          setModalTitle("Success")
          setModalText("The neologism was succesfully submitted!")
          setIsOpen(true);
          setTitle("");
          setComment("");
          setTags([]);
        }
      } catch (error) {
        setModalTitle("Error")
        setModalText("The neologism could not be submitted...")
        setIsOpen(true);
      }
    };
  
    const handleLanguageChange = (event) => {
      const selectedLanguage = event.target.value;
      setLanguage(selectedLanguage);
      console.log(selectedLanguage);
    };

  return (
    <div className='min-h-screen p-4 w-full text-center'>
        <section className="bg-white dark:bg-gray-900 mt-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className=" text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Submit
            </h2>
          </div>
          <form onSubmit={CreateWord} className="mb-6">
            <div class="mb-6">
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Language
              </label>
              <select
                id="countries"
                value={language}
                onChange={handleLanguageChange}
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="English">English</option>
                <option value="Italian">Italian</option>
              </select>
            </div>
            <div class="mb-6">
              <label
                for="base-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Neologism
              </label>
              <input
                minLength={4}
                maxLength={15}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                id="base-input"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <label
              htmlFor="comment"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Definition
            </label>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <textarea
                minLength={10}
                maxLength={256}
                id="comment"
                rows="6"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                required
              ></textarea>
            </div>
            <label
              for="base-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tags
            </label>
            <div className="flex flex-wrap justify-start bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {tags.map((tag, index) => {
                return (
                  <span
                    key={index}
                    class="flex items-center gap-2 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                    <button
                      onClick={() => removeTags(index)}
                      className="ml-1 bg-red-500 text-white rounded-full p-1 w-4 h-4 text-center leading-none hover:bg-red-700 focus:bg-red-700"
                      style={{ fontSize: "8px" }}
                      type="button"
                    >
                      X
                    </button>
                  </span>
                );
              })}
              <input
                type="text"
                onKeyUp={(event) => (event.key === " " ? addTags(event) : null)}
                className="border-none focus:ring-transparent  bg-transparent w-full"
              />
            </div>

            <button
              type="submit"
              className="inline-flex mt-4 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 
            hover:bg-blue-900 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
       <Modal isOpen={isOpen} title={modalTitle} text={modalText} /> 
    </div>
  )
}
