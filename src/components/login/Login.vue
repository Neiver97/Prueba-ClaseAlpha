<template>
    <div class="main d-flex justify-content-center align-items-center">
        <form class="d-flex justify-content-center flex-column " @submit.prevent="iniciarSesion">
            <div class=" clasFrom d-flex justify-content-center flex-column align-content-center flex-wrap">
                    <div class="d-flex justify-content-center mb-3">
                        <img  src="../../scss/login/utils/login.png">
                    </div>
                    <h3>Bienvenido a ClaseAlpha</h3>
                    <div class=" main mb-3">
                        <label for="exampleInputEmail1" class="form-label fw-bolder fs-5">Correo</label>
                        <input type="text" required class="form-control" v-model="usuario" placeholder="Correo" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1"  class="form-label fw-bolder fs-5">Contraseña</label>
                        <input type="password" class="form-control" v-model="clave" required placeholder="Contraseña" id="exampleInputPassword1">
                    </div>
                    <div class="mb-3 form-check">
                        <a href="/createUserAuth" class="link-primary fs-6 d-flex fw-bolder">Registrar usuario</a>
                        <input type="checkbox" class="form-check-input"  id="exampleCheck1">
                        <label class="form-check-label fw-bold" for="exampleCheck1">Recordar este usuario</label>
                    </div>
                    <button type="submit" class="btn btn-primary mb-2" id="iniciarS">Enviar</button>
                    <a class="btn btn-primary" @click.prevent="cancelar" role="button">Cancelar</a>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from "firebase";
import  "../../firebase/init";
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            usuario:'',
            clave:''
        }
    },
    name:'Login',
    methods:{
         iniciarSesion(){
            firebase.auth().signInWithEmailAndPassword(this.usuario,this.clave)
            .then( async () => {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Bienvenido',
                        text: 'Correo y/o Contraseña incorrecta',
                        timer:1000
                    });
                this.$router.push({name: 'Home'})
            }).catch((err) => {
                console.error(`El error es: ${err}`);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Correo y/o Contraseña incorrecta',
                        footer: '<a href="">Why do I have this issue?</a>'
                    });
                    this.usuario='',
                    this.clave=''
            });
        },
        cancelar(){
            this.usuario='',
            this.clave=''
        }
    }
}
</script>