const vm = new Vue({
    el: "#app",
    data: {
        produtos: [],
        produto: false
    },
    filters: {
        numberToPrice(valor) {
            return valor.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL'});
        }
    },
    methods: {
        getProdutos: function() { 
            fetch("./api/produtos.json")
                .then(r => r.json())
                .then(r => {
                    this.produtos = r;
                }
            )
        },
        getProdutoById: function(id) {
            fetch(`./api/produtos/${id}/dados.json`)
                .then(r => r.json())
                .then(r => {
                    this.produto = r;
                })
                .catch(error => {
                    throw(error);
                })
        },
        abrirModal(id) {
            this.getProdutoById(id);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        },
        fecharModal({ target, currentTarget }) {
            if (currentTarget === target) this.produto = false;
        }
    },
    created() {
        this.getProdutos();
    }
});