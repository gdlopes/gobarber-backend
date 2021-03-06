import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUser from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUser;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUser(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'gustavo@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with an invalid email', async () => {
    await expect(
      authenticateUser.execute({
        email: 'gustavo123@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with an invalid password', async () => {
    await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'gustavo@gmail.com',
        password: '12345666666',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
