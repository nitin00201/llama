'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';


function QuestionnaireForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questionId: '',
    questionText: '',
    questionType: 'multiple_choice',
    options: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const optionsArray = formData.options.split(',').map(option => option.trim());

      const schema = {
        title: formData.title,
        description: formData.description,
        schema: {
          questions: [
            {
              id: formData.questionId,
              text: formData.questionText,
              type: formData.questionType,
              options: optionsArray
            }
          ]
        },
        option: {
          options: optionsArray.map((option, index) => ({ id: index + 1, text: option }))
        }
      };

      const response = await fetch('http://localhost:3000/api/v1/questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(schema),

      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      // Handle success
      console.log('Data submitted successfully');
router.push("/show")
    } catch (error) {
      // Handle error
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Schema</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label htmlFor="title" className="block mb-2">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4" />

        <label htmlFor="description" className="block mb-2">Description:</label>
        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4" />

        <label htmlFor="questionId" className="block mb-2">Question ID:</label>
        <input type="text" id="questionId" name="questionId" value={formData.questionId} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4" />

        <label htmlFor="questionText" className="block mb-2">Question Text:</label>
        <input type="text" id="questionText" name="questionText" value={formData.questionText} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4" />

        <label htmlFor="questionType" className="block mb-2">Question Type:</label>
        <select id="questionType" name="questionType" value={formData.questionType} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4">
          <option value="multiple_choice">Multiple Choice</option>
          {/* Add other question types if needed */}
        </select>

        <label htmlFor="options" className="block mb-2">Options (comma-separated):</label>
        <input type="text" id="options" name="options" value={formData.options} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4" />

        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">Generate Question</button>
      </form>
    </div>
  );
}

export default QuestionnaireForm;
