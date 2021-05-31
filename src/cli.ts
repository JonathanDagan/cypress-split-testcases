import inquirer from "inquirer";

let options = { a: "a" };


(async () => {
    var promt = inquirer.createPromptModule()
    promt({
        type: "list",
        message: "Pick the option you're using:",
        name: "option",
        choices: Object.keys(options)
    })

})();