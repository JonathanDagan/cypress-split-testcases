import inquirer, { Answers, prompt, Question } from "inquirer";
import { Subject } from 'rxjs';

// let choices = [
//     {key: "a", name: "b", value:"a"}
// ];

// // (async () => {
// //     // inquirer.prompt([])
// //     var { awnser } = await inquirer.prompt([
// //         {
// //             type: "list",
// //             message: "Pick the option you're using:",
// //             name: "option",
// //             choices: choices,
// //         },
// //     ]);
// //     // var promt = inquirer.createPromptModule()
// //     // promt({
// //     //     type: "list",
// //     //     message: "Pick the option you're using:",
// //     //     name: "option",
// //     //     choices: Object.keys(options)
// //     // })
// // })();

// inquirer
//     .prompt([
//         "asdasd"
//     ])



// import { CliQuestions } from './questions';

// TODO: check this https://github.com/SBoudrias/Inquirer.js/issues/701

class CliTool {
    private cliPrompt = new Subject<Question[]>();
    constructor() {
        console.log('Constructing CliTool Instance');
    }

    public run() {
        console.log('CliTool Instance Started');
        prompt(this.cliPrompt);

    }
}

const cliTool = new CliTool();

cliTool.run();