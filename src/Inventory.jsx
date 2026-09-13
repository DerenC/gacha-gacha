import React, { useContext, useState } from 'react';
import { GachaContext } from './App';

function Inventory() {
  const { capsules, deleteCapsule, updateCapsule } = useContext(GachaContext);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (capsule) => {
    setEditingId(capsule.id);
    setEditText(capsule.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      updateCapsule(editingId, editText.trim());
      setEditingId(null);
    }
  };

  return (
    <div className="pixel-box" style={{ minHeight: '300px' }}>
      <h2>Available Capsules ({capsules.length})</h2>
      {capsules.length === 0 ? (
        <p>No capsules in the machine.</p>
      ) : (
        <ul className="item-list">
          {capsules.map(c => (
            <li key={c.id} style={{ borderBottom: '2px dashed black', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: c.color, border: '2px solid black' }} />
                {editingId === c.id ? (
                  <input 
                    type="text" 
                    className="pixel-input" 
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    style={{ marginBottom: 0 }}
                  />
                ) : (
                  <span style={{ fontSize: '14px', wordBreak: 'break-word' }}>{c.text}</span>
                )}
              </div>
              <div className="actions">
                {editingId === c.id ? (
                  <>
                    <button className="pixel-btn" onClick={handleSave}>Save</button>
                    <button className="pixel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="pixel-btn" onClick={() => handleEdit(c)}>Edit</button>
                    <button className="pixel-btn" onClick={() => deleteCapsule(c.id)}>Delete</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Inventory;
