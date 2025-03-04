import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Order } from './order.entity';

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order> {
  listenTo() {
    return Order;
  }

  afterInsert(event: InsertEvent<any>) {
    const repo = event.manager.connection.getRepository(Order);
    event.entity.code = `#${(event.entity.id + '').padStart(4, '0')}`;
    repo.update(event.entityId, { code: event.entity.code });
  }
}
