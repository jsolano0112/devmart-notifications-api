import { seedNotifications } from '../../../notification/infraestructure/seeders/notification.seeder';
import { dbConnection } from '../db/mongodb.config';


(async () => {
  await dbConnection();
  await seedNotifications();
  console.log('✅ All seeders completed.');
  process.exit(0);
})();
