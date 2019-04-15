{
    const submitButton = document.querySelector("#submit");
    const input = document.querySelector("#input");

    console.log(submitButton);

    submitButton.addEventListener("click", async event => {
        event.preventDefault();
        let response = await fetch("http://localhost:8080", {
            method: "POST",
            body: JSON.stringify({ link: input.value })
        });

        let json = await response.json();
        console.log(json);
    });
}
