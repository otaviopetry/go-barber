import handlebars from 'handlebars';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
    public async parse({
        template,
        variables,
    }: IParseMailTemplateDTO): Promise<string> {
        // inside compile we can pass anything we want
        const parseTemplate = handlebars.compile(template);

        // and here we call this parseTemplate function with the variables
        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplateProvider;
