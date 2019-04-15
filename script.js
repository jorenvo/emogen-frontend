{
    const submitButton = document.querySelector("#submit");
    const input = document.querySelector("#link");
    const result = document.querySelector("#result");
    const shortened = document.querySelector("#shortened-link");
    const copyButton = document.querySelector("#copy");

    submitButton.addEventListener("click", async event => {
        event.preventDefault();

        submitButton.disabled = true;
        result.style.visibility = "hidden";
        result.style.webkitAnimation = "";

        const response = await fetch("http://localhost:8080", {
            method: "POST",
            body: JSON.stringify({ link: input.value })
        });

        const json = await response.json();

        // correctly handle current URL ending with / and link starting with /
        const shortenedURL =
            window.location.href.replace(/\/$/, "") +
            "/" +
            json.link.replace(/^\//, "");
        shortened.innerHTML = shortenedURL;
        shortened.href = shortenedURL;

        result.style.webkitAnimation = "none";
        setTimeout(function() {
            result.style.webkitAnimation = "";
            result.style.visibility = "visible";
            submitButton.disabled = false;
        }, 20);
    });

    copyButton.addEventListener("click", _ => {
        let textArea = document.createElement("textarea");

        // decode the URI href, otherwise emojis will appear encoded
        textArea.value = decodeURIComponent(shortened.href);

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    });
}
