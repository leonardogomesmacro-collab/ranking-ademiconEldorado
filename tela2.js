// =========================================================
// TELA 02 — ADEMICON
// TOP 3 CRÉDITO + TOP 3 CONTRATOS
// =========================================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbxvRDqmECbpgdjMxwDGPSVAw2SgdBWtyXJxzmD-QWJCklFznz_pANTYvT71p1nc3OWi/exec";


// =========================================================
// INICIALIZAÇÃO
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("ADEMICON — TELA 02 INICIADA");

    carregarTela2();

});


// =========================================================
// BUSCAR DADOS DA API
// =========================================================

async function carregarTela2() {

    try {

        atualizarStatus("Conectando...", false);

        const resposta = await fetch(API_URL, {
            method: "GET",
            cache: "no-cache"
        });

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const dados = await resposta.json();

        if (!dados || dados.status !== "ok") {
            throw new Error(
                dados?.mensagem || "A API retornou uma resposta inválida."
            );
        }

        console.log("DADOS RECEBIDOS:", dados);

        // Ranking de crédito
        atualizarRanking(
            "listaSemana",
            dados.rankingSemana,
            "credito"
        );

        // Ranking de contratos
        atualizarRanking(
            "listaContratos",
            dados.rankingContratos,
            "quantidade"
        );

        atualizarStatus("Dados atualizados", true);

        console.log("Tela 02 atualizada com sucesso.");

    } catch (erro) {

        console.error("ERRO AO CARREGAR TELA 02:", erro);

        atualizarStatus("Erro na conexão", false);

    }

}


// =========================================================
// MONTAR OS RANKINGS
// =========================================================

function atualizarRanking(
    elementoId,
    ranking,
    tipo
) {

    const container =
        document.getElementById(elementoId);

    if (!container) {
        console.warn("Container não encontrado:", elementoId);
        return;
    }

    container.innerHTML = "";

    if (!Array.isArray(ranking) || ranking.length === 0) {

        container.innerHTML = `
            <div class="empty-ranking">
                Nenhum resultado disponível.
            </div>
        `;

        return;
    }

    const medalhas = ["1º", "2º", "3º"];

    const classes = ["first", "second", "third"];

    ranking.slice(0, 3).forEach(function (item, indice) {

        const nome =
            item.nome || "CONSULTOR";

        const foto =
            converterFotoDrive(item.foto);

        let valor = "-";

        if (tipo === "credito") {

            valor = moeda(item.credito);

        } else {

            const quantidade =
                numero(item.quantidade);

            valor =
                quantidade +
                (
                    quantidade === 1
                        ? " CONTRATO"
                        : " CONTRATOS"
                );

        }

        const card =
            document.createElement("div");

        card.className =
            "podium-item " + classes[indice];

        const posicao =
            document.createElement("div");

        posicao.className = "podium-position";
        posicao.textContent = medalhas[indice];

        const fotoWrapper =
            document.createElement("div");

        fotoWrapper.className = "photo-wrapper";

        if (foto) {

            const imagem =
                document.createElement("img");

            imagem.src = foto;
            imagem.alt = "Foto de " + nome;
            imagem.loading = "eager";

            imagem.onerror = function () {

                fotoWrapper.innerHTML = `
                    <div class="photo-placeholder">
                        SEM FOTO
                    </div>
                `;

            };

            fotoWrapper.appendChild(imagem);

        } else {

            fotoWrapper.innerHTML = `
                <div class="photo-placeholder">
                    SEM FOTO
                </div>
            `;

        }

        const nomeElemento =
            document.createElement("h3");

        nomeElemento.className = "podium-name";
        nomeElemento.textContent = nome;

        const valorElemento =
            document.createElement("div");

        valorElemento.className = "podium-value";
        valorElemento.textContent = valor;

        const parabens =
            document.createElement("div");

        parabens.className = "podium-congratulations";
        parabens.textContent = "PARABÉNS!";

        card.appendChild(posicao);
        card.appendChild(fotoWrapper);
        card.appendChild(nomeElemento);
        card.appendChild(valorElemento);
        card.appendChild(parabens);

        container.appendChild(card);

    });

}


// =========================================================
// STATUS DA API
// =========================================================

function atualizarStatus(texto, conectado) {

    const elemento =
        document.getElementById("status");

    if (elemento) {
        elemento.textContent = texto;
    }

    const bolinha =
        document.querySelector(".status-dot");

    if (!bolinha) {
        return;
    }

    if (conectado) {

        bolinha.style.background = "#00ff66";
        bolinha.style.boxShadow = "0 0 10px #00ff66";

    } else {

        bolinha.style.background = "#ff0000";
        bolinha.style.boxShadow = "0 0 10px #ff0000";

    }

}


// =========================================================
// GOOGLE DRIVE — CONVERTER FOTO
// =========================================================

function converterFotoDrive(url) {

    if (!url) {
        return "";
    }

    url = String(url).trim();

    if (url.includes("drive.google.com/thumbnail")) {
        return url;
    }

    const match =
        url.match(/\/file\/d\/([^/]+)/);

    if (match && match[1]) {

        return (
            "https://drive.google.com/thumbnail?id=" +
            encodeURIComponent(match[1]) +
            "&sz=w600"
        );

    }

    const idMatch =
        url.match(/[?&]id=([^&]+)/);

    if (idMatch && idMatch[1]) {

        return (
            "https://drive.google.com/thumbnail?id=" +
            encodeURIComponent(idMatch[1]) +
            "&sz=w600"
        );

    }

    return url;

}


// =========================================================
// CONVERTER PARA NÚMERO
// =========================================================

function numero(valor) {

    if (
        valor === null ||
        valor === undefined ||
        valor === ""
    ) {
        return 0;
    }

    if (typeof valor === "number") {

        return isNaN(valor) ? 0 : valor;

    }

    let texto = String(valor).trim();

    texto = texto.replace(/R\$/gi, "").trim();

    if (texto.includes(",")) {

        texto = texto
            .replace(/\./g, "")
            .replace(",", ".");

    }

    texto = texto.replace(/[^\d.-]/g, "");

    const resultado = parseFloat(texto);

    return isNaN(resultado) ? 0 : resultado;

}


// =========================================================
// FORMATAÇÃO DE MOEDA
// =========================================================

function moeda(valor) {

    return numero(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// =========================================================
// ATUALIZAÇÃO AUTOMÁTICA
// =========================================================

setInterval(
    carregarTela2,
    60000
);
