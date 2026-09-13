import React, { useContext, useState } from 'react';
import { GachaContext } from './App';

function History() {
  const { history } = useContext(GachaContext);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="pixel-box" style={{ minHeight: '300px' }}>
      <h2>History ({history.length})</h2>
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <ul className="item-list">
          {history.map((item, index) => (
            <li 
              key={index} 
              style={{ 
                borderBottom: '2px dashed black', 
                paddingBottom: '16px',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => handleCopy(`${item.id}-${index}`, item.text)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: item.color, border: '2px solid black' }} />
                <span style={{ fontSize: '14px', wordBreak: 'break-word', textDecoration: item.status === 'discarded' ? 'line-through' : 'none' }}>
                  {item.text}
                </span>
              </div>
              <div style={{ fontSize: '10px', marginTop: '4px' }}>
                Status: {item.status.toUpperCase()}
              </div>
              {copiedId === `${item.id}-${index}` && (
                <div style={{ position: 'absolute', right: '0', top: '0', backgroundColor: 'black', color: 'white', padding: '4px', fontSize: '8px' }}>
                  COPIED!
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
