import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { ImagekitConnector } from '@shared/connector/imagekit/imagekit.connector';
import { Store } from '@shared/entities/store.entity';

import { CreateService } from '../create.service';
import { mockResponse, paramsMock } from './mocks/response.mock';
describe('Get Countries Service', () => {
  let service: CreateService;
  let connector: ImagekitConnector;
  let repository: Repository<Store>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateService,
        {
          provide: ImagekitConnector,
          useValue: {
            uploadImage: jest.fn(),
          },
        },
        {
          provide: 'StoreRepository',
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateService>(CreateService);
    connector = module.get<ImagekitConnector>(ImagekitConnector);
    repository = module.get<Repository<Store>>('StoreRepository');
  });

  it('should be defined service and connector', () => {
    expect(service).toBeDefined();
    expect(connector).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should save and return a new store with success', async () => {
    jest.spyOn(connector, 'uploadImage').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'save').mockResolvedValue(mockResponse);

    const response = await service.execute(paramsMock.storeDTO);

    expect(connector.uploadImage).toBeCalledTimes(0);
    expect(repository.findOne).toBeCalledTimes(1);
    expect(repository.findOne).toBeCalledWith({
      where: { name: paramsMock.storeDTO.name },
    });
    expect(repository.save).toBeCalledTimes(1);
    expect(repository.save).toBeCalledWith(paramsMock.storeDTO);

    expect(response).toEqual(mockResponse);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should fail if has a store with same name', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockResponse);
    try {
      await service.execute(paramsMock.storeDTO);
      fail();
    } catch (err) {
      expect(repository.findOne).toBeCalledTimes(1);
      expect(repository.findOne).toBeCalledWith({
        where: { name: paramsMock.storeDTO.name },
      });
      expect(err.response).toEqual({
        statusCode: 409,
        message: 'Already exist a store with this name',
        error: 'Conflict',
      });
    }
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
