import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import { UploadImagesDTO } from './dtos';

@Injectable()
export class ImagekitConnector {
  private connection: AxiosInstance;
  constructor() {
    this.connection = axios.create({
      baseURL: 'https://upload.imagekit.io/api/v1',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      auth: {
        username: process.env.IMAGEKIT_PRIVATE_KEY,
        password: undefined,
      },
      timeout: 5000,
    });
  }

  async uploadImage({
    image,
  }: UploadImagesDTO.RequestDTO): Promise<UploadImagesDTO.ResponseDTO> {
    try {
      const { data } = await this.connection.post<UploadImagesDTO.ResponseDTO>(
        '/files/upload',
        {
          file: Buffer.from(image.buffer).toString('base64'),
          fileName: image.fieldname,
        },
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
