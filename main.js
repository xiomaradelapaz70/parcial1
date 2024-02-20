var app = new Vue({
    el: '#app',
    data: {
        forms: {
            lecturas: { mostrar: false },
            cliente: { mostrar: false }
        }
    },
    methods: {
        abrirFormulario(form) {
            this.forms[form].mostrar = !this.forms[form].mostrar;
            this.$refs[form].listar();
        }
    }
});