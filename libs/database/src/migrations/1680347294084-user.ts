import { MigrationInterface, QueryRunner, Table} from "typeorm"

export class user1680347294084 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'user',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  unsigned: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'email',
                  type: 'varchar',
                  length: '36',
                  isNullable: false,
                },
                {
                  name: 'password',
                  type: 'varchar',
                  length: '36',
                  isNullable: false,
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}