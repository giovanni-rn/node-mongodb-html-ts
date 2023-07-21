"use strict";
// DOM manipulation : inputs
const nameInput = document.querySelector("form input[name='name']");
const ageInput = document.querySelector("form input[name='age']");
const emailInput = document.querySelector("form input[name='email']");
// DOM manipulation : submit button
const buttonInput = document.querySelector("form input[name='button']");
// DOM manipulation : list to display users
const userListElement = document.querySelector("#users-list");
// Fetch users from Node/MongoDB backend server
const fetchUsers = () => {
    fetch("http://localhost:3000/api/users")
        .then((response) => response.json())
        .then((data) => displayUsers(data)); // Call displayUsers function with data from GET users API
};
// Display the fetched users from GET API
const displayUsers = (users) => {
    users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${user.name}, ${user.age} ans (${user.email})`;
        userListElement.appendChild(listItem);
    });
};
fetchUsers();
// Send form data (user infos) to Node/MongoDB backend server
const sendFormData = () => {
    const newUser = { name: nameInput.value, age: parseInt(ageInput.value), email: emailInput.value };
    console.log(newUser);
    fetch("http://localhost:3000/api/users", {
        method: "POST",
        // headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newUser)
    })
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        alert("Vous avez été ajouté avec succès !");
        location.reload();
    });
};
// Trigger POST request to send form data
buttonInput.onclick = () => {
    if (nameInput.value !== "" && ageInput.value !== "" && ageInput.value !== "")
        sendFormData();
    else
        alert("Make sure to fill all the input fields.");
};
