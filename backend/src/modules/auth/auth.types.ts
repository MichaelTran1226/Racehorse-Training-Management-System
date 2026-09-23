export type ActorRole = 'HEAD_TRAINER' | 'VETERINARIAN' | 'GROOM' | 'HORSE_OWNER' | 'CLUB_MANAGER';
export const DEMO_ACCOUNTS = [
  { email: 'headtrainer@gmail.com', password: 'equi123', fullName: 'Head Trainer', role: 'HEAD_TRAINER' as ActorRole },
  { email: 'veterinarian@gmail.com', password: 'equi123', fullName: 'Veterinarian', role: 'VETERINARIAN' as ActorRole },
  { email: 'groom@gmail.com', password: 'equi123', fullName: 'Groom / Stable Hand', role: 'GROOM' as ActorRole },
  { email: 'horseowner@gmail.com', password: 'equi123', fullName: 'Horse Owner', role: 'HORSE_OWNER' as ActorRole },
  { email: 'clubmanager@gmail.com', password: 'equi123', fullName: 'Club Manager', role: 'CLUB_MANAGER' as ActorRole },
];
