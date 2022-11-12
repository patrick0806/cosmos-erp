import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Store } from '@shared/entities/store.entity';

import { CreateStoreDTO } from './dtos/request.dto';

@Injectable()
export class CreateService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async execute(store: CreateStoreDTO) {
    try {
      console.log(store, this.storeRepository);
    } catch (err) {
      console.log(err);
    }
  }
}
