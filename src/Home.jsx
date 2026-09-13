import React, { useContext, useState, useEffect, useRef } from 'react';
import { GachaContext } from './App';

function Home() {
  const { capsules, addCapsule, deleteCapsule, addHistory } = useContext(GachaContext);
  
  const [showEmptyModal, setShowEmptyModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDrawnModal, setShowDrawnModal] = useState(false);
  const [drawnCapsule, setDrawnCapsule] = useState(null);
  
  const [newText, setNewText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Generate random positions for capsules in the dome
  const [domeCapsules, setDomeCapsules] = useState([]);
  
  useEffect(() => {
    // Generate positions for current capsules (max 20 to avoid clutter)
    const displayCapsules = capsules.slice(0, 20).map(c => ({
      ...c,
      top: `${Math.random() * 70 + 10}%`,
      left: `${Math.random() * 70 + 10}%`
    }));
    setDomeCapsules(displayCapsules);
  }, [capsules]);

  const handleMachineClick = () => {
    if (isAnimating) return;
    
    if (capsules.length === 0) {
      setShowEmptyModal(true);
      return;
    }
    
    // Pick random capsule
    const randomIndex = Math.floor(Math.random() * capsules.length);
    const selected = capsules[randomIndex];
    
    setIsAnimating(true);
    setDrawnCapsule(selected);
    
    // Wait for animation to finish (1.5s total)
    setTimeout(() => {
      setIsAnimating(false);
      setShowDrawnModal(true);
    }, 1500);
  };

  const handleAdd = () => {
    if (newText.trim()) {
      addCapsule(newText.trim());
      setNewText('');
      setShowAddModal(false);
    }
  };

  const handlePutBack = () => {
    if (drawnCapsule) {
      addHistory(drawnCapsule, 'kept');
    }
    setShowDrawnModal(false);
    setDrawnCapsule(null);
  };

  const handleDiscard = () => {
    if (drawnCapsule) {
      addHistory(drawnCapsule, 'discarded');
      deleteCapsule(drawnCapsule.id);
    }
    setShowDrawnModal(false);
    setDrawnCapsule(null);
  };

  return (
    <>
      <div className="gumball-machine-wrapper" onClick={handleMachineClick}>
        <img src="/empty_gumball_machine.png" alt="Gumball Machine" className="gumball-machine-img" />
        <div className="dome-area">
          {domeCapsules.map(c => (
            <div 
              key={c.id} 
              className="capsule-in-dome"
              style={{ backgroundColor: c.color, top: c.top, left: c.left }}
            />
          ))}
        </div>
      </div>

      {isAnimating && drawnCapsule && (
        <div style={{ position: 'absolute', top: '50%', left: '45%' }}>
          <div 
            className="capsule-in-dome capsule-animation" 
            style={{ backgroundColor: drawnCapsule.color, width: '32px', height: '32px' }}
          />
        </div>
      )}

      {/* FAB to Add */}
      <button className="pixel-btn fab" onClick={() => setShowAddModal(true)}>+</button>

      {/* Empty Modal */}
      {showEmptyModal && (
        <div className="modal-overlay">
          <div className="modal-content pixel-box">
            <p>The machine is empty, please insert some capsules first.</p>
            <button className="pixel-btn" onClick={() => setShowEmptyModal(false)}>OK</button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content pixel-box">
            <p>Add new text:</p>
            <input 
              type="text" 
              className="pixel-input" 
              value={newText} 
              onChange={e => setNewText(e.target.value)}
              placeholder="e.g. Eat pizza"
              autoFocus
            />
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button className="pixel-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="pixel-btn" onClick={handleAdd}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Drawn Modal */}
      {showDrawnModal && drawnCapsule && (
        <div className="modal-overlay">
          <div className="modal-content pixel-box capsule-pop">
            <div 
              style={{ 
                width: '48px', height: '48px', borderRadius: '50%', 
                backgroundColor: drawnCapsule.color, border: '4px solid black',
                margin: '0 auto 16px' 
              }}
            />
            <h3>You drew:</h3>
            <p style={{ margin: '16px 0', fontSize: '16px' }}>{drawnCapsule.text}</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="pixel-btn" onClick={handlePutBack}>Put back</button>
              <button className="pixel-btn" onClick={handleDiscard}>Discard</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
