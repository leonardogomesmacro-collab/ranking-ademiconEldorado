// =========================================================
// TELA 2 — RANKING ADEMICON
// RANKING SEMANA + RANKING CONTRATOS
// =========================================================


// =========================================================
// CONFIGURAÇÃO DA API
// =========================================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbwhrz4NYBkZhO11hxauYPyiEtAHMprAwh5yLff4Jx3rP4Fc5HRZ8X7suAtH-SMwVPvj_w/exec";


// =========================================================
// INICIALIZAÇÃO
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "================================="
        );

        console.log(
            "ADEMICON — TELA 2"
        );

        console.log(
            "TELA 2 CARREGADA"
        );

        console.log(
            "================================="
        );


        carregarTela2();

    }
);


// =========================================================
// BUSCAR DADOS DA API
// =========================================================

async function carregarTela2() {

    try {

        atualizarStatus(
            "Conectando...",
            false
        );


        console.log(
            "Chamando API..."
        );


        const resposta =
            await fetch(
                API_URL,
                {
                    method: "GET",
                    cache: "no-cache"
                }
            );


        console.log(
            "Status API:",
            resposta.status
        );


        if (!resposta.ok) {

            throw new Error(
                "Erro HTTP: " +
                resposta.status
            );

        }


        const dados =
            await resposta.json();


        console.log(
            "================================="
        );

        console.log(
            "DADOS RECEBIDOS DA API"
        );

        console.log(
            dados
        );

        console.log(
            "================================="
        );


        if (!dados) {

            throw new Error(
                "API retornou dados vazios."
            );

        }


        // =================================================
        // STATUS
        // =================================================

        atualizarStatus(
            "Dados atualizados",
            true
        );


        // =================================================
        // RANKING SEMANA
        // =================================================

        if (
            dados.rankingSemana
        ) {

            console.log(
                "RANKING SEMANA:",
                dados.rankingSemana
            );


            atualizarRankingSemana(
                dados.rankingSemana
            );

        } else {

            console.warn(
                "rankingSemana não encontrado."
            );

        }


        // =================================================
        // RANKING CONTRATOS
        // =================================================

        if (
            dados.rankingContratos
        ) {

            console.log(
                "RANKING CONTRATOS:",
                dados.rankingContratos
            );


            atualizarRankingContratos(
                dados.rankingContratos
            );

        } else {

            console.warn(
                "rankingContratos não encontrado."
            );

        }


        console.log(
            "Tela 2 atualizada com sucesso."
        );

    }

    catch (erro) {

        console.error(
            "================================="
        );

        console.error(
            "ERRO AO CARREGAR TELA 2"
        );

        console.error(
            erro
        );

        console.error(
            "================================="
        );


        atualizarStatus(
            "Erro na conexão",
            false
        );

    }

}


// =========================================================
// RANKING SEMANA
// =========================================================

function atualizarRankingSemana(
    dados
) {

    console.log(
        "Aplicando Ranking Semana..."
    );


    // =====================================================
    // NOME — RANKINGSEMANA!A2
    // =====================================================

    colocarTexto(
        "nomeSemana",
        dados.nome || "-"
    );


    // =====================================================
    // CRÉDITO — RANKINGSEMANA!G2
    // =====================================================

    colocarTexto(
        "creditoSemana",
        moeda(
            dados.credito
        )
    );


    // =====================================================
    // FOTO — RANKINGSEMANA!L2
    // =====================================================

    const foto =
        document.getElementById(
            "fotoSemana"
        );


    if (!foto) {

        return;

    }


    const url =
        converterFotoDrive(
            dados.foto
        );


    if (url) {

        foto.src = url;

        foto.style.display =
            "block";


        foto.onerror =
            function () {

                console.warn(
                    "Erro ao carregar foto do Ranking Semana:",
                    dados.foto
                );


                this.style.display =
                    "none";

            };

    } else {

        foto.removeAttribute(
            "src"
        );

    }

}


// =========================================================
// RANKING CONTRATOS
// =========================================================

