// =========================================================
// RANKING ADEMICON
// TELA 03 — RANKING ANUAL
// =========================================================


// =========================================================
// API
// =========================================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbwhrz4NYBkZhO11hxauYPyiEtAHMprAwh5yLff4Jx3rP4Fc5HRZ8X7suAtH-SMwVPvj_w/exec";


// =========================================================
// INICIALIZAÇÃO
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        carregarRankingAnual();

    }
);


// =========================================================
// BUSCAR API
// =========================================================

async function carregarRankingAnual() {

    try {

        atualizarStatus(
            "Conectando..."
        );


        const resposta =
            await fetch(
                API_URL,
                {
                    method: "GET",
                    cache: "no-cache"
                }
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
            "Ranking anual recebido:",
            dados.rankingAnual
        );


        if (
            !dados.rankingAnual ||
            !Array.isArray(
                dados.rankingAnual
            )
        ) {

            throw new Error(
                "Ranking anual não encontrado na API."
            );

        }


        atualizarRankingAnual(
            dados.rankingAnual
        );


        atualizarStatus(
            "Dados atualizados"
        );

    }

    catch (erro) {

        console.error(
            "Erro ao carregar Ranking Anual:",
            erro
        );


        atualizarStatus(
            "Erro na conexão"
        );

    }

}


// =========================================================
// ATUALIZAR RANKING
// =========================================================

function atualizarRankingAnual(
    ranking
) {

    // =====================================================
    // FILTRAR PRODUÇÃO > 0
    // =====================================================

    const rankingValido =
        ranking
            .filter(
                function (item) {

                    return (
                        numero(
                            item.producao
                        ) > 0
                    );

                }
            )
            .sort(
                function (a, b) {

                    return (
                        numero(
                            b.producao
                        ) -
                        numero(
                            a.producao
                        )
                    );

                }
            );


    console.log(
        "Ranking anual válido:",
        rankingValido
    );


    // =====================================================
    // DESTAQUE DO 1º
    // =====================================================

    const primeiro =
        rankingValido[0];


    if (primeiro) {

        colocarTexto(
            "annualWinnerName",
            primeiro.nome || "-"
        );


        colocarTexto(
            "annualWinnerValue",
            moeda(
                primeiro.producao
            )
        );

    }


    // =====================================================
    // TABELA
    // =====================================================

    const lista =
        document.getElementById(
            "rankingAnualList"
        );


    if (!lista) {

        return;

    }


    lista.innerHTML =
        "";


    // =====================================================
    // CRIAR LINHAS
    // =====================================================

    rankingValido.forEach(
        function (
            item,
            index
        ) {

            const linha =
                document.createElement(
                    "div"
                );


            linha.className =
                "ranking-row";


            // =================================================
            // POSIÇÃO
            // =================================================

            const posicao =
                document.createElement(
                    "span"
                );


            posicao.className =
                "position";


            posicao.textContent =
                String(
                    index + 1
                ).padStart(
                    2,
                    "0"
                );


            // =================================================
            // NOME
            // =================================================

            const nome =
                document.createElement(
                    "span"
                );


            nome.className =
                "ranking-name";


            nome.textContent =
                item.nome ||
                "-";


            // =================================================
            // PRODUÇÃO
            // =================================================

            const valor =
                document.createElement(
                    "span"
                );


            valor.className =
                "ranking-value";


            valor.textContent =
                moeda(
                    item.producao
                );


            // =================================================
            // MONTAR LINHA
            // =================================================

            linha.appendChild(
                posicao
            );


            linha.appendChild(
                nome
            );


            linha.appendChild(
                valor
            );


            // =================================================
            // DESTAQUES DO TOP 3
            // =================================================

            if (
                index === 0
            ) {

                linha.classList.add(
                    "rank-first"
                );

            }


            else if (
                index === 1
            ) {

                linha.classList.add(
                    "rank-second"
                );

            }


            else if (
                index === 2
            ) {

                linha.classList.add(
                    "rank-third"
                );

            }


            // =================================================
            // ADICIONAR À TABELA
            // =================================================

            lista.appendChild(
                linha
            );

        }
    );

}


// =========================================================
// STATUS
// =========================================================

function atualizarStatus(
    texto
) {

    const status =
        document.getElementById(
            "status"
        );


    const statusFooter =
        document.getElementById(
            "statusFooter"
        );


    if (status) {

        status.textContent =
            texto;

    }


    if (statusFooter) {

        statusFooter.textContent =
            texto;

    }

}


// =========================================================
// MOEDA
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
// NÚMERO
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


    texto =
        texto.replace(
            /R\$/gi,
            ""
        ).trim();


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
// TEXTO
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

    }

}


// =========================================================
// ATUALIZAÇÃO AUTOMÁTICA DOS DADOS
// =========================================================
//
// Apenas atualiza os dados.
// Não existe troca automática de tela.
//

setInterval(
    carregarRankingAnual,
    60000
);
