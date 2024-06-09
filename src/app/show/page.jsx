'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const QuestionnaireTable = () => {
  const router = useRouter()

  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/questionnaire');
        setQuestionnaires(response.data);
      } catch (error) {
        console.error('Error fetching questionnaires:', error);
      }
    };
    fetchQuestionnaires();
  }, []);

  const handleUpdate = async (id) => {
    router.push(`/update/${id}`)
     
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/questionnaire/${id}`);
      setQuestionnaires((prevQuestionnaires) =>
        prevQuestionnaires.filter((questionnaire) => questionnaire.id !== id)
      );
      alert('Questionnaire deleted successfully');
    } catch (error) {
      console.error('Error deleting questionnaire:', error);
    }
  };
  const handleCreate =()=>{
    router.push('/create')
  }

  return (
    <div className="container mx-auto p-4">
      <button className='bg-red-500 p-1 rounded-lg font-bold text-lg translate-x-[850%] translate-y-[80%]' onClick={handleCreate} >Create Question</button>
      <h1 className="text-2xl font-bold mb-4">Questionnaires</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Questions</th>
            <th className="border border-gray-300 px-4 py-2">Options</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questionnaires.map((questionnaire) => (
            <tr key={questionnaire.id}>
              <td className="border border-gray-300 px-4 py-2">{questionnaire.id}</td>
              <td className="border border-gray-300 px-4 py-2">{questionnaire.title}</td>
              <td className="border border-gray-300 px-4 py-2">{questionnaire.description}</td>
              <td className="border border-gray-300 px-4 py-2">
                {questionnaire.schema.questions.map((question) => (
                  <div key={question.id}>
                    {question.text} ({question.type})
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {questionnaire.option.options.map((option) => (
                  <div key={option.id}>{option.text}</div>
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleUpdate(questionnaire.id)}
                  className="bg-blue-500 text-white rounded-md px-2 py-1 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(questionnaire.id)}
                  className="bg-red-500 text-white rounded-md px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionnaireTable;
