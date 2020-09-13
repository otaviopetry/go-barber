import handlebars from 'handlebars';
import fs from 'fs';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
    public async parse({
        file,
        variables,
    }: IParseMailTemplateDTO): Promise<string> {
        // get the template file from file system
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });

        // inside compile we can pass anything we want
        const parseTemplate = handlebars.compile(templateFileContent);

        // and here we call this parseTemplate function with the variables
        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplateProvider;
