let db;

const funcdb = () => {
    let indexDB = indexedDB.open('db_sistema', 1);

    indexDB.onupgradeneeded = e => {
        let req = e.target.result;
        let tbllecturas = req.createObjectStore('lecturas', { keyPath: 'idLectura' });
        let tblcliente = req.createObjectStore('clientes', { keyPath: 'idCliente' });
        tbllecturas.createIndex('idLectura', 'idLectura', { unique: true });
        tbllecturas.createIndex('codigo', 'codigo', { unique: true });
        tblcliente.createIndex('idCliente', 'idCliente', { unique: true });
        tblcliente.createIndex('codigo', 'codigo', { unique: true });
    };

    indexDB.onsuccess = e => {
        db = e.target.result;
    };

    indexDB.onerror = e => {
        console.error('Error al crear la base de datos', e.target.error.message);
    };
};

const abrirStore = (store, modo) => {
    let ltx = db.transaction(store, modo);
    return ltx.objectStore(store);
};

funcdb();