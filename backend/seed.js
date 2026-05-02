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

const seedPets = async () => {
  console.log('Seeding pets...');
  for (const pet of samplePets) {
    await pool.query(
      'INSERT INTO pets (name, species, breed, age, location, image, description, status) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING',
      [pet.name, pet.species, pet.breed, pet.age, pet.location, pet.image, pet.description, 'available']
    );
  }
  console.log('Pets seeded!');
};

const seedAdmin = async () => {
  console.log('Creating admin user...');
  const passwordHash = await bcrypt.hash('admin123', 10);
  await pool.query(
    'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
    ['admin@petadoption.com', passwordHash, 'Admin User', 'admin']
  );
  console.log('Admin user created!');
};

const runSeed = async () => {
  try {
    await seedPets();
    await seedAdmin();
    console.log('Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

runSeed();