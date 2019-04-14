(async() => {
    const submitButton = document.querySelector("#submit");
    const input = document.querySelector("#input");

    console.log(submitButton);

    submitButton.addEventListener("click", event => {
        event.preventDefault();
        fetch("http://localhost:8080", {
            method: "POST",
            body: JSON.stringify({ link: input.value })
        }).then(response => {
            response.json().then(json => console.log(json));
        });
    });
})();
