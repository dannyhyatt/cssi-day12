window.onload = (event) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      const googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      window.location = 'index.html'; 
    };
  });
};

const getNotes = (userId) => {
  const notesRef = firebase.database().ref(`${userId}`);
  notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderCard(data);
  });
};

const renderCard = (data) => {
  let cards = ``;
  for(const key in data) {
    const note = data[key];
    cards += createCard(note);

  }
  document.querySelector('#app').innerHTML = cards;
};

const createCard = (note) => {
  return `<div class="column is-one-quarter">
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
            ${note.title}
            </p>
        </header>
        <div class="card-content">
            <div class="content">
            ${note.text}
            </div>
        </div>
    </div>
  </div>`;
};