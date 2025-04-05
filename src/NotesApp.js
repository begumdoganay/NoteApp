import './NotesApp.css';

import React, { useState, useEffect } from 'react';

const NotesApp = () => {
  // State tanımlamaları
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffecf1'); // Varsayılan renk - pastel pembe
  const [searchText, setSearchText] = useState('');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [showUserNameModal, setShowUserNameModal] = useState(!localStorage.getItem('userName'));

  // Yerel depolamadan notları yükleme
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Notlar değiştiğinde yerel depolamaya kaydetme
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Kullanıcı adını kaydetme
  const saveUserName = () => {
    if (userName.trim() !== '') {
      localStorage.setItem('userName', userName);
      setShowUserNameModal(false);
    }
  };

  // Yeni not ekleme fonksiyonu
  const addNote = () => {
    if (newNote.trim() !== '') {
      const currentDate = new Date();
      const newNoteObj = {
        id: Date.now(),
        text: newNote,
        color: selectedColor,
        date: currentDate.toLocaleString(),
        likes: 0,
        comments: [],
        shared: false,
        userName: userName || 'Misafir'
      };
      setNotes([newNoteObj, ...notes]);
      setNewNote('');
    }
  };

  // Not silme fonksiyonu
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Not beğenme fonksiyonu
  const likeNote = (id) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        return { ...note, likes: note.likes + 1 };
      }
      return note;
    }));
  };

  // Not yorum ekleme fonksiyonu
  const addComment = (id, comment) => {
    if (comment.trim() !== '') {
      setNotes(notes.map(note => {
        if (note.id === id) {
          return {
            ...note,
            comments: [...note.comments, {
              id: Date.now(),
              text: comment,
              userName: userName || 'Misafir',
              date: new Date().toLocaleString()
            }]
          };
        }
        return note;
      }));
    }
  };

  // Not paylaşma fonksiyonu
  const shareNote = (id) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        return { ...note, shared: !note.shared };
      }
      return note;
    }));

    // Paylaşılan not
    const sharedNote = notes.find(note => note.id === id);
    if (sharedNote && !sharedNote.shared) {
      // Simüle edilmiş paylaşım
      alert(`"${sharedNote.text.substring(0, 30)}${sharedNote.text.length > 30 ? '...' : ''}" notunuz sosyal medyada paylaşıldı!`);
    }
  };

  // Arama filtreleme işlemi
  const filteredNotes = notes.filter(note => 
    note.text.toLowerCase().includes(searchText.toLowerCase())
  );

  // Kullanılabilecek pastel renk seçenekleri (daha soft tonlar)
  const colorOptions = [
    { name: 'Pastel Pembe', value: '#ffecf1' },
    { name: 'Pastel Mavi', value: '#e6f3ff' },
    { name: 'Pastel Yeşil', value: '#e7f9e7' },
    { name: 'Pastel Sarı', value: '#fffbe6' },
    { name: 'Pastel Mor', value: '#f4eaff' },
    { name: 'Pastel Turuncu', value: '#fff0e6' },
    { name: 'Pastel Turkuaz', value: '#e6fffd' },
    { name: 'Pastel Lila', value: '#f0e6ff' }
  ];

  // CSS stilleri - daha yumuşak ve modern görünüm
  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '30px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#fafafa',
      borderRadius: '15px',
      boxShadow: '0 6px 15px rgba(0,0,0,0.05)',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '2.5rem',
      color: '#555',
      fontWeight: '300',
      letterSpacing: '1px'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: '20px'
    },
    userName: {
      fontSize: '16px',
      color: '#666',
      marginRight: '10px'
    },
    inputContainer: {
      marginBottom: '25px',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
    },
    textarea: {
      width: '100%',
      height: '120px',
      padding: '15px',
      borderRadius: '8px',
      border: '1px solid #eee',
      marginBottom: '15px',
      resize: 'vertical',
      fontSize: '16px',
      transition: 'border 0.3s',
      outline: 'none',
      ':focus': {
        border: '1px solid #a8a8a8'
      }
    },
    controls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '10px'
    },
    colorSelector: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexWrap: 'wrap'
    },
    colorLabel: {
      fontSize: '14px',
      color: '#888',
      marginRight: '5px'
    },
    colorOption: {
      width: '25px',
      height: '25px',
      borderRadius: '50%',
      cursor: 'pointer',
      border: '2px solid transparent',
      transition: 'transform 0.2s',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    selectedColorOption: {
      border: '2px solid #555',
      transform: 'scale(1.1)'
    },
    addButton: {
      padding: '10px 20px',
      backgroundColor: '#6c5ce7',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.2s',
      boxShadow: '0 2px 5px rgba(108, 92, 231, 0.3)',
      ':hover': {
        backgroundColor: '#5b4bc4',
        transform: 'translateY(-2px)'
      }
    },
    searchContainer: {
      position: 'relative',
      marginBottom: '30px'
    },
    searchIcon: {
      position: 'absolute',
      left: '15px',
      top: '12px',
      color: '#888'
    },
    searchInput: {
      width: '100%',
      padding: '12px 15px 12px 40px',
      borderRadius: '30px',
      border: '1px solid #eee',
      fontSize: '16px',
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
      outline: 'none',
      transition: 'all 0.3s'
    },
    notesList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '25px'
    },
    note: {
      padding: '20px',
      borderRadius: '12px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '180px',
      transition: 'all 0.3s',
      ':hover': {
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        transform: 'translateY(-3px)'
      }
    },
    noteHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px'
    },
    noteAuthor: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#555'
    },
    noteText: {
      flex: '1',
      marginBottom: '15px',
      fontSize: '16px',
      lineHeight: '1.5',
      color: '#444',
      wordBreak: 'break-word'
    },
    noteFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      paddingTop: '10px',
      marginTop: 'auto'
    },
    noteDate: {
      fontSize: '12px',
      color: '#999'
    },
    socialActions: {
      display: 'flex',
      gap: '15px'
    },
    actionButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      color: '#888',
      fontSize: '14px',
      transition: 'color 0.2s'
    },
    actionIcon: {
      marginRight: '5px'
    },
    likeButton: {
      ':hover': {
        color: '#e74c3c'
      }
    },
    commentButton: {
      ':hover': {
        color: '#3498db'
      }
    },
    shareButton: {
      ':hover': {
        color: '#27ae60'
      }
    },
    commentSection: {
      marginTop: '15px',
      borderTop: '1px dashed rgba(0,0,0,0.1)',
      paddingTop: '10px'
    },
    commentForm: {
      display: 'flex',
      marginBottom: '10px'
    },
    commentInput: {
      flex: '1',
      padding: '8px 12px',
      borderRadius: '20px',
      border: '1px solid #eee',
      fontSize: '14px',
      outline: 'none'
    },
    commentSubmit: {
      marginLeft: '8px',
      backgroundColor: '#6c5ce7',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      padding: '5px 12px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    commentList: {
      maxHeight: '150px',
      overflowY: 'auto'
    },
    comment: {
      padding: '8px 0',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      fontSize: '14px'
    },
    commentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px'
    },
    commentAuthor: {
      fontWeight: '600',
      color: '#555',
      fontSize: '13px'
    },
    commentDate: {
      color: '#999',
      fontSize: '12px'
    },
    commentText: {
      color: '#666'
    },
    deleteButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'transparent',
      color: '#ff5e5e',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      width: '25px',
      height: '25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      opacity: '0.7',
      transition: 'all 0.2s',
      ':hover': {
        backgroundColor: 'rgba(255,94,94,0.1)',
        opacity: '1'
      }
    },
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000'
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '400px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    },
    modalTitle: {
      fontSize: '1.5rem',
      marginBottom: '20px',
      color: '#555',
      textAlign: 'center'
    },
    modalInput: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1px solid #eee',
      fontSize: '16px',
      marginBottom: '20px',
      outline: 'none'
    },
    modalButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#6c5ce7',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px'
    },
    sharedBadge: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: '#27ae60',
      color: 'white',
      padding: '3px 8px',
      borderRadius: '10px',
      fontSize: '12px',
      fontWeight: 'bold'
    }
  };

  // Yorum ekleme state'leri
  const [commentTexts, setCommentTexts] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

  // Yorum görüntüleme toggle
  const toggleComments = (id) => {
    setExpandedComments({
      ...expandedComments,
      [id]: !expandedComments[id]
    });
  };

  // Yorum girişi değişikliği
  const handleCommentChange = (id, text) => {
    setCommentTexts({
      ...commentTexts,
      [id]: text
    });
  };

  // Yorum gönderme
  const handleCommentSubmit = (id) => {
    if (commentTexts[id] && commentTexts[id].trim() !== '') {
      addComment(id, commentTexts[id]);
      setCommentTexts({
        ...commentTexts,
        [id]: ''
      });
    }
  };

  return (
    <div style={styles.container}>
      {showUserNameModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Hoş Geldiniz!</h2>
            <p style={{marginBottom: '15px', color: '#666', textAlign: 'center'}}>Notlarınızda görünecek kullanıcı adınızı girin</p>
            <input
              style={styles.modalInput}
              type="text"
              placeholder="Kullanıcı adınız"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button
              style={styles.modalButton}
              onClick={saveUserName}
            >
              Başla
            </button>
          </div>
        </div>
      )}

      <div style={styles.header}>
        <h1 style={styles.title}>Pastel Not</h1>
        <p style={{color: '#888', marginTop: '5px'}}>Düşüncelerinizi paylaşın, beğenin, kaydedin</p>
      </div>
      
      <div style={styles.userInfo}>
        <span style={styles.userName}>Merhaba, {userName || 'Misafir'}</span>
        {userName && (
          <button 
            style={{...styles.actionButton, fontWeight: 'bold'}}
            onClick={() => setShowUserNameModal(true)}
          >
            Değiştir
          </button>
        )}
      </div>
      
      <div style={styles.inputContainer}>
        <textarea
          style={styles.textarea}
          placeholder="Notunuzu buraya yazın..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        
        <div style={styles.controls}>
          <div style={styles.colorSelector}>
            <span style={styles.colorLabel}>Renk:</span>
            {colorOptions.map((color) => (
              <div
                key={color.value}
                style={{
                  ...styles.colorOption,
                  backgroundColor: color.value,
                  ...(selectedColor === color.value ? styles.selectedColorOption : {})
                }}
                onClick={() => setSelectedColor(color.value)}
                title={color.name}
              />
            ))}
          </div>
          
          <button
            className="add-button"
            style={styles.addButton}
            onClick={addNote}
          >
            Not Ekle
          </button>
        </div>
      </div>
      
      <div style={styles.searchContainer}>
        <div style={styles.searchIcon}>
          <svg 
            width="16" 
            height="16" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Notları ara..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      
      <div style={styles.notesList}>
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="note"
            style={{
              ...styles.note,
              backgroundColor: note.color
            }}
          >
            {note.shared && (
              <div style={styles.sharedBadge}>Paylaşıldı</div>
            )}
            
            <div style={styles.noteHeader}>
              <span style={styles.noteAuthor}>{note.userName}</span>
            </div>
            
            <p style={styles.noteText}>{note.text}</p>
            
            <div style={styles.noteFooter}>
              <span style={styles.noteDate}>{note.date}</span>
              
              <div style={styles.socialActions}>
                <button 
                  className="like-button"
                  style={{...styles.actionButton, ...styles.likeButton}}
                  onClick={() => likeNote(note.id)}
                >
                  <span style={styles.actionIcon}>❤️</span> 
                  {note.likes}
                </button>
                
                <button 
                  className="comment-button"
                  style={{...styles.actionButton, ...styles.commentButton}}
                  onClick={() => toggleComments(note.id)}
                >
                  <span style={styles.actionIcon}>💬</span> 
                  {note.comments.length}
                </button>
                
                <button 
                  style={{...styles.actionButton, ...styles.shareButton}}
                  onClick={() => shareNote(note.id)}
                >
                  <span style={styles.actionIcon}>{note.shared ? '✓' : '↗️'}</span>
                  Paylaş
                </button>
              </div>
            </div>
            
            {expandedComments[note.id] && (
              <div style={styles.commentSection}>
                <div style={styles.commentForm}>
                  <input 
                    style={styles.commentInput}
                    type="text"
                    placeholder="Yorum yaz..."
                    value={commentTexts[note.id] || ''}
                    onChange={(e) => handleCommentChange(note.id, e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(note.id)}
                  />
                  <button 
                    style={styles.commentSubmit}
                    onClick={() => handleCommentSubmit(note.id)}
                  >
                    Gönder
                  </button>
                </div>
                
                {note.comments.length > 0 && (
                  <div style={styles.commentList}>
                    {note.comments.map((comment) => (
                      <div key={comment.id} style={styles.comment}>
                        <div style={styles.commentHeader}>
                          <span style={styles.commentAuthor}>{comment.userName}</span>
                          <span style={styles.commentDate}>{comment.date}</span>
                        </div>
                        <p style={styles.commentText}>{comment.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <button
              className="delete-button"
              style={styles.deleteButton}
              onClick={() => deleteNote(note.id)}
              title="Notu Sil"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesApp;