
const UserModel = require('../model/User');
const { hash } = require('bcryptjs');


module.exports = {


    async login(request, response) {

        const {fail} = request.query;
        return response.render('login/login', { title: "Login", fail: fail });
    },


    async logout(request, response) {

        request.logout();
        response.redirect('/');
        return response.redirect('/');
    },
    
    async signup(request, response) {

        return response.render('login/signup', { title: "Registre-se" });
    },

    async register(request, response) {
        const params = request.body
        
        if(params.senha != params.repsenha)
            return response.render('login/signup', { title: "Registre-se", fail: true, error_message: "Senhas não coincidem" });
        
        const check_user = await UserModel.findAll({
            where: {
                email: params.email
            }
        });

        if(check_user.length > 0) 
            return response.render('login/signup', { title: "Registre-se", fail: true, error_message: "E-mail já registrado!" });
        
        await UserModel.create({
            email: params.email,
            nome: params.name,
            senha: await hash(params.senha, 8),
            tipo_usuario: 3
        });

        return response.redirect("/login");

    }

   




}
