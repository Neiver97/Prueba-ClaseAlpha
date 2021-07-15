<template>
    <Navigation/>
    <section class="sectionC">
        <h3 class="dataInfoP fw-bold">Registrar Usuario</h3>
        <form class="container forCotn" @submit.prevent="register">
            <div class="col colL">
                <div class="row">
                    <label for="formGroupExampleInput" class="form-label fw-bolder mt-1">Nombre * </label>
                    <input type="text" required class="form-control" v-model="nombre" placeholder="Nombre" aria-label="First name">
                </div>
                <div class="row">
                    <label for="formGroupExampleInput" class="form-label fw-bolder mt-1 mt-1">Usuario *</label>
                    <input type="Email" required class="form-control" v-model="usuario" placeholder="Usuario" aria-label="First name">
                </div>
                <div class="row">
                    <label for="formGroupExampleInput" class="form-label fw-bolder mt-1 mt-1">Clave *</label>
                    <input type="password" required class="form-control" v-model="clave" aria-label="First name">
                </div>
                <div class="botones">
                    <button type="submit" class="btn btn-secondary btn-lg mx-2">Enviar</button>
                    <router-link type="button" to="/" class="btn btn-secondary btn-lg">Inicio</router-link>
                </div>

            </div>
        </form>
    </section>
</template>

<script>
//import firebase from 'firebase';
import Navigation from "../../components/layout/Navigation";
import db from "../../firebase/init";
import Swal from 'sweetalert2';

export default {
    data(){
        return{
            nombre:'',
            usuario:'',
            clave:'',
        }
    },
    name:'CreateUser',
    components:{
        Navigation
    },
    methods:{
        register(){
            try {
                db.collection('users').add({
                 nombre:this.nombre,
                 usuario:this.usuario,
                 clave:this.clave
                }).then(async()=>{
                    await Swal.fire({
                        icon: "success",
                        title: "Usuario Creado",
                        text: "Usuario creado con éxito!",
                        timer: 1500,
                    });
                    this.nombre='';
                    this.usuario='';
                    this.clave='';
                });
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    }
}
</script>