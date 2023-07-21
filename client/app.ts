// DOM manipulation : inputs
const nameInput: HTMLInputElement = document.querySelector("form input[name='name']") as HTMLInputElement;
const ageInput: HTMLInputElement = document.querySelector("form input[name='age']") as HTMLInputElement;
const emailInput: HTMLInputElement = document.querySelector("form input[name='email']") as HTMLInputElement;
// DOM manipulation : submit button
const buttonInput: HTMLInputElement = document.querySelector("form input[name='button']") as HTMLInputElement;
// DOM manipulation : list to display users
const userListElement: HTMLElement = document.querySelector("#users-list") as HTMLElement;

// Fetch users from Node/MongoDB backend server
const fetchUsers = (): void => {
    fetch("http://localhost:3000/api/users")
        .then((response) => response.json())
        .then((data) => displayUsers(data)); // Call displayUsers function with data from GET users API
};

// Display the fetched users from GET API
const displayUsers = (users: Array<{name: string, age: number, email: string}>): void => {
    users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${user.name}, ${user.age} ans (${user.email})`;
        userListElement.appendChild(listItem);
    });
};
fetchUsers();

// Send form data (user infos) to Node/MongoDB backend server
const sendFormData = () => {
    const newUser = {name: nameInput.value, age: parseInt(ageInput.value), email: emailInput.value}
    console.log(newUser)
    fetch("http://localhost:3000/api/users", {
        method: "POST",
        // headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newUser)})
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            alert("Vous avez été ajouté avec succès !")
            location.reload()
        });
}

// Trigger POST request to send form data
buttonInput.onclick = () => {
        if (nameInput.value !== "" && ageInput.value !== "" && ageInput.value !== "") sendFormData();
        else alert("Make sure to fill all the input fields.")
    };