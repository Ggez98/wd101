document.addEventListener('DOMContentLoaded', function() {
  const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
  const table = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];

  function displayEntries() {
    table.innerHTML = '';
    storedEntries.forEach(entry => {
      const newRow = table.insertRow(-1);
      Object.values(entry).forEach(value => {
        const cell = newRow.insertCell();
        cell.textContent = value;
      });
    });
  }

  displayEntries();

  document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('terms').checked;

    if (validateEmail(email) && validateAge(dob)) {
      storedEntries.push({ name, email, password, dob, acceptedTerms });
      localStorage.setItem('entries', JSON.stringify(storedEntries));
      displayEntries();
      document.getElementById('registrationForm').reset();
    } else {
      alert('Please enter a valid email address and ensure you are between 18 and 55 years old.');
    }
  });

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18 && age <= 55;
  }
});
