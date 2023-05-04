import multer from 'multer';

export const multerUploadFile = (): multer.Multer => {
  const diskStorage = multer.diskStorage({
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileFormat = file.originalname.split('.');
      cb(
        null,
        `${file.fieldname}-${uniqueSuffix}.${
          fileFormat[fileFormat.length - 1]
        }`,
      );
    },
  });

  return multer({ storage: diskStorage });
};
