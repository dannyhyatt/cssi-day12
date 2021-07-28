let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};
const handleNoteSubmit = () => {
    firebase.database().ref(googleUser.uid).push({
        title: document.querySelector('#noteTitle').value,
        text: document.querySelector('#noteText').value,
  }).then((_) => console.log('success')).catch(e => console.log(e));
};