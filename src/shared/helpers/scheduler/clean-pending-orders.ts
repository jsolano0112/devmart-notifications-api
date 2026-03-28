import cron from 'node-cron';
import { RepositoryContainer } from '../../infraestructure/respository-container';
import { CleanPendingOrders } from '../../../order/application/use-cases/clean-pending-orders.use.case';
export class Scheduler {
  private repo = new RepositoryContainer();
  private cleanPendingOrders = new CleanPendingOrders(this.repo);

  start() {
    cron.schedule('*/10 * * * * *', async () => {
      console.log('JOB RUNNING: Cancel pending orders.');
      try {
        await this.cleanPendingOrders.run();
      } catch (err) {
        console.error('JOB ERROR:', err);
      }
    });
  }
}
