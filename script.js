
/* ==========================================
   DIGITAL BALANCE
   Simulador de uso das redes sociais
   ========================================== */

// Base de dados da atividade
const dadosPesquisa = {
  mediaNacionalDiaria: 4,
  alertaSaude: 6,

  sugestoes: [
    {
      limite: 2,
      titulo: "Seu equilíbrio digital",
      mensagem:
        "Muito bom! De acordo com os critérios deste simulador, " +
        "seu tempo de uso é reduzido. Continue reservando espaço " +
        "para seus hobbies, descanso e momentos fora das telas."
    },
    {
      limite: 5,
      titulo: "Hora de refletir",
      mensagem:
        "As redes sociais fazem parte da rotina, mas vale observar " +
        "quanto tempo elas ocupam no seu dia. Você poderia dedicar " +
        "parte desse tempo a outras atividades?"
    },
    {
      limite: 24,
      titulo: "Atenção ao seu tempo",
      mensagem:
        "Seu tempo conectado é elevado. Reflita sobre como esse " +
        "hábito se relaciona com seu sono, seus estudos, suas " +
        "atividades e sua convivência com outras pessoas. " +
        "Pequenas mudanças podem ajudar a criar uma rotina mais equilibrada."
    }
  ]
};

// Elementos do HTML
const campoHoras = document.getElementById("horas");
const botaoCalcular = document.getElementById("calcular");
const areaResultado = document.getElementById("resultado");

// Formatar números sem casas decimais desnecessárias
function formatarHoras(valor) {
  return valor.toLocaleString("pt-BR", {
    maximumFractionDigits: 2
  });
}

// Exibir mensagens com segurança
function mostrarMensagem(html) {
  areaResultado.innerHTML = html;
  areaResultado.hidden = false;

  areaResultado.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

// Escolher a reflexão adequada
function obterReflexao(horas) {
  if (horas <= dadosPesquisa.sugestoes[0].limite) {
    return dadosPesquisa.sugestoes[0];
  }

  if (horas <= dadosPesquisa.sugestoes[1].limite) {
    return dadosPesquisa.sugestoes[1];
  }

  return dadosPesquisa.sugestoes[2];
}

// Comparar o tempo com a referência
function compararMedia(horas) {
  const media = dadosPesquisa.mediaNacionalDiaria;

  if (horas > media) {
    return `Seu uso está ${formatarHoras(horas - media)} hora(s) ` +
      "acima da referência diária de " + media + " horas.";
  }

  if (horas < media) {
    return `Seu uso está ${formatarHoras(media - horas)} hora(s) ` +
      "abaixo da referência diária de " + media + " horas.";
  }

  return `Seu uso é igual à referência de ${media} horas por dia.`;
}

// Validar a entrada do usuário
function validarHoras() {
  const valor = campoHoras.value.trim();
  const horas = Number(valor);

  if (
    valor === "" ||
    !Number.isFinite(horas) ||
    horas < 0 ||
    horas > 24
  ) {
    campoHoras.setAttribute("aria-invalid", "true");

    mostrarMensagem(`
      <h2>⚠️ Verifique o valor</h2>
      <p>Digite um número entre <strong>0 e 24 horas</strong>
      para continuar.</p>
    `);

    campoHoras.focus();
    return null;
  }

  campoHoras.removeAttribute("aria-invalid");
  return horas;
}

// Calcular e apresentar o resultado
function calcularTempo() {
  const horasDiarias = validarHoras();

  if (horasDiarias === null) {
    return;
  }

  // Cálculos de tempo
  const horasSemanais = horasDiarias * 7;
  const horasMensais = horasDiarias * 30;
  const diasEquivalentes = horasSemanais / 24;

  // Obter as mensagens
  const reflexao = obterReflexao(horasDiarias);
  const comparacao = compararMedia(horasDiarias);

  // Criar o alerta configurado na atividade
  let alertaHTML = "";

  if (horasDiarias >= dadosPesquisa.alertaSaude) {
    alertaHTML = `
      <div class="alerta-uso">
        <strong>⚡ Ponto de atenção</strong>
        <p>
          Seu tempo atingiu ou ultrapassou ${dadosPesquisa.alertaSaude}
          horas diárias, o parâmetro de alerta deste projeto.
          Considere observar seus hábitos e fazer pausas.
        </p>
      </div>
    `;
  }

  // Montar o resultado
  mostrarMensagem(`
    <div class="resultado-cabecalho">
      <span class="resultado-etiqueta">SEU RELATÓRIO DIGITAL</span>
      <h2>📊 Seu tempo em perspectiva</h2>
      <p>${comparacao}</p>
    </div>

    <div class="resultado-grade">
      <div class="resultado-card">
        <span class="resultado-icone">◷</span>
        <p class="resultado-label">POR DIA</p>
        <p class="resultado-numero">
          ${formatarHoras(horasDiarias)}<span> h</span>
        </p>
      </div>

      <div class="resultado-card">
        <span class="resultado-icone">▦</span>
        <p class="resultado-label">POR SEMANA</p>
        <p class="resultado-numero">
          ${formatarHoras(horasSemanais)}<span> h</span>
        </p>
      </div>

      <div class="resultado-card resultado-card-mensal">
        <span class="resultado-icone">◷</span>
        <p class="resultado-label">EM 30 DIAS</p>
        <p class="resultado-numero">
          ${formatarHoras(horasMensais)}<span> h</span>
        </p>
      </div>
    </div>

    <div class="reflexao">
      <span class="reflexao-etiqueta">SUA REFLEXÃO</span>
      <h3>${reflexao.titulo}</h3>
      <p>${reflexao.mensagem}</p>
    </div>

    <div class="tempo-equivalente">
      <p>
        <strong>${formatarHoras(diasEquivalentes)} dias</strong>
        <span> é o equivalente a esse tempo semanal, se convertido
        em períodos de 24 horas.</span>
      </p>
    </div>

    ${alertaHTML}

    <p class="mensagem-final">
      ✦ Seu tempo é valioso. Use a tecnologia a seu favor!
    </p>
  `);
}

// Clique no botão
botaoCalcular.addEventListener("click", calcularTempo);

// Permitir calcular com Enter
campoHoras.addEventListener("keydown", function(evento) {
  if (evento.key === "Enter") {
    calcularTempo();
  }
});

// Limpar o estado de erro quando o usuário editar o campo
campoHoras.addEventListener("input", function() {
  campoHoras.removeAttribute("aria-invalid");
});
