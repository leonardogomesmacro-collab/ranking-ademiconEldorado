// =========================================================
// RANKING ADEMICON
// APP.JS — VERSÃO COMPLETA
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
            "RANKING ADEMICON"
        );

        console.log(
            "APP.JS CARREGADO"
        );

        console.log(
            "================================="
        );

        carregarRanking();

    }
);


// =========================================================
// BUSCAR DADOS DA API
// =========================================================

async function carregarRanking() {

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


        // =================================================
        // LOG
        // =================================================

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
            JSON.stringify(
                dados,
                null,
                2
            )
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
        // METAS
        // =================================================

        /*
           Compatibilidade com as duas estruturas:

           dados.metas
           dados.producao

           O seu Code.gs atual envia:
           dados.producao
        */

        const metas =
            dados.metas ||
            dados.producao ||
            null;


        if (metas) {

            console.log(
                "OBJETO METAS RECEBIDO:"
            );

            console.log(
                metas
            );


            atualizarMetas(
                metas
            );

        } else {

            console.warn(
                "ATENÇÃO: objeto de metas não encontrado."
            );

        }


        // =================================================
        // RANKING
        // =================================================

        if (
            Array.isArray(
                dados.ranking
            )
        ) {

            console.log(
                "Ranking recebido:",
                dados.ranking
            );


            atualizarRanking(
                dados.ranking
            );

        } else {

            console.warn(
                "Ranking não encontrado ou formato inválido."
            );

        }


        // =================================================
        // DATA
        // =================================================

        if (
            dados.atualizadoEm
        ) {

            atualizarData(
                dados.atualizadoEm
            );

        }


        console.log(
            "Ranking atualizado com sucesso."
        );

    }

    catch (erro) {

        console.error(
            "================================="
        );

        console.error(
            "ERRO AO CARREGAR API:"
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
// STATUS
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
// METAS
// =========================================================

function atualizarMetas(
    metas
) {

    console.log(
        "================================="
    );

    console.log(
        "LENDO METAS"
    );

    console.log(
        "OBJETO METAS:"
    );

    console.log(
        metas
    );

    console.log(
        "================================="
    );


    // =====================================================
    // VALORES
    // =====================================================

    const metaMes =
        numero(
            metas.metaMes
        );


    const metaSemana =
        numero(
            metas.metaSemana
        );


    const metaDia =
        numero(
            metas.metaDia
        );


    const vendidoMes =
        numero(
            metas.vendidoMes
        );


    const vendidoSemana =
        numero(
            metas.vendidoSemana
        );


    const vendidoDia =
        numero(
            metas.vendidoDia
        );


    // =====================================================
    // LOG
    // =====================================================

    console.log(
        "Meta mês:",
        metaMes
    );

    console.log(
        "Meta semana:",
        metaSemana
    );

    console.log(
        "Meta dia:",
        metaDia
    );

    console.log(
        "Vendido mês:",
        vendidoMes
    );

    console.log(
        "Vendido semana:",
        vendidoSemana
    );

    console.log(
        "Vendido dia - I3:",
        vendidoDia
    );


    // =====================================================
    // VOLUME TOTAL
    // =====================================================

    colocarTexto(
        "volumeTotal",
        moeda(
            vendidoMes
        )
    );


    // =====================================================
    // META DO MÊS
    // =====================================================

    colocarTexto(
        "metaMes",
        moeda(
            metaMes
        )
    );


    // =====================================================
    // META DIÁRIA
    // =====================================================

    colocarTexto(
        "metaDia",
        moeda(
            metaDia
        )
    );


    colocarTexto(
        "vendidoDia",
        moeda(
            vendidoDia
        )
    );


    atualizarProgresso(
        "progressDia",
        "percentDia",
        vendidoDia,
        metaDia
    );


    // =====================================================
    // META SEMANAL
    // =====================================================

    colocarTexto(
        "metaSemana",
        moeda(
            metaSemana
        )
    );


    colocarTexto(
        "vendidoSemana",
        moeda(
            vendidoSemana
        )
    );


    atualizarProgresso(
        "progressSemana",
        "percentSemana",
        vendidoSemana,
        metaSemana
    );


    // =====================================================
    // META MENSAL
    // =====================================================

    colocarTexto(
        "metaMes2",
        moeda(
            metaMes
        )
    );


    colocarTexto(
        "vendidoMes",
        moeda(
            vendidoMes
        )
    );


    atualizarProgresso(
        "progressMes",
        "percentMes",
        vendidoMes,
        metaMes
    );


    // =====================================================
    // PERCENTUAIS
    // =====================================================

    const percentualDia =
        calcularPercentual(
            vendidoDia,
            metaDia
        );


    const percentualSemana =
        calcularPercentual(
            vendidoSemana,
            metaSemana
        );


    const percentualMes =
        calcularPercentual(
            vendidoMes,
            metaMes
        );


    console.log(
        "Percentual diário:",
        percentualDia
    );


    console.log(
        "Percentual semanal:",
        percentualSemana
    );


    console.log(
        "Percentual mensal:",
        percentualMes
    );


    // =====================================================
    // % DA META DO MÊS
    // =====================================================

    atualizarPercentualMetaMes(
        percentualMes
    );


    // =====================================================
    // PERCENTUAL FALTANTE DA META MENSAL
    // =====================================================

    const percentualFaltanteMes =
        Math.max(
            100 - percentualMes,
            0
        );


    // =====================================================
    // VALOR FALTANTE DA META MENSAL
    // =====================================================

    const valorFaltanteMes =
        Math.max(
            metaMes - vendidoMes,
            0
        );


    console.log(
        "Percentual faltante:",
        percentualFaltanteMes
    );


    console.log(
        "Valor faltante:",
        valorFaltanteMes
    );


    // =====================================================
    // MOSTRAR % FALTANTE
    // =====================================================

    colocarTexto(
        "percentFaltanteMes",
        formatarPercentual(
            percentualFaltanteMes
        )
    );


    // =====================================================
    // MOSTRAR VALOR FALTANTE
    // =====================================================

    colocarTexto(
        "faltamMes",
        moeda(
            valorFaltanteMes
        )
    );


    // =====================================================
    // ATUALIZAR CÍRCULO DIÁRIO
    // =====================================================

    atualizarCirculoMeta(
        "dia",
        percentualDia
    );


    // =====================================================
    // ATUALIZAR CÍRCULO SEMANAL
    // =====================================================

    atualizarCirculoMeta(
        "semana",
        percentualSemana
    );


    // =====================================================
    // ATUALIZAR CÍRCULO MENSAL
    // =====================================================

    atualizarCirculoMeta(
        "mes",
        percentualMes
    );


    console.log(
        "METAS APLICADAS NO DASHBOARD."
    );

}


// =========================================================
// % META DO MÊS
// =========================================================

function atualizarPercentualMetaMes(
    percentual
) {

    const texto =
        formatarPercentual(
            percentual
        );


    console.log(
        "Atualizando percentual mensal:",
        texto
    );


    colocarTexto(
        "percentMes",
        texto
    );


    colocarTexto(
        "percentualMes",
        texto
    );


    colocarTexto(
        "percentMesTop",
        texto
    );


    colocarTexto(
        "percentMesCircle",
        texto
    );


    colocarTexto(
        "percentMesCircular",
        texto
    );


    const cardsResumo =
        document.querySelectorAll(
            ".summary-card"
        );


    if (
        cardsResumo.length >= 2
    ) {

        const cardMetaMes =
            cardsResumo[1];


        const percentual =
            cardMetaMes.querySelector(
                "b"
            );


        if (percentual) {

            percentual.textContent =
                texto;

        }

    }


    document
        .querySelectorAll(
            "[data-percent-mes]"
        )
        .forEach(
            function (elemento) {

                elemento.textContent =
                    texto;

            }
        );

}


// =========================================================
// ATUALIZAR CÍRCULO DA META
// =========================================================

function atualizarCirculoMeta(
    tipo,
    percentual
) {

    const percentualVisual =
        Math.min(
            Math.max(
                percentual,
                0
            ),
            100
        );


    const texto =
        formatarPercentual(
            percentual
        );


    console.log(
        "Atualizando círculo:",
        tipo,
        texto
    );


    const circulos =
        document.querySelectorAll(
            ".circle-progress"
        );


    circulos.forEach(
        function (circulo) {

            const textoCard =
                circulo
                    .closest(
                        ".goal-card"
                    );


            if (!textoCard) {

                return;

            }


            const conteudo =
                textoCard.textContent
                    .toLowerCase();


            let corresponde =
                false;


            if (
                tipo === "dia" &&
                (
                    conteudo.includes(
                        "meta diária"
                    ) ||
                    conteudo.includes(
                        "meta diaria"
                    )
                )
            ) {

                corresponde =
                    true;

            }


            if (
                tipo === "semana" &&
                conteudo.includes(
                    "meta semanal"
                )
            ) {

                corresponde =
                    true;

            }


            if (
                tipo === "mes" &&
                (
                    conteudo.includes(
                        "meta mensal"
                    ) ||
                    conteudo.includes(
                        "meta mês"
                    ) ||
                    conteudo.includes(
                        "meta mes"
                    )
                )
            ) {

                corresponde =
                    true;

            }


            const dataMeta =
                circulo.dataset.meta ||
                circulo.dataset.tipo ||
                circulo.dataset.type;


            if (
                dataMeta
            ) {

                if (
                    dataMeta
                        .toLowerCase() ===
                    tipo
                ) {

                    corresponde =
                        true;

                }

            }


            if (!corresponde) {

                return;

            }


            circulo.style.setProperty(
                "--progress",
                percentualVisual + "%"
            );


            const interno =
                circulo.querySelector(
                    ".circle-inner span"
                );


            if (interno) {

                interno.textContent =
                    texto;

            }


            const valorInterno =
                circulo.querySelector(
                    ".circle-value, .circle-percent"
                );


            if (valorInterno) {

                valorInterno.textContent =
                    texto;

            }

        }
    );


    const ids =
        {
            dia: [
                "circleDia",
                "progressCircleDia"
            ],

            semana: [
                "circleSemana",
                "progressCircleSemana"
            ],

            mes: [
                "circleMes",
                "progressCircleMes"
            ]
        };


    if (
        ids[tipo]
    ) {

        ids[tipo].forEach(
            function (id) {

                const circulo =
                    document.getElementById(
                        id
                    );


                if (!circulo) {

                    return;

                }


                circulo.style.setProperty(
                    "--progress",
                    percentualVisual + "%"
                );


                const interno =
                    circulo.querySelector(
                        ".circle-inner span"
                    );


                if (interno) {

                    interno.textContent =
                        texto;

                }

            }
        );

    }

}


// =========================================================
// RANKING GERAL
// =========================================================

function atualizarRanking(
    ranking
) {

    const rankingValido =
        ranking
            .filter(
                function (item) {

                    const producao =
                        numero(
                            item.producao
                        );


                    return (
                        producao > 0
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
            )
            .slice(
                0,
                10
            );


    console.log(
        "RANKING VÁLIDO:",
        rankingValido
    );


    const volumeGeral =
        ranking.reduce(
            function (
                total,
                item
            ) {

                return (
                    total +
                    numero(
                        item.producao
                    )
                );

            },
            0
        );


    colocarTexto(
        "volumeTotal",
        moeda(
            volumeGeral
        )
    );


    atualizarPodium(
        rankingValido
    );


    atualizarTabela(
        rankingValido
    );

}


// =========================================================
// PÓDIO
// =========================================================

function atualizarPodium(
    ranking
) {

    preencherPodium(
        1,
        ranking[0]
    );


    preencherPodium(
        2,
        ranking[1]
    );


    preencherPodium(
        3,
        ranking[2]
    );

}


// =========================================================
// PREENCHER PÓDIO
// =========================================================

function preencherPodium(
    posicao,
    pessoa
) {

    const nome =
        document.getElementById(
            "nome" + posicao
        );


    const valor =
        document.getElementById(
            "valor" + posicao
        );


    const foto =
        document.getElementById(
            "foto" + posicao
        );


    if (!pessoa) {

        if (nome) {

            nome.textContent =
                "-";

        }


        if (valor) {

            valor.textContent =
                "R$ -";

        }


        if (foto) {

            foto.removeAttribute(
                "src"
            );

            foto.style.display =
                "none";

        }

        return;

    }


    if (foto) {

        foto.style.display =
            "block";

    }


    if (nome) {

        nome.textContent =
            pessoa.nome ||
            "-";

    }


    if (valor) {

        valor.textContent =
            moeda(
                pessoa.producao
            );

    }


    if (foto) {

        const urlFoto =
            converterFotoDrive(
                pessoa.foto
            );


        if (urlFoto) {

            foto.src =
                urlFoto;


            foto.onerror =
                function () {

                    console.warn(
                        "Erro ao carregar foto:",
                        pessoa.foto
                    );


                    this.style.display =
                        "none";

                };


        } else {

            foto.removeAttribute(
                "src"
            );


            foto.style.display =
                "none";

        }

    }

}


// =========================================================
// TOP 10
// =========================================================

function atualizarTabela(
    ranking
) {

    const lista =
        document.getElementById(
            "rankingList"
        );


    if (!lista) {

        console.error(
            "Elemento #rankingList não encontrado."
        );


        return;

    }


    lista.innerHTML =
        "";


    ranking.forEach(
        function (
            item,
            index
        ) {

            const producao =
                numero(
                    item.producao
                );


            if (
                producao <= 0
            ) {

                return;

            }


            const linha =
                document.createElement(
                    "div"
                );


            linha.className =
                "ranking-row";


            const posicao =
                document.createElement(
                    "span"
                );


            posicao.className =
                "position";


            posicao.textContent =
                index + 1;


            const nome =
                document.createElement(
                    "span"
                );


            nome.className =
                "ranking-name";


            nome.textContent =
                item.nome ||
                "-";


            const valor =
                document.createElement(
                    "span"
                );


            valor.className =
                "ranking-value";


            valor.textContent =
                moeda(
                    producao
                );


            linha.appendChild(
                posicao
            );


            linha.appendChild(
                nome
            );


            linha.appendChild(
                valor
            );


            lista.appendChild(
                linha
            );

        }
    );

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


    if (
        url.includes(
            "drive.google.com/thumbnail"
        )
    ) {

        return url;

    }


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
            encodeURIComponent(
                id
            ) +
            "&sz=w600"
        );

    }


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


    return url;

}


// =========================================================
// PROGRESSO DAS METAS
// =========================================================

function atualizarProgresso(
    barraId,
    percentualId,
    realizado,
    meta
) {

    const barra =
        document.getElementById(
            barraId
        );


    const percentual =
        document.getElementById(
            percentualId
        );


    const porcentagem =
        calcularPercentual(
            realizado,
            meta
        );


    const largura =
        Math.min(
            Math.max(
                porcentagem,
                0
            ),
            100
        );


    if (barra) {

        barra.style.width =
            largura + "%";

    }


    if (percentual) {

        percentual.textContent =
            formatarPercentual(
                porcentagem
            );

    }

}


// =========================================================
// CALCULAR PERCENTUAL
// =========================================================

function calcularPercentual(
    realizado,
    meta
) {

    realizado =
        numero(
            realizado
        );


    meta =
        numero(
            meta
        );


    if (
        meta <= 0
    ) {

        return 0;

    }


    return (
        realizado /
        meta
    ) *
    100;

}


// =========================================================
// FORMATAÇÃO DE MOEDA
// =========================================================

function moeda(
    valor
) {

    valor =
        numero(
            valor
        );


    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

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
// PERCENTUAL
// =========================================================

function formatarPercentual(
    valor
) {

    valor =
        numero(
            valor
        );


    return valor.toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }
    ) + "%";

}


// =========================================================
// COLOCAR TEXTO NA PÁGINA
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
// DATA DE ATUALIZAÇÃO
// =========================================================

function atualizarData(
    data
) {

    const elemento =
        document.getElementById(
            "ultimaAtualizacao"
        );


    if (!elemento) {

        return;

    }


    try {

        const dataObj =
            new Date(
                data
            );


        if (
            isNaN(
                dataObj.getTime()
            )
        ) {

            elemento.textContent =
                "Última atualização: " +
                data;

            return;

        }


        const dataFormatada =
            dataObj.toLocaleString(
                "pt-BR",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        elemento.textContent =
            "Última atualização: " +
            dataFormatada;

    }

    catch (erro) {

        console.warn(
            "Erro ao formatar data:",
            erro
        );

    }

}


// =========================================================
// ATUALIZAÇÃO AUTOMÁTICA
// =========================================================
//
// Atualiza os dados a cada 60 segundos.
// A troca entre Tela 1 e Tela 2 continua MANUAL.
// =========================================================

setInterval(
    carregarRanking,
    60000
);
