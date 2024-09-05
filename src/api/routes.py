"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

bcrypt = Bcrypt()
jwt = JWTManager()


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#REGISTRO DE USUARIO
@api.route('/register', methods=['POST'])
def register():
    # name = request.json.get('name')
    # email = request.json.get('email')
    # password = request.json.get('password')
    # print(name,email,password) #John Doe john.doe@example.com securepassword123

    # response_body = {
    #     "message": "Hello!"
    # }
    # return jsonify(response_body), 200
    try:
        name = request.json.get('name')
        email = request.json.get('email')
        password = request.json.get('password')
        print(name,email,password)

        if not name or  not email or not password:
            return jsonify({"msg": "Todos los campos son necesarios"}),404
        
        #SI ESE EMAIL YA LE PERTENECE ALGUN USUARIO ANTERIOR
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error':'Email already exist.'}),409
        
        password_hash= bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(name=name, email=email, password=password_hash)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg":"Usuario registrado con éxito","ok":True}),201
    except Exception as e:
        return jsonify({'error':'Error in user creation: '+str(e)}),500
    
#LOGIN (CON UN TOKEN)
@api.route('/login', methods=['POST'])
def get_token():
    try:
        #Primer paso, chequeamos que por el body venga la informacion necesaria
        email = request.json.get('email')
        password = request.json.get('password')
        
        if not email or not password:
            return jsonify ({"error":"Email y password son requeridos"}),400
        #Buscamos al usuario con ese correo electronico y si lo encuentra lo guarda
        login_user = User.query.filter_by(email=email).one()

        if not login_user:
            return jsonify({'msg':'No existe ese usuario que tenga ese email' }),404
        
        #verificamos que el password sea correcto:
        password_from_db = login_user.password #Ojo si lo loguin_user está vacio, da error y se va al  "Except"
        true_o_false = bcrypt.check_password_hash(password_from_db, password)

        #Si es verdadero generamos un token  y lo devuelve en una respuesta JSON:
        if true_o_false:
            user_id = login_user.id # recuperamos el id del usuario para crear el token...
            access_token =create_access_token(identity=user_id) #creamos el token con el id del user dentro
            return jsonify({'access_token': access_token, 'name': login_user.name, 'email': login_user.email }),200 # Enviamos el token al front( si es necesario serializamos  el "login_user" y tambien lo enviamos en el objeto json)
        else:
            return jsonify({"Error": "Contraseña incorrecta"}),404
        
    except Exception as e:
        return jsonify({'Error':'Algo salio muy mal'+str(e)}),500

#EJEMPLO DE UNA RUTA RESTRINGUIDA POR TOKEN (LA MISMA RECUPERA TODOS LOS USERS Y LO ENVIA PARA QUIEN ESTÉ LOGUEADO)
@api.route('/users')#Ruta de acceso restringuido solo para usuarios logeados 
@jwt_required()  # Decorador para requerir autenticación con JWT
def show_users():
    current_user_id = get_jwt_identity()  # Obtiene la id del usuario del token
    if current_user_id:
        users = User.query.all()
        users_list = []
        for user in users:
            user_dict = {
                'email': user.email,
                'name': user.name
            }
            users_list.append(user_dict)
            
        return jsonify({"lista_usuarios":users_list , 'cantidad de usuarios':len(users_list)}), 200
    else:
        return {"Error": "Token inválido o vencido"}, 401