import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvider = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  });

  it('it should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Joao',
      email: 'joao@gmail.com',
      password: '123456',
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'Gabriel',
      email: 'gabriel@gmail.com',
      password: '123456',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
