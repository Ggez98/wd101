function isAdult(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age >= 18;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
  
    const table = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
    storedEntries.forEach(entry => {
      const newRow = table.insertRow(-1);
      Object.values(entry).forEach(value => {
        const cell = newRow.insertCell();
        cell.innerHTML = value;
      });
    });
  
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const dob = document.getElementById('dob').value;
      const acceptedTerms = document.getElementById('terms').checked;
  
      if (acceptedTerms && isAdult(dob)) {
        const newRow = table.insertRow(-1);
        const cells = [name, email, password, dob, acceptedTerms ? 'Yes' : 'No'];
        
        cells.forEach(value => {
          const cell = newRow.insertCell();
          cell.innerHTML = value;
        });
  
        storedEntries.push({ name, email, password, dob, acceptedTerms });
        localStorage.setItem('entries', JSON.stringify(storedEntries));
  
        document.getElementById('registrationForm').reset();
      } else {
        alert('You must be 18 or older and accept the terms to proceed.');
      }
    });
  
    document.getElementById('clearDataBtn').addEventListener('click', function() {
      localStorage.removeItem('entries');
      table.innerHTML = '';
      storedEntries.length = 0;
    });
  });
  
