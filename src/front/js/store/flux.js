const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
	
			usersList: [],
			// auth:false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			register: async(infoUser) =>{
				try{
					let response = await fetch(process.env.BACKEND_URL + "/api/register",{
						method: "POST",
						body: JSON.stringify(infoUser),
						headers:{
							"Content-Type":"application/json"
						}

					})
					let data = await response.json()
					console.log("Esta la data de respuesta: ",data)
					if(data.ok){
						alert("Registro exitoso")
					}else{
						alert("Algo salió mal")
					}
				}catch(e){
					console.error(e)
				}
			},

			login: async(infoLogin)=>{
				try{
					//const response = await fetch("https://vigilant-orbit-r47rx6gxj55g35p6g-3001.app.github.dev/api/login",{
					const response = await fetch(process.env.BACKEND_URL + "/api/login",{
						method: "POST",
						body: JSON.stringify(infoLogin),
						headers:{
							"Content-Type":"application/json"
						}
					})
					let data = await response.json()
					console.log("data entrante de login: ", data)
					if(data.access_token){
						console.log("Bienvenid@",data.name)
						alert('Usuario  logueado exitosamente')
						localStorage.setItem('token',data.access_token)
						localStorage.setItem('name', data.name)
						localStorage.setItem('email',data.email)
						// setStore({auth:true})
						return true
					}else{

						alert("Algo salio mal revisa que tus datos sean correctos,Antes recuerda que debes haberte registrado")
						return false
					}
					
				}catch(e){
					console.error(e)
				}

			},
			//PEDIDO PARA UNICAMENTE USUARIO LOGUEADO QUE TIENE SU ACCESS access_token
			getUsersList: async () => {
				let token = localStorage.getItem('token')
				if(!token){
					alert("Primero logueate para tener acceso al sitio")
					return;
				}
				try{
					let response = await fetch(process.env.BACKEND_URL + "/api/users",{
						headers:{
							Authorization:`Bearer ${token}` // Agregamos el token en el header como no enviamos un body en este metodo 	GET no es necesario colocar "Content-Type....
						}
					})
					let data = await response.json()
					if(response.status === 401){
						alert('Token invalido o vencido, Porfa! logueate nuevamente')
					}
					if(data.lista_usuarios){
						setStore({...getStore(), usersList: data.lista_usuarios})
					}
				}catch(e){
					console.error(e)
				}
			},

			logout:() => {
				localStorage.removeItem('token')//Elima el token del almacenamiento local(local Storage)
				localStorage.removeItem('name')
				localStorage.removeItem('email')
				setStore({...getStore(),usersList: [] });//limpia la lista de usuarios
				alert("Se ha cerrado la sesión")//se debe implementar desde el FRONT los alerts
				// setStore({auth:false})//otra forma de validar si esta logueado

			},



			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;