
(function() {

    const valorDoProjeto = 2000;
    var valorRestante = 900;

    const textInput = document.getElementById('id-input-dolares');
    const btGiveNow = document.getElementById('id-give-now');
    const table =  document.getElementById('id-table');
    const spanDonors = document.getElementById('id-num-donors');
    const spanValorRestante = document.getElementById('id-valor-restante');
    const loadingBar = document.getElementById('id-loading');
    const ballonMsg = document.getElementById('id-balloon-msg')

    function validarInput(){

        let valorInserido = textInput.value;
        valorInserido = parseInt(valorInserido);

        textInput.value = 50;
        if (valorInserido <= 0) {
            return false;
        }
        return valorInserido;
    }

    function getDateTime(){
        let data = new Date().toLocaleString([], {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric', 
            hour: '2-digit',
            minute: '2-digit'
        });
        return data;
    }

    function addTableLine(valorInput, dataHora){
        table.innerHTML += ` 
            <tr>
                <td>$${valorInput}</td>
                <td>${dataHora}</td>
            </tr>
        `
    }

    function alterarSpanDonors(){
        let qtdDonors = parseInt(spanDonors.innerText);
        spanDonors.innerText = qtdDonors + 1;
    }

    function alterarValorProjetoRestante(valorInput){
        return new Promise((resolve)=>{
            let valorNoSpan = parseInt(spanValorRestante.innerText.replace('$', ''));
            let restanteAtual = valorNoSpan - valorInput;
            valorRestante = restanteAtual
            spanValorRestante.innerText = `$${restanteAtual}`;
            resolve(restanteAtual);
        })
    }

    function atualizarLoadingBar(restante){
        return new Promise((resolve)=>{
            let porcentagemRestante = (restante / valorDoProjeto)*100;
            let porcentagemNaBarra = 100 - porcentagemRestante ;

            if(porcentagemNaBarra <= 100){
                loadingBar.style.width = `${porcentagemNaBarra}%`;
            }
            else{
                loadingBar.style.width = '100%';
            }
            resolve()
        });
    }

    function projetoConcluído(){
        btGiveNow.disabled = true;
        textInput.value = '';
        textInput.disabled = true;
        ballonMsg.innerText = "The amount for this project has been reached!!!"
    }

    function init() {
        console.log('iniciou o Javascript')

        spanValorRestante.innerText = `$${valorRestante}`;

        atualizarLoadingBar(valorRestante);

        
        btGiveNow.addEventListener('click', async ()=>{
            let valorInput = validarInput();
            let dataHora = getDateTime();

            if (valorInput) {
                addTableLine(valorInput, dataHora);
                alterarSpanDonors();
                let restanteAtual = await alterarValorProjetoRestante(valorInput);
                await atualizarLoadingBar(restanteAtual);
                
                console.log
                if(valorRestante <= 0){
                    console.log("entrei")
                    projetoConcluído();
                } 
            }
        });
    }

    init()
})()