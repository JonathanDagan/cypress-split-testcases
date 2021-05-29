import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import yargs, { Argv, scriptName } from "yargs";

const argv = yargs
    .command("split", "", () => {
        scriptName: "cypress-split-testcases";
    })
    .scriptName("cypress-split-testcases")
    .usage("$0 <cmd> [args]")
    .command("path", "path to test dir")
    .help()
    .alias("help", "h").argv;

// console.log(argv)

const TEMPLATE_FOLDER = "test-template";
const TEMPLATE_FILENAME = "template.spec.js";
const CONFIG_FILENAME = "config.js";
const TEST_CASES_FILENAME = "test-cases.ts";
const TEST_CASE_FOLDERNAME = "test-case-";
const KEY_TO_REPLACE = "[];";
const NUMBER_OF_TEST_CASES = 4;

async function generateTestFiles(testPath: string) {
    const testCases = (
        await import(path.join(__dirname, testPath, TEST_CASES_FILENAME))
    ).default;
    const chunks = _.chunk(testCases, NUMBER_OF_TEST_CASES);

    const specTemplate = fs
        .readFileSync(
            path.join(__dirname, testPath, TEMPLATE_FOLDER, TEMPLATE_FILENAME)
        )
        .toString();
    const configTemplate = fs
        .readFileSync(
            path.join(__dirname, testPath, TEMPLATE_FOLDER, CONFIG_FILENAME)
        )
        .toString();

    chunks.forEach((chunk, index) => {
        const folderPath = path.join(
            __dirname,
            testPath,
            TEST_CASE_FOLDERNAME + index
        );
        fs.ensureDirSync(folderPath);
        fs.writeFileSync(
            path.join(folderPath, TEMPLATE_FILENAME),
            specTemplate
        );
        fs.writeFileSync(
            path.join(folderPath, CONFIG_FILENAME),
            configTemplate.replace(
                KEY_TO_REPLACE,
                JSON.stringify(chunk, null, 4) + ";"
            )
        );
    });
}

// (async () => {

// })
