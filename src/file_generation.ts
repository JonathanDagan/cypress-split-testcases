import fs from "fs-extra";
import path from "path";
import _ from "lodash";

import { Config } from "./config";
const config = new Config;


const defaultCyTestPath = "cypress/integration";

class FileGeneration {
    constructor(private testPath: string = defaultCyTestPath) {

    }

    async generateTestFiles() {
        const testCases = (
            await import(path.join(__dirname, this.testPath, config.TEST_CASES_FILENAME))
        ).default;
        const chunks = _.chunk(testCases, config.NUMBER_OF_TEST_CASES);

        const specTemplate = fs
            .readFileSync(
                path.join(__dirname, this.testPath, config.TEMPLATE_FOLDER, config.TEMPLATE_FILENAME)
            )
            .toString();
        const configTemplate = fs
            .readFileSync(
                path.join(__dirname, this.testPath, config.TEMPLATE_FOLDER, config.CONFIG_FILENAME)
            )
            .toString();

        chunks.forEach((chunk, index) => {
            const folderPath = path.join(
                __dirname,
                this.testPath,
                config.TEST_CASE_FOLDERNAME + index
            );
            fs.ensureDirSync(folderPath);
            fs.writeFileSync(
                path.join(folderPath, config.TEMPLATE_FILENAME),
                specTemplate
            );
            fs.writeFileSync(
                path.join(folderPath, config.CONFIG_FILENAME),
                configTemplate.replace(
                    config.KEY_TO_REPLACE,
                    JSON.stringify(chunk, null, 4) + ";"
                )
            );
        });
    }

    async createGitIgnore(contents: string) {
        console.log(this.testPath);

    }

}

