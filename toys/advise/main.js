const BASE_CASE = `
    "Please Advise"

    The Bridge is a room. "You are on the bridge of a starship."

    There is a control console here. "The lights of the control console flicker softly."
`;

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

    function write(text, element = "p") {
        const pElement = document.createElement(element);
        pElement.textContent = text;
        logSection.appendChild(pElement);
    }

    function run(board) {
        write(board.title, "h1");
        write(board.initialRoom.toString());
    }

    function init() {
        console.info("===ADVISE===");
        // get our interface
        adviseForm = document.getElementById("advise");
        commandInput = document.getElementById("command");
        logSection = document.getElementById("log");

        const advise = document.Advise;
        run(advise.interpret(BASE_CASE));

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
