import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1600896301074
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // add the new column provider_id
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        // create the relation, foreseeing possible interactions like user deletion or id update for whatever reason
        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // undo the foreign key
        await queryRunner.dropForeignKey('appointments', 'AppointmentUser');

        // undo the new column creation
        await queryRunner.dropColumn('appointments', 'user_id');
    }
}
