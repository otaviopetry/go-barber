import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

// dealing with database migrations changes in a team environment
export default class AlterProviderFieldToProviderId1594330057866
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // delete the column created previously on appoinments table
        await queryRunner.dropColumn('appointments', 'provider');

        // add the new column provider_id
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        // create the relation, foreseeing possible interactions like user deletion or id update for whatever reason
        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentProvider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // undo the foreign key
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        // undo the new column creation
        await queryRunner.dropColumn('appointments', 'provider_id');

        // undo the previous column deletion
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }),
        );
    }
}
