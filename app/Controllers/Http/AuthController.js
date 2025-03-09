'use strict'

const User = use('App/Models/User')

class AuthController {

    // async authenticate({request, auth}){
    //     const {email, password} = request.all()
    //     const token = await auth.attempt(email, password)
    
    //     return token
    // }

    async authenticate({ request, auth, response }) {
        const { email, password } = request.all();
    
        try {
            const token = await auth.attempt(email, password);
            return token;
        } catch (error) {
            return response.status(400).send({
                error: 'E-mail ou senha incorretos.',
            });
        }
    }

    // async register({ request}) {
    //     const data = request.only(['username', 'email', 'password', 'address'])
    //     const user = await User.create(data)

    //     return user
    // }

    async register({ request, auth, response }) {
        const data = request.only(['username', 'email', 'password', 'address', 'role']);
    
        try {
            const authUser = await auth.getUser();
            if (authUser.role !== 'admin' && data.role === 'admin') {
                return response.status(403).send({
                    error: 'Acesso negado. Apenas administradores podem criar usuários com role "admin".',
                });
            }
        } catch (error) {
            if (data.role === 'admin') {
                return response.status(403).send({
                    error: 'Acesso negado. Apenas administradores podem criar usuários com role "admin".',
                });
            }
        }
    
        const user = await User.create(data);
    
        return user;
    }

    async index () {
        const users = await User.all();

        return users
    }

    async show ({ params }) {
        const user = await User.findOrFail(params.id)

        return user
    }

    // async update ({ params, request }) {
    //     const user = await User.findOrFail(params.id)
    //     const data = request.only(['username', 'email', 'password', 'address'])

    //     user.merge(data)
    //     await user.save()

    //     return user
    // }

    async update({ params, request, auth, response }) {
        const user = await User.findOrFail(params.id);
        const data = request.only(['username', 'email', 'password', 'address', 'role']);
    
        const authUser = await auth.getUser();
        if (authUser.role !== 'admin' && data.role === 'admin') {
            return response.status(403).send({
                error: 'Acesso negado. Apenas administradores podem definir a role "admin".',
            });
        }
    
        user.merge(data);
        await user.save();
    
        return user;
    }

    async destroy({ params, auth, response }) {
        const authUser = await auth.getUser();
    
        if (authUser.role !== 'admin') {
            return response.status(403).send({ error: 'Acesso negado. Apenas administradores podem excluir usuários.' });
        }
    
        const user = await User.findOrFail(params.id);
        await user.delete();
    
        return response.status(204).send();
    }
    
}

module.exports = AuthController
