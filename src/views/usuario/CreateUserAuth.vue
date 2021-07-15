<template>
    <div style="height: 100%;">
        <section class="sectionA">
            <h3 class="dataInfo fw-bold">Registrar usuario de autenticación</h3>
            <form class="container formCotn" @submit.prevent="register">
                <div class="col colM">
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
                        <a type="button" href="/login" class="btn btn-secondary btn-lg">Atrás</a>
                    </div>

                </div>
            </form>
        </section>
    </div>
</template>

<script>
import firebase from "firebase";
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            usuario:'',
            clave:''
        }
    },
    name:'CreateUserAuth',
    methods: {
        register(){
            try {
            firebase.auth().createUserWithEmailAndPassword(this.usuario,this.clave)
            .then(async ()=>{
                await Swal.fire({
                    icon: "success",
                    title: "Usuario Creado",
                    text: "Usuario creado con éxito!",
                    timer: 1500,
                });
                this.usuario='',
                this.clave=''
            });
            } catch (error) {
                console.error(`El error es: ${error}`);
            }

        }
    },
}
</script>