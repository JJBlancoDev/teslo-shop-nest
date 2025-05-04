import { BadRequestException } from '@nestjs/common';

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file) return callback(new BadRequestException('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
  const isAllowed = allowedExtensions.includes(fileExtension);

  if (!isAllowed) {
    return callback(new BadRequestException(`File is not allowed`), false);
  }

  callback(null, true);
};
