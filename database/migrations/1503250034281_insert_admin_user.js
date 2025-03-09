'use strict'

const Schema = use('Schema')
const Hash = use('Hash')

class InsertAdminUser extends Schema {
  async up () {
    const hashedPassword = await Hash.make('123456')

    await this.db.table('users').insert({
      username: 'admin',
      email: 'admin@admin',
      password: hashedPassword,
      address: 'Endereço do admin',
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    })
  }

  async down () {
    await this.db.table('users').where('email', 'admin@admin').delete()
  }
}

module.exports = InsertAdminUser