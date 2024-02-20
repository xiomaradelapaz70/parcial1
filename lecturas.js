Vue.component('componente-lecturas', {
    data() {
        return {
            valor: '',
            lecturas: [],
            accion: 'nuevo',
            lectura: {
                idLectura: new Date().getTime(),
                cliente: '',
                fecha: '',
                lectura_anterior: '',
                lectura_actual: '',
                precio: 0.0,
            }
        }
    },
    methods: {
        buscarlecturas() {
            this.listar();
        },
        eliminarlecturas(idLectura) {
            if (confirm(`¿Está seguro de eliminar la lectura?`)) {
                let store = abrirStore('lecturas', 'readwrite');
                let query = store.delete(idLectura);
                query.onsuccess = () => {
                    this.nuevolecturas();
                    this.listar();
                };
            }
        },
        guardarlecturas() {
    // Validar si el cliente existe
    if (this.validarClienteExistente(this.lectura.cliente)) {
        alert('El cliente no existe. No se puede guardar la lectura.');
        return;
    }

    let store = abrirStore('lecturas', 'readwrite');
    let request;
    if (this.accion === 'nuevo') {
        request = store.add(this.lectura);
    } else if (this.accion === 'modificar') {
        request = store.put(this.lectura);
    }

    request.onsuccess = () => {
        this.nuevolecturas();
        this.listar();
    };
},
validarClienteExistente(cliente) {
    const clientesExistentes = ['Cliente1', 'Cliente2', 'Cliente3']; // Array de clientes existentes
    return clientesExistentes.includes(cliente);
},
        modificarlecturas(lectura) {
            this.accion = 'modificar';
            this.lectura = lectura;
        },
        nuevolecturas() {
            this.accion = 'nuevo';
            this.lectura = {
                idLectura: new Date().getTime(),
                cliente: '',
                fecha: '',
                lectura_anterior: '',
                lectura_actual: '',
                precio: 0.0,
            };
        },
        listar() {
            let store = abrirStore('lecturas', 'readonly');
            let data = store.getAll();
            data.onsuccess = () => {
                this.lecturas = data.result.filter(lectura =>
                    lectura.cliente.includes(this.valor) ||
                    lectura.fecha.toLowerCase().includes(this.valor.toLowerCase()) ||
                    lectura.lectura_anterior.toLowerCase().includes(this.valor.toLowerCase()) ||
                    lectura.lectura_actual.toLowerCase().includes(this.valor.toLowerCase())
                );
            };
        }
    },
    template: `
        <div class="row">
            <div class="col col-md-6">
                <div class="card">
                    <div class="card-header text-bg-dark">REGISTRO DE LECTURAS</div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col col-md-2">CLIENTE</div>
                            <div class="col col-md-3">
                                <input v-model="lectura.codigo" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">FECHA</div>
                            <div class="col col-md-5">
                                <input v-model="lectura.fecha" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">LECTURA ANTERIOR</div>
                            <div class="col col-md-3">
                                <input v-model="lectura.lectura_anterior" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">LECTURA ACTUAL</div>
                            <div class="col col-md-3">
                                <input v-model="lectura.lectura_actual" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">PRECIO</div>
                            <div class="col col-md-3">
                                <input v-model="lectura.precio" type="number" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col">
                                <button @click.prevent="guardarlecturas" class="btn btn-success">GUARDAR</button>
                                <button @click.prevent="nuevolecturas" class="btn btn-warning">NUEVO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">LISTADO DE LECTURAS</div>
                    <div class="card-body">
                        <form id="frmlecturas">
                            <table class="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="6">
                                            <input placeholder="cliente, fecha, lectura anterior, lectura actual, precio" type="search" v-model="valor" @keyup="buscarlecturas" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>CLIENTE</th>
                                        <th>FECHA</th>
                                        <th>LECTURA ANTERIOR</th>
                                        <th>LECTURA ACTUAL</th>
                                        <th>PRECIO</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarlecturas(lectura)" v-for="lectura in lecturas" :key="lectura.idLectura">
                                        <td>{{lectura.codigo}}</td>
                                        <td>{{lectura.fecha}}</td>
                                        <td>{{lectura.lectura_anterior}}</td>
                                        <td>{{lectura.lectura_actual}}</td>
                                        <td>{{lectura.precio}}</td>
                                        <td><button @click.prevent="eliminarlecturas(lectura.idLectura)" class="btn btn-danger">del</button></td>
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