function atualizarRankingContratos(
    dados
) {

    console.log(
        "Aplicando Ranking Contratos..."
    );


    // =====================================================
    // NOME — RANKINGCONTRATOS!A2
    // =====================================================

    colocarTexto(
        "nomeContratos",
        dados.nome || "-"
    );


    // =====================================================
    // QUANTIDADE — RANKINGCONTRATOS!J2
    // =====================================================

    const quantidade =
        numero(
            dados.quantidade
        );


    colocarTexto(
        "quantidadeContratos",
        quantidade +
        (
            quantidade === 1
                ? " CONTRATO"
                : " CONTRATOS"
        )
    );


    // =====================================================
    // FOTO — RANKINGCONTRATOS!L2
    // =====================================================

    const foto =
        document.getElementById(
            "fotoContratos"
        );


    if (!foto) {

        return;

    }


    const url =
        converterFotoDrive(
            dados.foto
        );


    if (url) {

        foto.src = url;

        foto.style.display =
            "block";


        foto.onerror =
            function () {

                console.warn(
                    "Erro ao carregar foto do Ranking Contratos:",
                    dados.foto
                );


                this.style.display =
                    "none";

            };

    } else {

        foto.removeAttribute(
            "src"
        );

    }

}


// =========================================================
// STATUS DA API
// =========================================================

function atualizarStatus(
    texto,
    conectado
) {

    const elemento =
        document.getElementById(
            "status"
        );


    if (elemento) {

        elemento.textContent =
            texto;

    }


    const bolinha =
        document.querySelector(
            ".status-dot"
        );


    if (!bolinha) {

        return;

    }


    if (conectado) {

        bolinha.style.background =
            "#00ff66";

        bolinha.style.boxShadow =
            "0 0 10px #00ff66";

    } else {

        bolinha.style.background =
            "#ff0000";

        bolinha.style.boxShadow =
            "0 0 10px #ff0000";

    }

}


// =========================================================
// GOOGLE DRIVE — CONVERTER FOTO
// =========================================================

function converterFotoDrive(
    url
) {

    if (!url) {

        return "";

    }


    url =
        String(
            url
        ).trim();


    // =====================================================
    // JÁ É THUMBNAIL
    // =====================================================

    if (
        url.includes(
            "drive.google.com/thumbnail"
        )
    ) {

        return url;

    }


    // =====================================================
    // DRIVE:
    // /file/d/ID/view
    // =====================================================

    const match =
        url.match(
            /\/file\/d\/([^/]+)/
        );


    if (
        match &&
        match[1]
    ) {

        const id =
            match[1];


        return (
            "https://drive.google.com/thumbnail?id=" +
            encodeURIComponent(id) +
            "&sz=w600"
        );

    }


    // =====================================================
    // DRIVE:
    // ?id=ID
    // =====================================================

    const idMatch =
        url.match(
            /[?&]id=([^&]+)/
        );


    if (
        idMatch &&
        idMatch[1]
    ) {

        return (
            "https://drive.google.com/thumbnail?id=" +
            encodeURIComponent(
                idMatch[1]
            ) +
            "&sz=w600"
        );

    }


    // =====================================================
    // URL ORIGINAL
    // =====================================================

    return url;

}


// =========================================================
// CONVERTER PARA NÚMERO
// =========================================================

function numero(
    valor
) {

    if (
        valor === null ||
        valor === undefined ||
        valor === ""
    ) {

        return 0;

    }


    // =====================================================
    // JÁ É NUMBER
    // =====================================================

    if (
        typeof valor ===
        "number"
    ) {

        return isNaN(
            valor
        )
            ? 0
            : valor;

    }


    let texto =
        String(
            valor
        ).trim();


    // =====================================================
    // REMOVER R$
    // =====================================================

    texto =
        texto.replace(
            /R\$/gi,
            ""
        ).trim();


    // =====================================================
    // FORMATO BRASILEIRO
    // 1.234.567,89
    // =====================================================

    if (
        texto.includes(",")
    ) {

        texto =
            texto.replace(
                /\./g,
                ""
            );


        texto =
            texto.replace(
                ",",
                "."
            );

    }


    // =====================================================
    // REMOVER CARACTERES
    // =====================================================

    texto =
        texto.replace(
            /[^\d.-]/g,
            ""
        );


    const resultado =
        parseFloat(
            texto
        );


    return isNaN(
        resultado
    )
        ? 0
        : resultado;

}


// =========================================================
// FORMATAÇÃO DE MOEDA
// =========================================================

function moeda(
    valor
) {

    return numero(
        valor
    ).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// =========================================================
// COLOCAR TEXTO
// =========================================================

function colocarTexto(
    id,
    texto
) {

    const elemento =
        document.getElementById(
            id
        );


    if (elemento) {

        elemento.textContent =
            texto;

    } else {

        console.warn(
            "Elemento não encontrado:",
            id
        );

    }

}


// =========================================================
// ATUALIZAÇÃO AUTOMÁTICA
// =========================================================

setInterval(
    carregarTela2,
    60000
);
