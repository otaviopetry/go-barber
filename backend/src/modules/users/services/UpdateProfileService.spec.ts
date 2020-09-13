import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
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
            fakeHashProvider,
        );
    });

    it('should be able to update profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Smith',
            email: 'johnsmith@example.com',
        });

        expect(updatedUser.name).toBe('John Smith');
        expect(updatedUser.email).toBe('johnsmith@example.com');
    });

    it('should not be able to change to another user email', async () => {
        // create an user to hold the email account
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        // create second user
        const user = await fakeUsersRepository.create({
            name: 'Caesar Salad',
            email: 'caesarsalad@example.com',
            password: '123456',
        });

        // second user tries to update his email to another email already registered
        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Caesar Salad',
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'johndoe@example.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password with empty or wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123123',
                old_password: 'wrong-old-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
