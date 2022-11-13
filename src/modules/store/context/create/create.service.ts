import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UploadImagesDTO } from '@shared/connector/imagekit/dtos';
import { ImagekitConnector } from '@shared/connector/imagekit/imagekit.connector';
import { Store } from '@shared/entities/store.entity';

import { CreateStoreRequestDTO } from './dtos/request.dto';

@Injectable()
export class CreateService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    private imagekitConnector: ImagekitConnector,
  ) {}

  async execute(store: CreateStoreRequestDTO, logo?: Express.Multer.File) {
    try {
      const alreadyExistStore = await this.storeRepository.findOne({
        where: { name: store.name },
      });

      if (alreadyExistStore) {
        throw new ConflictException('Already exist a store with this name');
      }
      let savedLogo: UploadImagesDTO.ResponseDTO;
      const newStoreData: Store = { ...store };

      if (logo) {
        savedLogo = await this.imagekitConnector.uploadImage({
          image: logo,
        });
        newStoreData.logo = savedLogo.url;
      }

      const newStore = await this.storeRepository.save({ ...newStoreData });
      return newStore;
    } catch (err) {
      console.log(err);
    }
  }
}
