import inquirer from "inquirer";

let options = { a: "a" };


(async () => {
    // inquirer.prompt([])
    var { awnser } = await inquirer.prompt([
        {
            type: "list",
            message: "Pick the option you're using:",
            name: "option",
            choices: Object.keys(options)
        }
    ])
    // var promt = inquirer.createPromptModule()
    // promt({
    //     type: "list",
    //     message: "Pick the option you're using:",
    //     name: "option",
    //     choices: Object.keys(options)
    // })

})()