import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;

  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,

  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      // set the folder for uploads
      destination: tmpFolder,

      // handle unique filename generesation
      filename(request, file, callback) {
        // generate random hex string
        const fileHash = crypto.randomBytes(10).toString('hex');

        // add generated hex string to original filename
        const fileName = `${fileHash}-${file.originalname}`;

        // return final filename with no errors
        return callback(null, fileName);
      },
    }),
  },

  // configuration to use local file system - production environment
  config: {
    aws: {
      bucket: 'the-go-barber-bucket',
    },
  },
} as IUploadConfig;
