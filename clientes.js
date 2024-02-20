Vue.component('componente-clientes', {
    data() {
        return {
            valor: '',
            clientes: [],
            accion: 'nuevo',
            cliente: {
                idCliente: new Date().getTime(),
                codigo: '',
                nombre: '',
                direccion: '',
                zona: ''
            }
        }
    },
    methods: {
        buscarcliente(e) {
            this.listar();
        },
        eliminarcliente(idCliente) {
            if (confirm(`¿Está seguro de eliminar el cliente?`)) {
                let store = abrirStore('clientes', 'readwrite');
                let query = store.delete(idCliente);
                query.onsuccess = e => {
                    this.nuevocliente();
                    this.listar();
                };
            }
        },
        modificarcliente(cliente) {
            this.accion = 'modificar';
            this.cliente = cliente;
        },
        guardarcliente() {
            let store = abrirStore('clientes', 'readwrite');
            let query = store.put({ ...this.cliente });
            query.onsuccess = e => {
                this.nuevocliente();
                this.listar();
            };
            query.onerror = e => {
                console.error('Error al guardar en clientes', e.message);
            };
        },
        nuevocliente() {
            this.accion = 'nuevo';
            this.cliente = {
                idCliente: new Date().getTime(),
                codigo: '',
                nombre: '',
                direccion: '',
                zona: ''
            }
        },
        listar() {
            let store = abrirStore('clientes', 'readonly');
            let data = store.getAll();
            data.onsuccess = () => {
                this.clientes = data.result
                    .filter(cliente => cliente.codigo.includes(this.valor) ||
                        cliente.nombre.toLowerCase().includes(this.valor.toLowerCase()) ||
                        cliente.direccion.toLowerCase().includes(this.valor.toLowerCase()) ||
                        cliente.zona.toLowerCase().includes(this.valor.toLowerCase()));
            };
        }
    },
    template: `
        <div class="row">
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">¡LECTURAS DE CLIENTES!</div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col col-md-2">CODIGO</div>
                            <div class="col col-md-3">
                                <input v-model="cliente.codigo" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">NOMBRE</div>
                            <div class="col col-md-5">
                                <input v-model="cliente.nombre" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">DIRECCION</div>
                            <div class="col col-md-3">
                                <input v-model="cliente.direccion" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">ZONA</div>
                            <div class="col col-md-3">
                                <input v-model="cliente.zona" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col">
                                <button @click.prevent="guardarcliente" class="btn btn-success">GUARDAR</button>
                                <button @click.prevent="nuevocliente" class="btn btn-warning">NUEVO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">LISTADO DE CLIENTES</div>
                    <div class="card-body">
                        <form id="frmcliente">
                            <table class="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="5">
                                            <input placeholder="codigo, nombre, direccion, zona, email" type="search" v-model="valor" @keyup="buscarcliente" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>NOMBRE</th>
                                        <th>DIRECCION</th>
                                        <th>ZONA</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarcliente(cliente)" v-for="cliente in clientes" :key="cliente.idCliente">
                                        <td>{{cliente.codigo}}</td>
                                        <td>{{cliente.nombre}}</td>
                                        <td>{{cliente.direccion}}</td>
                                        <td>{{cliente.zona}}</td>
                                        <td><button @click.prevent="eliminarcliente(cliente.idCliente)" class="btn btn-danger">DEL</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
});