import { Car } from 'src/api/car/entities/car.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Car, (faker) => {
  const car = new Car();

  const price = faker.number.float({ min: 10, max: 100, multipleOf: 0.02 });

  car.gasoline = faker.number.int({ min: 10, max: 99 });
  car.price = price;
  car.sale_price = +Math.fround(price - (price * 10) / 100).toFixed(2);
  car.avg_rating = faker.number.float({ min: 1, max: 5, multipleOf: 0.02 });
  car.capacity = { id: faker.number.int({ min: 1, max: 6 }) };
  car.car_type = { id: faker.number.int({ min: 1, max: 6 }) };
  car.steering = { id: faker.number.int({ min: 1, max: 2 }) };

  return car;
});
