
const dadosPesquisa = {
  mediaNacionalDiaria: 4,
  alertaSaude: 6,

  sugestoes: [
    {
      limite: 2,
      mensagem:
        "Parabéns! Seu uso está equilibrado. " +
        "Você tem mais tempo livre para hobbies e descanso."
    },
    {
      limite: 5,
      mensagem:
        "Atenção! Seu uso está próximo da média nacional. " +
        "Você já dedica muitas horas da semana à tela."
    },
    {
      limite: 24,
      mensagem:
        "Cuidado! Seu tempo de uso é elevado. " +
        "O uso excessivo pode prejudicar seu sono e sua concentração. " +
        "Que tal reservar momentos longe das telas?"
    }
  ]
};

const campoHoras = document.getElementById("horas");
const botao = document.getElementById("calcular");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", function () {
  const horasDiarias = Number(campoHoras.value);

  // Validar o valor informado
  if (
    campoHoras.value.trim() === "" ||
    !Number.isFinite(horasDiarias) ||
    horasDiarias < 0 ||
    horasDiarias > 24
  ) {
    resultado.hidden = false;
    resultado.innerHTML =
      "<p>Digite um número entre 0 e 24 horas.</p>";
    return;
  }

  // Realizar os cálculos
  const horasSemanais = horasDiarias * 7;
  const horasMensais = horasDiarias * 30;

  // Comparar com a média de referência
  const media = dadosPesquisa.mediaNacionalDiaria;
  let mensagemComparacao;

  if (horasDiarias > media) {
    mensagemComparacao =
      `Seu uso diário está acima da referência de ${media} horas.`;
  } else if (horasDiarias < media) {
    mensagemComparacao =
      `Seu uso diário está abaixo da referência de ${media} horas.`;
  } else {
    mensagemComparacao =
      `Seu uso diário é igual à referência de ${media} horas.`;
  }

  // Selecionar a mensagem reflexiva
  let mensagemReflexao;

  if (horasDiarias <= dadosPesquisa.sugestoes[0].limite) {
    mensagemReflexao = dadosPesquisa.sugestoes[0].mensagem;
  } else if (horasDiarias <= dadosPesquisa.sugestoes[1].limite) {
    mensagemReflexao = dadosPesquisa.sugestoes[1].mensagem;
  } else {
    mensagemReflexao = dadosPesquisa.sugestoes[2].mensagem;
  }

  // Verificar o limite de alerta definido na atividade
  let alerta = "";

  if (horasDiarias >= dadosPesquisa.alertaSaude) {
    alerta =
      "<p><strong>Atenção:</strong> seu uso atingiu ou ultrapassou " +
      "o limite de alerta configurado neste simulador.</p>";
  }

  // Exibir o resultado
  resultado.hidden = false;

  resultado.innerHTML = `
    <h2>📊 Seu resultado</h2>

    <p>Você passa <strong>${horasDiarias} horas por dia</strong>
    nas redes sociais.</p>

    <p>Isso representa <strong>${horasSemanais} horas por semana</strong>
    e <strong>${horasMensais} horas em 30 dias</strong>.</p>

    <p>${mensagemComparacao}</p>

    <p><strong>Reflexão:</strong> ${mensagemReflexao}</p>

    ${alerta}

    <p>Que tal pensar em como você poderia aproveitar
    parte desse tempo em outras atividades?</p>
  `;
});
