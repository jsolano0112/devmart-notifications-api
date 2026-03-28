import { seedNotifications } from '../../../notification/infraestructure/seeders/notification.seeder';
import { seedOrders } from '../../../order/infraestructure/seeders/order.seeder';
import { seedProducts } from '../../../product/infraestructure/seeders/product.seeder';
import { seedSuppliers } from '../../../supplier/infraestructure/seeders/supplier.seeder';
import { seedUsers } from '../../../user/infraestructure/seeders/user.seeder';
import { dbConnection } from '../db/mongodb.config.ts';

(async () => {
  await dbConnection();
  await seedNotifications();
  await seedProducts();
  await seedSuppliers();
  await seedUsers();
  await seedOrders();
  console.log('✅ All seeders completed.');
  process.exit(0);
})();
