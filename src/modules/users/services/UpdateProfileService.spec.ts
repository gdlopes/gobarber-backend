import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('it should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Gustavo Lopes',
      email: 'gustavo_lopes@gmail.com',
    });

    expect(updatedUser.name).toBe('Gustavo Lopes');
    expect(updatedUser.email).toBe('gustavo_lopes@gmail.com');
  });

  it('it should not be able to update a profile of a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        name: 'Gustavo Lopes',
        email: 'gustavo_lopes@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('it should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Gustavo Lopes',
        email: 'gustavo@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('it should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Gustavo Lopes',
      email: 'gustavo_lopes@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('it should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Gustavo Lopes',
        email: 'gustavo_lopes@gmail.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('it should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Gustavo Lopes',
        email: 'gustavo_lopes@gmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
