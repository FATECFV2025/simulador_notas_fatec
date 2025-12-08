const totalAulasSelect = document.getElementById('total-aulas');
const horasAulaSelect = document.getElementById('horas-aula');
const aulasFrequentadasInput = document.getElementById('aulas-frequentadas');

const totalHorasSpan = document.getElementById('total-horas');
const horasMinmasSpan = document.getElementById('horas-minimas');
const presencaSpan = document.getElementById('presenca');
const statusFrequenciaSpan = document.getElementById('status-frequencia');
const faltasPermitdasSpan = document.getElementById('faltas-permitidas');
const resultadoFrequenciaDiv = document.getElementById('resultado-frequencia');

function calcular() {
  const totalAulas = parseInt(totalAulasSelect.value);
  const horasAula = parseInt(horasAulaSelect.value);
  const aulasFrequentadas = parseInt(aulasFrequentadasInput.value);

  if (!totalAulas || !horasAula) {
    totalHorasSpan.textContent = '-';
    horasMinmasSpan.textContent = '-';
    presencaSpan.textContent = '-';
    statusFrequenciaSpan.textContent = '-';
    faltasPermitdasSpan.textContent = '-';
    resultadoFrequenciaDiv.style.background = '#f0f4ff';
    return;
  }

  // Calcular total de horas
  const totalHoras = totalAulas * horasAula;
  const horasMinimas = totalHoras * 0.75;
  const aulasMinimas = totalAulas * 0.75;
  const faltasPermitidas = totalAulas - aulasMinimas;

  totalHorasSpan.textContent = totalHoras.toFixed(0);
  horasMinmasSpan.textContent = horasMinimas.toFixed(1);
  faltasPermitdasSpan.textContent = Math.floor(faltasPermitidas);

  // Se aulas frequentadas foi preenchido
  if (!isNaN(aulasFrequentadas) && aulasFrequentadas >= 0) {
    // Validar limite máximo
    const aulasValidadas = Math.min(aulasFrequentadas, totalAulas);
    const percentualPresenca = (aulasValidadas / totalAulas) * 100;

    presencaSpan.textContent = percentualPresenca.toFixed(1);

    // Determinar status
    if (percentualPresenca >= 75) {
      statusFrequenciaSpan.textContent = '✅ FREQUÊNCIA OK';
      statusFrequenciaSpan.className = 'aprovado';
      resultadoFrequenciaDiv.style.background = '#e8f5e9';
    } else {
      statusFrequenciaSpan.textContent = '❌ FREQUÊNCIA BAIXA';
      statusFrequenciaSpan.className = 'reprovado';
      resultadoFrequenciaDiv.style.background = '#ffebee';
    }
  } else {
    presencaSpan.textContent = '-';
    statusFrequenciaSpan.textContent = '-';
    statusFrequenciaSpan.className = '';
    resultadoFrequenciaDiv.style.background = '#f0f4ff';
  }
}

totalAulasSelect.addEventListener('change', calcular);
horasAulaSelect.addEventListener('change', calcular);
aulasFrequentadasInput.addEventListener('input', calcular);
