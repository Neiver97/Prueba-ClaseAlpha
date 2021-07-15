<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <div class="d-flex ">
                <router-link class=" nav nav-tabs navbar-brand" to="/">Inicio</router-link>
                <router-link class="nav nav-tabs navbar-brand" to="/createUser">Crear usuario</router-link>
                <router-link class="nav nav-tabs navbar-brand" to="#">Acerca de nosotros</router-link>
                <router-link class="nav nav-tabs navbar-brand" to="#">Servicios</router-link>
            </div>
            <form class="d-flex">
                <p class="fs-5 fw-bold mx-4 my-0" style="color:white" v-if="user">Bienvenido: {{user.email}} </p>
                <router-link class="btn btn-outline-secondary" to="/login">Cerrar sesion</router-link>
            </form>
        </div>
    </nav>
</template>

<script>
    import firebase from "firebase";
    export default {
        data() {
            return {
                user:null
            }
        },
        name:'Navigation',
        methods:{
            cerrarSesion(){
                this.userAuth=null;
                firebase.auth().signOut();
            },
            getUserAuth(){
                firebase.auth().onAuthStateChanged(user=>{
                    if (user) {
                        this.user=user;
                    }else{
                        this.user=null;
                    }
                })
            }
        },
        created(){
            this.getUserAuth();
         }
    }
</script>