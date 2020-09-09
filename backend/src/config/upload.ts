import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),

    // configuration to use local file system - production environment
    storage: multer.diskStorage({
        // set the folder for uploads
        destination: tmpFolder,

        // handle unique filename generation
        filename(request, file, callback) {
            // generate random hex string
            const fileHash = crypto.randomBytes(10).toString('hex');

            // add generated hex string to original filename
            const fileName = `${fileHash}-${file.originalname}`;

            // return final filename with no errors
            return callback(null, fileName);
        },
    }),
};
