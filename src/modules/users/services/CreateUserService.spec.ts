import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Gustavo',
      email: 'gustavo@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('name');
    expect(user.name).toBe('Gustavo');
  });

  it('should not be able to create a new user with an existent email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

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
