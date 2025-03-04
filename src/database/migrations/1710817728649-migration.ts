import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1710817728649 implements MigrationInterface {
  name = 'Migration1710817728649';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`refresh_tokens\` (\`id\` varchar(36) NOT NULL, \`expired_at\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, \`access_token_id\` varchar(36) NULL, UNIQUE INDEX \`UNQ_RefreshToken_AccessToken\` (\`access_token_id\`), UNIQUE INDEX \`REL_82e112b811eca68239766f625b\` (\`access_token_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`access_tokens\` (\`id\` varchar(36) NOT NULL, \`expired_at\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`car_translations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`language_code\` char(2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`car_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`steering_translations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`language_code\` char(2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`steering_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`steerings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`car_type_translations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`language_code\` char(2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`car_type_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`car_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`car_image_translations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`language_code\` char(2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`car_image_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`car_images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image_url\` varchar(255) NOT NULL, \`is_thumbnail\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`car_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`capacities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slot\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`location_translations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`language_code\` char(2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`location_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`allow_pickup_locations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`car_id\` int NULL, \`location_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`allow_dropoff_locations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`car_id\` int NULL, \`location_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`locations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`car_info\` json NOT NULL, \`pickup_date\` datetime NOT NULL, \`dropoff_date\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`order_id\` int NULL, \`pickup_location_id\` int NULL, \`dropoff_location_id\` int NULL, \`car_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cars\` (\`id\` int NOT NULL AUTO_INCREMENT, \`gasoline\` int NOT NULL, \`price\` double NOT NULL, \`sale_price\` double NOT NULL, \`avg_rating\` float NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`capacity_id\` int NULL, \`steering_id\` int NULL, \`car_type_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`reviews\` (\`id\` int NOT NULL AUTO_INCREMENT, \`avg_rating\` float NOT NULL, \`content\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, \`car_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`full_name\` varchar(255) NOT NULL, \`job\` varchar(255) NOT NULL, \`avatar_url\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`hashed_password\` varchar(255) NOT NULL, \`is_verified\` tinyint NOT NULL DEFAULT 0, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`payments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`payment_order_id\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`order_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`payment_methods\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`coupons\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` char(10) NOT NULL, \`type\` enum ('percentage', 'numeric') NOT NULL, \`amount\` double NOT NULL, \`quantity\` int NOT NULL, \`expired_at\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(10) NULL, \`customer_name\` varchar(255) NOT NULL, \`phone_number\` char(15) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`subtotal\` double NOT NULL, \`coupon_discount\` double NULL, \`tax\` double NOT NULL, \`total\` double NOT NULL, \`status\` enum ('pending', 'cancelled', 'open', 'paid') NOT NULL DEFAULT 'pending', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` varchar(36) NULL, \`payment_method_id\` int NULL, \`coupon_id\` int NULL, UNIQUE INDEX \`UNQ_OrderCode\` (\`code\`), INDEX \`IDX_Order_User\` (\`user_id\`), INDEX \`IDX_Order_PaymentMethod\` (\`payment_method_id\`), UNIQUE INDEX \`IDX_3e413c10c595c04c6c70e58a4d\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_RefreshToken_User\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_RefreshToken_AccessToken\` FOREIGN KEY (\`access_token_id\`) REFERENCES \`access_tokens\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`access_tokens\` ADD CONSTRAINT \`FK_AccessToken_User\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`car_translations\` ADD CONSTRAINT \`FK_CarTranslation_Car\` FOREIGN KEY (\`car_id\`) REFERENCES \`cars\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`steering_translations\` ADD CONSTRAINT \`FK_SteeringTranslation_Steering\` FOREIGN KEY (\`steering_id\`) REFERENCES \`steerings\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`car_type_translations\` ADD CONSTRAINT \`FK_CarTypeTranslation_CarType\` FOREIGN KEY (\`car_type_id\`) REFERENCES \`car_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`car_image_translations\` ADD CONSTRAINT \`FK_CarImageTranslation_CarImage\` FOREIGN KEY (\`car_image_id\`) REFERENCES \`car_images\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`car_images\` ADD CONSTRAINT \`FK_CarImage_Car\` FOREIGN KEY (\`car_id\`) REFERENCES \`cars\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`location_translations\` ADD CONSTRAINT \`FK_LocationTranslation_Location\` FOREIGN KEY (\`location_id\`) REFERENCES \`locations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`allow_pickup_locations\` ADD CONSTRAINT \`FK_AllowPickupLocation_Car\` FOREIGN KEY (\`car_id\`) REFERENCES \`cars\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`allow_pickup_locations\` ADD CONSTRAINT \`FK_AllowPickupLocation_Location\` FOREIGN KEY (\`location_id\`) REFERENCES \`locations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`allow_dropoff_locations\` ADD CONSTRAINT \`FK_AllowDropoffLocation_Car\` FOREIGN KEY (\`car_id\`) REFERENCES \`cars\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`allow_dropoff_locations\` ADD CONSTRAINT \`FK_AllowDropoffLocation_Location\` FOREIGN KEY (\`location_id\`) REFERENCES \`locations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_OrderDetail_Order\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_PickUpOrderDetail_Location\` FOREIGN KEY (\`pickup_location_id\`) REFERENCES \`locations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_DropOffOrderDetail_Location\` FOREIGN KEY (\`dropoff_location_id\`) REFERENCES \`locations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_OrderDetail_Car\` FOREIGN KEY (\`car_id\`) REFERENCES \`cars\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cars\` ADD CONSTRAINT \`FK_Car_Capacity\` FOREIGN KEY (\`capacity_id\`) REFERENCES \`capacities\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cars\` ADD CONSTRAINT \`FK_Car_Steering\` FOREIGN KEY (\`steering_id\`) REFERENCES \`steerings\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cars\` ADD CONSTRAINT \`FK_Car_CarType\` FOREIGN KEY (\`car_type_id\`) REFERENCES \`car_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_Review_User\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_Review_Car\` FOREIGN KEY (\`car_id\`) REFERENCES \`cars\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_Payment_Order\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_Order_User\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_Order_PaymentMethod\` FOREIGN KEY (\`payment_method_id\`) REFERENCES \`payment_methods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_Order_Coupon\` FOREIGN KEY (\`coupon_id\`) REFERENCES \`coupons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_Order_Coupon\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_Order_PaymentMethod\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_Order_User\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_Payment_Order\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_Review_Car\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_Review_User\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cars\` DROP FOREIGN KEY \`FK_Car_CarType\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cars\` DROP FOREIGN KEY \`FK_Car_Steering\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cars\` DROP FOREIGN KEY \`FK_Car_Capacity\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_OrderDetail_Car\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_DropOffOrderDetail_Location\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_PickUpOrderDetail_Location\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_OrderDetail_Order\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`allow_dropoff_locations\` DROP FOREIGN KEY \`FK_AllowDropoffLocation_Location\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`allow_dropoff_locations\` DROP FOREIGN KEY \`FK_AllowDropoffLocation_Car\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`allow_pickup_locations\` DROP FOREIGN KEY \`FK_AllowPickupLocation_Location\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`allow_pickup_locations\` DROP FOREIGN KEY \`FK_AllowPickupLocation_Car\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`location_translations\` DROP FOREIGN KEY \`FK_LocationTranslation_Location\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`car_images\` DROP FOREIGN KEY \`FK_CarImage_Car\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`car_image_translations\` DROP FOREIGN KEY \`FK_CarImageTranslation_CarImage\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`car_type_translations\` DROP FOREIGN KEY \`FK_CarTypeTranslation_CarType\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`steering_translations\` DROP FOREIGN KEY \`FK_SteeringTranslation_Steering\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`car_translations\` DROP FOREIGN KEY \`FK_CarTranslation_Car\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`access_tokens\` DROP FOREIGN KEY \`FK_AccessToken_User\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_RefreshToken_AccessToken\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_RefreshToken_User\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3e413c10c595c04c6c70e58a4d\` ON \`orders\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_Order_PaymentMethod\` ON \`orders\``,
    );
    await queryRunner.query(`DROP INDEX \`IDX_Order_User\` ON \`orders\``);
    await queryRunner.query(`DROP INDEX \`UNQ_OrderCode\` ON \`orders\``);
    await queryRunner.query(`DROP TABLE \`orders\``);
    await queryRunner.query(`DROP TABLE \`coupons\``);
    await queryRunner.query(`DROP TABLE \`payment_methods\``);
    await queryRunner.query(`DROP TABLE \`payments\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`reviews\``);
    await queryRunner.query(`DROP TABLE \`cars\``);
    await queryRunner.query(`DROP TABLE \`order_details\``);
    await queryRunner.query(`DROP TABLE \`locations\``);
    await queryRunner.query(`DROP TABLE \`allow_dropoff_locations\``);
    await queryRunner.query(`DROP TABLE \`allow_pickup_locations\``);
    await queryRunner.query(`DROP TABLE \`location_translations\``);
    await queryRunner.query(`DROP TABLE \`capacities\``);
    await queryRunner.query(`DROP TABLE \`car_images\``);
    await queryRunner.query(`DROP TABLE \`car_image_translations\``);
    await queryRunner.query(`DROP TABLE \`car_types\``);
    await queryRunner.query(`DROP TABLE \`car_type_translations\``);
    await queryRunner.query(`DROP TABLE \`steerings\``);
    await queryRunner.query(`DROP TABLE \`steering_translations\``);
    await queryRunner.query(`DROP TABLE \`car_translations\``);
    await queryRunner.query(`DROP TABLE \`access_tokens\``);
    await queryRunner.query(
      `DROP INDEX \`REL_82e112b811eca68239766f625b\` ON \`refresh_tokens\``,
    );
    await queryRunner.query(
      `DROP INDEX \`UNQ_RefreshToken_AccessToken\` ON \`refresh_tokens\``,
    );
    await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
  }
}
