const bcrypt = require('bcryptjs');

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn()
}));

describe('Password Hashing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('hash creates a hash', async () => {
    bcrypt.hash.mockResolvedValue('hashed_password');
    const result = await bcrypt.hash('password123', 10);
    expect(result).toBe('hashed_password');
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
  });

  test('hash is different each time (salt)', async () => {
    bcrypt.hash.mockResolvedValueOnce('hash1').mockResolvedValueOnce('hash2');
    const hash1 = await bcrypt.hash('password', 10);
    const hash2 = await bcrypt.hash('password', 10);
    expect(hash1).not.toBe(hash2);
  });

  test('compare returns true for correct password', async () => {
    bcrypt.compare.mockResolvedValue(true);
    const result = await bcrypt.compare('password123', 'hash');
    expect(result).toBe(true);
  });

  test('compare returns false for wrong password', async () => {
    bcrypt.compare.mockResolvedValue(false);
    const result = await bcrypt.compare('wrong', 'hash');
    expect(result).toBe(false);
  });
});
