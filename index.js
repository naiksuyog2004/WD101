
      // Function to validate form input and store in local storage
      function validateFormAndStore(event) {
        event.preventDefault(); // Prevent the default form submission

        const name = document.querySelector('input[name="name"]');
        const email = document.querySelector('input[name="email"]');
        const password = document.querySelector('input[name="password"]');
        const dob = document.querySelector('input[name="dob"]');
        const checkbox = document.querySelector('input[name="checkbox"]');

        if (
          name.value === "" ||
          email.value === "" ||
          password.value === "" ||
          dob.value === "" ||
          !checkbox.checked
        ) {
          alert("Please fill out all required fields and accept the terms.");
          return;
        }

        const dobDate = new Date(dob.value);
        const today = new Date();
        const minAge = 18;
        const maxAge = 55;

        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < dobDate.getDate())
        ) {
          age--;
        }

        if (age < minAge || age > maxAge) {
          alert("Date of birth must be between 18 and 55 years ago.");
          return;
        }
        const entry = {
          name: name.value,
          email: email.value,
          password: password.value,
          dob: dob.value,
          accepted: checkbox.checked,
        };

        // Get existing entries from local storage or initialize an empty array
        const entries = JSON.parse(localStorage.getItem("entries")) || [];

        // Add the new entry to the array
        entries.push(entry);

        // Store the updated array back in local storage
        localStorage.setItem("entries", JSON.stringify(entries));

        // Clear form fields after submission
        name.value = "";
        email.value = "";
        password.value = "";
        dob.value = "";
        checkbox.checked = false;

        // Update the table with the stored data
        updateTable(entries);
      }

      // Function to update the table with stored data
      function updateTable(entries) {
        const tableBody = document.querySelector("#tableData tbody");
        tableBody.innerHTML = ""; // Clear existing table rows

        entries.forEach((entry) => {
          const newRow = tableBody.insertRow();
          const nameCell = newRow.insertCell(0);
          const emailCell = newRow.insertCell(1);
          const passwordCell = newRow.insertCell(2);
          const dobCell = newRow.insertCell(3);
          const acceptedCell = newRow.insertCell(4);

          nameCell.textContent = entry.name;
          emailCell.textContent = entry.email;
          passwordCell.textContent = entry.password;
          dobCell.textContent = entry.dob;
          acceptedCell.textContent = entry.accepted ? "Yes" : "No";
        });
      }

      // Attach form submission event listener
      const form = document.querySelector("form");
      form.addEventListener("submit", validateFormAndStore);

      // Load existing data from local storage on page load
      window.addEventListener("load", () => {
        const entries = JSON.parse(localStorage.getItem("entries")) || [];
        updateTable(entries);
      });
      const minDate = new Date();
      const maxDate = new Date();
