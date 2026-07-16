class RepositoryBase {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        return await this.model.findAll();
    }

    async findOne(id) {
        return await this.model.findByPk(id);
    }

    async create(entity) {
        return await this.model.create(entity);
    }

    async update(id, entity) {
        const registro = await this.model.findByPk(id);

        if (!registro) {
            return null;
        }

        return await registro.update(entity);
    }

    async remove(id) {
        const registro = await this.model.findByPk(id);

        if (!registro) {
            return null;
        }

        await registro.destroy();

        return registro;
    }
}

export default RepositoryBase;