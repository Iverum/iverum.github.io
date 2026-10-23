(function () {
    var adviseForm; // Used to hold the advise interface
    var commandInput; // User input element
    var logSection; // Holds output from advise

    function interpret(command) {
        return "I don't understand.";
    };

    // Gets the command from the input and then clears the value
    function getCommand() {
        const command = commandInput.value;
        commandInput.value = "";
        return command;
    }

    function write(text) {
        const pElement = document.createElement("p");
        pElement.textContent = text;
        logSection.appendChild(pElement);
    }

    function init() {
        console.info("===ADVISE===");
        adviseForm = document.getElementById("advise");
        commandInput = document.getElementById("command");
        logSection = document.getElementById("log");

        // Add our submit event listener
        adviseForm.addEventListener("submit", (ev) => {
            ev.preventDefault();
            const command = getCommand();
            write(`> ${command}`);
            const response = interpret(command);
            write(response);
        });
    };

    document.addEventListener("DOMContentLoaded", init());
})();
