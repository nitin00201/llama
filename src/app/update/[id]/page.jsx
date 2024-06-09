'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const UpdateQuestionnaire = ({ params }) => {
  const { id } = params; // Assuming params are passed correctly
  const [questionnaire, setQuestionnaire] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([]);
  const [questionType, setQuestionType] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/questionnaire/${id}`);
        setQuestionnaire(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setQuestionId(response.data.schema.questions[0].id);
        setQuestionText(response.data.schema.questions[0].text);
        setOptions(response.data.option.options.map((option) => option.text));
      } catch (error) {
        console.error('Error fetching questionnaire:', error);
      }
    };

    if (id) {
      fetchQuestionnaire();
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        title,
        description,
        schema: {
          questions: [
            {
              id: questionId,
              text: questionText,
              type: questionType,
              options: []
            }
          ]
        },
        option: {
          options: options.map((text, index) => ({ id: index + 1, text }))
        }
      };
      await axios.put(`http://localhost:3000/api/v1/questionnaire/${id}`, updatedData);
      alert('Questionnaire updated successfully');
      router.push('/show');
    } catch (error) {
      console.error('Error updating questionnaire:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'questionId') {
      setQuestionId(value);
    } else if (name === 'questionText') {
      setQuestionText(value);
    } else if (name === 'questionType') {
      setQuestionType(value);
    } else if (name === 'options') {
      setOptions(value.split(','));
    }
  };

  if (!questionnaire) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Questionnaire</h1>
      <form onSubmit={handleUpdate} className="max-w-md mx-auto">
        <label htmlFor="title" className="block mb-2">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
        />

        <label htmlFor="description" className="block mb-2">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
        />

        <label htmlFor="questionId" className="block mb-2">Question ID:</label>
        <input
          type="text"
          id="questionId"
          name="questionId"
          value={questionId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
        />

        <label htmlFor="questionText" className="block mb-2">Question Text:</label>
        <input
          type="text"
          id="questionText"
          name="questionText"
          value={questionText}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
        />

        <label htmlFor="questionType" className="block mb-2">Question Type:</label>
        <select
          id="questionType"
          name="questionType"
          value={questionType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
        >
          <option value="multiple_choice">Multiple Choice</option>
          {/* Add other types if necessary */}
        </select>

        <label htmlFor="options" className="block mb-2">Options (comma-separated):</label>
        <input
          type="text"
          id="options"
          name="options"
          value={options.join(',')}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
        />

        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">
          Update Question
        </button>
      </form>
    </div>
  );
};

export default UpdateQuestionnaire;
