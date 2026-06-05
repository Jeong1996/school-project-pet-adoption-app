const pool = require('./src/db');
const bcrypt = require('bcryptjs');

const samplePets = [
  { name: 'Buddy', species: 'dog', breed: 'Golden Retriever', age: 3, location: 'New York', image: 'https://images.unsplash.com/photo-1552053831-71592a090b13?w=400&h=400&fit=crop', description: 'Friendly and loves to play fetch! Great with kids.' },
  { name: 'Luna', species: 'dog', breed: 'Labrador', age: 2, location: 'Los Angeles', image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=400&fit=crop', description: 'Energetic pup who loves beach walks and swimming.' },
  { name: 'Max', species: 'dog', breed: 'German Shepherd', age: 4, location: 'Chicago', image: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=400&h=400&fit=crop', description: 'Loyal and protective. Well trained, loves running.' },
  { name: 'Bella', species: 'cat', breed: 'Persian', age: 1, location: 'New York', image: 'https://images.unsplash.com/photo-1579571957230-8d52f4c35d73?w=400&h=400&fit=crop', description: 'Sweet kitten who loves cuddles and sunny spots.' },
  { name: 'Charlie', species: 'cat', breed: 'Siamese', age: 2, location: 'San Francisco', image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop', description: 'Talkative and affectionate. Loves attention.' },
  { name: 'Lucy', species: 'dog', breed: 'Beagle', age: 5, location: 'Chicago', image: 'https://images.unsplash.com/photo-1505628346881-b72e27ae1f56?w=400&h=400&fit=crop', description: 'Gentle senior dog. Loves naps and treats.' },
  { name: 'Cooper', species: 'dog', breed: 'Poodle', age: 1, location: 'Boston', image: 'https://images.unsplash.com/photo-1625316708582-7c3873bad2c1?w=400&h=400&fit=crop', description: 'Playful puppy! Hypoallergenic and super smart.' },
  { name: 'Daisy', species: 'cat', breed: 'Maine Coon', age: 3, location: 'Seattle', image: 'https://images.unsplash.com/photo-1612438263955-e77d55359a57?w=400&h=400&fit=crop', description: 'Gentle giant. Loves people and other cats.' },
  { name: 'Rocky', species: 'dog', breed: 'Bulldog', age: 2, location: 'Miami', image: 'https://images.unsplash.com/photo-1583511655850-d5c3f26d7a6a?w=400&h=400&fit=crop', description: 'Cuddly couch potato. Great apartment dog.' },
  { name: 'Milo', species: 'cat', breed: 'British Shorthair', age: 4, location: 'Denver', image: 'https://images.unsplash.com/photo-1592194996308-7b43878e084a?w=400&h=400&fit=crop', description: 'Calm and independent. Low maintenance.' },
  { name: 'Coco', species: 'dog', breed: 'Golden Retriever', age: 2, location: 'Austin', image: 'https://images.unsplash.com/photo-1534361960057-19889db9629e?w=400&h=400&fit=crop', description: 'Puppy at heart! Loves everyone she meets.' },
  { name: 'Oliver', species: 'cat', breed: 'Ragdoll', age: 1, location: 'Portland', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop', description: 'Floppy kitten who goes limp when held. Sweet!' },
];

const sampleTestUsers = [
  { email: 'user1@test.com',  name: 'Alice Johnson',  password: 'password123' },
  { email: 'user2@test.com',  name: 'Bob Smith',      password: 'password123' },
  { email: 'user3@test.com',  name: 'Carol Davis',    password: 'password123' },
  { email: 'user4@test.com',  name: 'David Wilson',   password: 'password123' },
  { email: 'user5@test.com',  name: 'Emma Martinez',  password: 'password123' },
];

const sampleApplications = [
  { email: 'user1@test.com', petName: 'Buddy',  living_situation: 'House with a large fenced yard', experience: 'Grew up with two golden retrievers and have cared for dogs my whole life.', reason: 'I have wanted a Golden Retriever since I was a child and now have the time, space, and stable income to give one a loving home.' },
  { email: 'user2@test.com', petName: 'Bella',  living_situation: 'Quiet apartment with lots of sunlight', experience: 'Fostered three kittens through a local rescue last year.', reason: 'I work from home and want a calm companion to keep me company during the day.' },
  { email: 'user3@test.com', petName: 'Max',    living_situation: 'Suburban home with a big backyard', experience: 'Owned two German Shepherds previously and trained them in basic obedience.', reason: 'I am an active runner and would love a loyal companion to train and run with on trails.' },
  { email: 'user4@test.com', petName: 'Cooper', living_situation: 'Townhouse with a small yard', experience: 'My family had poodles when I was growing up.', reason: 'I have allergies but love dogs, so a hypoallergenic breed is a perfect fit for me.' },
  { email: 'user5@test.com', petName: 'Luna',   living_situation: 'House near the beach', experience: 'Volunteered at an animal shelter for two years walking dogs.', reason: 'I want a high-energy dog to join me on daily beach runs and weekend hikes.' },
];

const seedPets = async () => {
  console.log('Seeding pets...');
  let count = 0;
  for (const pet of samplePets) {
    const existing = await pool.query('SELECT id FROM pets WHERE name = $1 AND breed = $2', [pet.name, pet.breed]);
    if (existing.rowCount > 0) continue;
    await pool.query(
      'INSERT INTO pets (name, species, breed, age, location, image, description, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [pet.name, pet.species, pet.breed, pet.age, pet.location, pet.image, pet.description, 'available']
    );
    count += 1;
  }
  console.log(`Pets seeded (${count})`);
};

const seedUsers = async () => {
  console.log('Seeding users...');
  const passwordHash = await bcrypt.hash('password123', 10);
  let count = 0;
  for (const user of sampleTestUsers) {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [user.email]);
    if (existing.rowCount > 0) continue;
    await pool.query(
      'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4)',
      [user.email, passwordHash, user.name, 'user']
    );
    count += 1;
  }
  console.log(`Users seeded (${count})`);
};

const seedAdmin = async () => {
  console.log('Seeding admin user...');
  const existing = await pool.query('SELECT id FROM users WHERE email = $1', ['admin@test.com']);
  if (existing.rowCount > 0) {
    console.log('Admin user already exists, skipping');
    return;
  }
  const passwordHash = await bcrypt.hash('admin123', 10);
  await pool.query(
    'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4)',
    ['admin@test.com', passwordHash, 'Admin User', 'admin']
  );
  console.log('Admin user seeded (admin@test.com / admin123)');
};

const seedApplications = async () => {
  console.log('Seeding applications...');
  let count = 0;
  for (const app of sampleApplications) {
    const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [app.email]);
    const petResult = await pool.query('SELECT id FROM pets WHERE name = $1', [app.petName]);
    if (userResult.rowCount === 0 || petResult.rowCount === 0) continue;

    const userId = userResult.rows[0].id;
    const petId = petResult.rows[0].id;

    const exists = await pool.query(
      'SELECT id FROM applications WHERE user_id = $1 AND pet_id = $2',
      [userId, petId]
    );
    if (exists.rowCount > 0) continue;

    await pool.query(
      'INSERT INTO applications (user_id, pet_id, living_situation, experience, reason, status) VALUES ($1, $2, $3, $4, $5, $6)',
      [userId, petId, app.living_situation, app.experience, app.reason, 'pending']
    );
    count += 1;
  }
  console.log(`Applications seeded (${count})`);
};

const runSeed = async () => {
  try {
    await seedPets();
    await seedUsers();
    await seedAdmin();
    await seedApplications();
    console.log('Seed complete!');
  } catch (error) {
    console.error('Seed error:', error);
    throw error;
  }
};

module.exports = { runSeed, seedPets, seedUsers, seedAdmin, seedApplications };

if (require.main === module) {
  runSeed()
    .then(async () => {
      await pool.end();
      process.exit(0);
    })
    .catch(async () => {
      await pool.end();
      process.exit(1);
    });
}
