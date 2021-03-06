import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Gustavo',
      email: 'gustavo@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('name');
    expect(user.name).toBe('Gustavo');
  });

  it('should not be able to create a new user with an existent email', async () => {
    await createUser.execute({
      name: 'Gustavo',
      email: 'gustavo@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Gustavo',
        email: 'gustavo@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
