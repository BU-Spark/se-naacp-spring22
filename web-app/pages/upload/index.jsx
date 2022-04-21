import React, { useState } from 'react';
import Button from '../../components/primary/Button';
import TogglableInput from '../../components/primary/TogglableInput';

import DragDropUploader from '../../components/secondary/DragDropUploader';
import { notify } from '../../helpers/notificationHelper';
import articleService from '../../services/articleService';

const initialState = {
  title: '',
  documentUrl: '',
};

export default function index() {
  const [apiLoading, setApiLoading] = useState(false);
  const [userInput, setUserInput] = useState(initialState);
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const [error, setError] = useState({});

  async function onSubmit(event) {
    event.preventDefault();
    setApiLoading(true);
    try {
      setError({});
      const response = await articleService.createArticle(userInput);
      setError({});
      setUserInput(initialState);
      setIsDocumentUploaded(false);
      notify.success(response.message || 'successfully uploaded article');
    } catch (err) {
      if (typeof err === 'string') {
        setError({ message: err });
      } else {
        setError(err);
      }
    }
    setApiLoading(false);
  }

  const onDocumentUploadComplete = url => {
    handleChange('documentUrl', url);
    setIsDocumentUploaded(true);
  };

  const handleChange = (id, value) => {
    setUserInput(prevValue => ({ ...prevValue, [id]: value }));
  };

  const { title, documentUrl } = userInput;

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-32 py-8 h-full">
      <TogglableInput
        name="title"
        placeHolder="Title"
        value={title}
        className="text-gray-700 py-2 px-2 text-xl focus:ring-0 focus:ring-gray-300 placeholder-gray-300 mt-4 w-10/12"
        onChange={(id, value) => handleChange(id, value)}
        error={error?.errors?.title}
      />
      <div className={`grid grid-cols-1 md:gap-16 md:grid-cols-2 mt-8 ${isDocumentUploaded ? '' : 'h-5/6'}`}>
        {isDocumentUploaded ? (
          <h2 className="text-green-400 font-semibold italic">document Uploaded successfully</h2>
        ) : (
          <DragDropUploader
            id="documentUrl"
            note=""
            uploadType="article"
            documentUrl={documentUrl}
            onError={err => setError({ errors: { documentUrl: err } })}
            updateArticleUrl={onDocumentUploadComplete}
            errorMessage={error?.errors?.headerImageUrl}
          />
        )}
      </div>
      <Button
        text="Submit"
        classNames=""
        onClick={onSubmit}
        loading={apiLoading}
        disabled={apiLoading}
        textClass="text-lg"
        classNames={`bg-blue-600 text-white mt-6 hover:bg-blue-500 ${error?.message ? 'ring ring-red-600' : ''}`}
      />
    </div>
  );
}
