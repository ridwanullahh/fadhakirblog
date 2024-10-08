
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import ReactMarkdown from 'react-markdown';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor = ({ value, onChange }) => {
  const [isMarkdown, setIsMarkdown] = useState(false);

  const handleToggle = () => {
    setIsMarkdown(!isMarkdown);
  };

  return (
    <div>
      <button onClick={handleToggle}>
        {isMarkdown ? 'Switch to Rich Text' : 'Switch to Markdown'}
      </button>
      {isMarkdown ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '100%', height: '200px' }}
        />
      ) : (
        <ReactQuill value={value} onChange={onChange} />
      )}
      <div>
        <h3>Preview:</h3>
        {isMarkdown ? (
          <ReactMarkdown>{value}</ReactMarkdown>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: value }} />
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;
