<template>
  <div class="home" style="height: 100%">
    <Navigation />
    <section class="bodySec">
      <h3 class="infoSis">Información del sistema</h3>
      <table
        class="
          table table-bordered
          border-dark
          table-striped table-hover table-sm
        "
        cellspacing="0"
        id="dtBasicExample"
      >
        <thead>
          <tr align="center">
            <th scope="col">Nombre</th>
            <th scope="col">Usuario</th>
            <th scope="col">Clave</th>
            <th scope="col">Eliminar</th>
            <th scope="col">Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr align="center" v-for="item in users" v-bind:key="item.id">
            <td>{{ item.data.nombre }}</td>
            <td>{{ item.data.usuario }}</td>
            <td>{{ item.data.clave }}</td>
            <td class="d-flex justify-content-center flex-row">
              <a
                style="color: rgb(36, 34, 34)"
                @click="deleteFile(item.id)"
                ><i class="fas fa-trash"></i
              ></a>
            </td>
            <td align="center">
              <a
                data-bs-toggle="modal"
                data-bs-target="#exampleData"
                @click.prevent="
                  obtenerInfo(
                    item.id,
                    item.data.nombre,
                    item.data.usuario,
                    item.data.clave
                  )
                "
                data-bs-whatever="@mdo"
                ><i class="fas fa-user-edit"></i
              ></a>
            </td>
          </tr>
          <!-- Div de editar campos -->
          <div
            class="modal fade"
            id="exampleData"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Editar Campos
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="actualizar(this.idFire)">
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label"
                        >Nombre</label
                      >
                      <input
                        type="text"
                        v-model="nombre"
                        class="form-control"
                        id="recipient-name"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label"
                        >Usuario</label
                      >
                      <input
                        type="text"
                        v-model="usuario"
                        class="form-control"
                        id="recipient-name"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label"
                        >Clave</label
                      >
                      <input
                        type="text"
                        v-model="clave"
                        class="form-control"
                        id="recipient-name"
                      />
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cerrar
                      </button>
                      <button type="submit" class="btn btn-primary">
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import db from "../firebase/init";
import Navigation from "../components/layout/Navigation";
import Swal from 'sweetalert2'
const colecion = db.collection("users");

export default {
  data() {
    return {
      users: [],
      idFire: "",
      nombre: "",
      usuario: "",
      clave: "",
    };
  },
  name: "Home",
  components: {
    Navigation,
  },
  created() {
    this.getUsers();
  },
  methods: {
    
    async getUsers() {
      this.users=[];
      await colecion.get().then((r) => {
        r.docs.map((item) =>
          this.users.push({ id: item.id, data: item.data() })
        );
      });
    },
    obtenerInfo(idCol, nombre, user, pass) {
      this.idFire = idCol;
      this.nombre = nombre;
      this.usuario = user;
      this.clave = pass;
    },
    async deleteFile(id) {
      await colecion
        .doc(id)
        .delete()
        .then(async () => {
          await Swal.fire({
            icon: "success",
            title: "Dato eliminado",
            text: "Dato eliminado con éxito",
            timer: 1000,
          });
          
          this.getUsers();
        });
    },
    actualizar(idFAuct) {
      colecion
        .doc(idFAuct)
        .set({ clave: this.clave, nombre: this.nombre, usuario: this.usuario })
        .then(async() => {
          await Swal.fire({
            icon: 'success',
            title: 'Dato Actualizado',
            text: 'Dato actualizado con éxito',
            timer:1000
          });
          this.getUsers();
        });
    },
  },
};
</script>
