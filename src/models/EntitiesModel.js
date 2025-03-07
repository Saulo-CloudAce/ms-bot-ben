export default class EntitiesModel {

  constructor(database = {}, logger = {}) {
    this.database = database
    this.logger = logger
  }

  async get(ia_id, id = null, active = null) {
    try {
      const whereIn = { ia_id }

      if (id) {
        whereIn.id = id
      }

      if (active) {
        whereIn.active = active
      }

      return await this.database('entities')
        .select('id', 'entity', 'value', 'active', 'type', 'created_at', 'updated_at')
        .where(whereIn)

    } catch (err) {
      this.logger.error(err, `Não foi possivel retornar a Entidade`)
      return err
    }
  }

  async create(obj) {
    try {
      return await this.database('entities').returning(['entities.id']).insert(obj)

    } catch (err) {
      return { error: 'Linha 10: Não foi possivel criar a Entidade', message: err }
    }
  }

  async update(obj) {
    try {
      const { id } = obj

      const result = await this.database('entities')
        .returning(['id', 'entity', 'value', 'type', 'active', 'created_at', 'updated_at'])
        .update(obj)
        .where({ id })

      return result.rows

    } catch (err) {
      return { error: 'Linha 10: Não foi possivel atualizar a Entidade', message: err }
    }
  }


}