const dbSequelize = require('../config/connection');
const { use } = require('../routes/login.routes');
class loginService {

  
//constants
 todayDate = new Date()
.toLocaleString('es-CO', { timeZone: 'America/Bogota' })
.replace(/\P.+/, '')
.replace(/\A.+/, '');

  constructor() {}


  
//*********************************** */
static async login (body) {
  try{
     const  dato  = body;
     console.log(dato.email);
  
    const user = await dbSequelize.user.findOne({attributes: [
      'idUser',
      'email',
      'name',
      'lastName',
      'status',
      'isConfirmed',
      'createdAt',
      'registeredBy',
      'Role_idRole',
      'Client_idClient',
      'Company_idCompany',
      'Administrator_idAdministrator',
      'updatedAt',
    ]},{
      where: {
        'email': dato.email,
      },
    });
    console.log(user);
    if (user) {
      const auth = await dbSequelize.auth.findOne({
        where: {
          'User_idUser': user.idUser,
        },
      });
      console.log(auth);
      if (auth) {
        
        if (dato.email === user.email && dato.password === auth.password) {
          console.log('usuario true');

          const info = {
            name:user.name,
            email:user.email,
            User_idUser: user.idUser,
            id_role:user.Role_idRole,
            id_company:user.Company_idCompany,
            id_cliente:user.Client_idClient
            
          };
          return info;
        }else {
          return { status: 500, message: 'Email o Contraseña incorrecta' };
        }

      } else {
        return { status: 500, message: 'No es posible Encontrar Ese Usuario.' };
      }
    } else {
      return { status: 500, message: 'No es posible Encontrar Ese Usuario.' };
    }
  } catch (e) {
    console.log(e);
    return { status: 500, message: 'Error interno del servidor.' };
  }
};

 static async saveAuth(token){

  try{
    const exp=todayDate.setDate(getDate()+parseInt(2));
    const auth = await dbSequelize.auth.findOne({
      where:{'User_idUser':token.User_idUser}
    });
    if(auth){
      await auth.update({
         'updatedAt':todayDate,
         'expiresOn': exp
      })
    }
  }catch(e){

  }
}
   
  }

  module.exports={loginService}
  
  

