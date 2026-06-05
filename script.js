async function carregarDados() {

    try {

        const resposta = await fetch("http://localhost:3000/jogadores");
        const jogadores = await resposta.json();

        document.getElementById("totalJogadores").textContent =
            jogadores.length;

        let totalGols = 0;
        let artilheiro = jogadores[0];

        jogadores.forEach(jogador => {

            totalGols += jogador.gols;

            if (jogador.gols > artilheiro.gols) {
                artilheiro = jogador;
            }

        });

        document.getElementById("totalGols").textContent =
            totalGols;

        document.getElementById("artilheiro").textContent =
            `${artilheiro.nome} (${artilheiro.gols})`;

        const nomes = jogadores.map(j => j.nome);
        const gols = jogadores.map(j => j.gols);

        new Chart(
            document.getElementById("graficoBarras"),
            {
                type: "bar",
                data: {
                    labels: nomes,
                    datasets: [{
                        label: "Gols",
                        data: gols
                    }]
                },
                options: {
                    responsive: true
                }
            }
        );

        const posicoes = {};

        jogadores.forEach(jogador => {

            if (!posicoes[jogador.posicao]) {
                posicoes[jogador.posicao] = 0;
            }

            posicoes[jogador.posicao]++;
        });

        new Chart(
            document.getElementById("graficoPizza"),
            {
                type: "pie",
                data: {
                    labels: Object.keys(posicoes),
                    datasets: [{
                        data: Object.values(posicoes)
                    }]
                }
            }
        );

        const ranking = [...jogadores]
            .sort((a, b) => b.gols - a.gols);

        const tbody = document.getElementById("ranking");

        ranking.forEach((jogador, indice) => {

            tbody.innerHTML += `
                <tr>
                    <td>${indice + 1}º</td>
                    <td>${jogador.nome}</td>
                    <td>${jogador.gols}</td>
                </tr>
            `;
        });

    } catch (erro) {

        console.error("Erro:", erro);

    }

}

carregarDados();