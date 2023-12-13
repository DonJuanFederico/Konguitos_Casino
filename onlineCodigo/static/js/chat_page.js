document.addEventListener("DOMContentLoaded", () => {
    let msg = document.querySelector("#user-message");
    msg.addEventListener("keyup", event => {
        event.preventDefault();
        if(event.keyCode === 13){
            document.querySelector("#send-message").click();
        }
    })
})