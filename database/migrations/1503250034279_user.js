'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('username', 80).notNullable()
      table.string('address', 500).notNullable()  
      table.enum('role', ['user', 'admin']).defaultTo('user').notNullable()
      table.timestamps()
    })
  }

 down () {
    this.drop('users')
  }
}

module.exports = UserSchema
