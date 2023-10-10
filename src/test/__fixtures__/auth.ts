export const passingUser = {
  email: 'should@pass.com',
  password: 'testpassword',
};

export const failingUser = {
  email: 'should@fail.com',
  password: 'testpassword',
};

export const jwtFixture = {
  access_token: 'testtoken',
  refresh_token: 'testtoken',
};

export const userFixture = {
  id: 1,
  email: 'john@mail.com',
  password: 'changeme',
  name: 'Jhon',
  role: 'customer' as 'customer' | 'admin',
  avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
};

export const newUserFixture = {
  email: passingUser.email, // So the subsequent login succeeds
  password: 'changeme',
  name: 'Jhon',
  role: 'customer' as 'customer',
  avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
};
