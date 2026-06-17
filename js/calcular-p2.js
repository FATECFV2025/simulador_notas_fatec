const p1Input = document.getElementById('p1');
const at1Input = document.getElementById('at1');
const at2Input = document.getElementById('at2');

const n1Span = document.getElementById('n1');
const p2MinimaSpan = document.getElementById('p2-minima');
const situacaoSpan = document.getElementById('situacao');

function parseNota(value) {
  const n = parseFloat(value.replace(',', '.'));
  if (isNaN(n)) return null;
  if (n < 0) return 0;
  if (n > 10) return 10;
  return n;
}

function calcular() {
  const p1 = parseNota(p1Input.value ?? '');
  const at1 = parseNota(at1Input.value ?? '');
  const at2 = parseNota(at2Input.value ?? '');

  if (p1 !== null && at1 !== null) {
    const n1 = p1 * 0.7 + at1 * 0.3;
    n1Span.textContent = n1.toFixed(1);

    if (at2 !== null) {
      const n2ParaAprovacao = 12.0 - n1;
      const p2ParaAprovacao = (n2ParaAprovacao - at2 * 0.3) / 0.7;
      const n2ParaExame = 4.0 - n1;
      const p2ParaExame = (n2ParaExame - at2 * 0.3) / 0.7;

      if (p2ParaAprovacao < 0) {
        p2MinimaSpan.textContent = '0.0';
        situacaoSpan.className = 'aprovado';
        situacaoSpan.textContent = '✅ Aprovado! Qualquer nota em P2 já aprova você!';
      } else if (p2ParaAprovacao <= 10) {
        p2MinimaSpan.textContent = p2ParaAprovacao.toFixed(1);
        situacaoSpan.className = 'exame';
        situacaoSpan.textContent = `⚠️ Você precisa de pelo menos ${p2ParaAprovacao.toFixed(1)} em P2 para passar direto.`;
      } else if (p2ParaExame <= 10) {
        p2MinimaSpan.textContent = p2ParaExame <= 0 ? '0.0' : p2ParaExame.toFixed(1);
        situacaoSpan.className = 'exame';
        situacaoSpan.textContent = `⚠️ Não dá para passar direto na P2. Para ir à P3, você precisa de pelo menos ${p2ParaExame <= 0 ? '0.0' : p2ParaExame.toFixed(1)} em P2.`;
      } else {
        p2MinimaSpan.textContent = 'Impossível';
        situacaoSpan.className = 'reprovado';
        situacaoSpan.textContent = '❌ Mesmo com 10,0 na P2 você não alcança média para P3.';
      }
    } else {
      p2MinimaSpan.textContent = '-';
      situacaoSpan.textContent = 'Preencha AT2 para calcular';
      situacaoSpan.className = '';
    }
  } else {
    n1Span.textContent = '-';
    p2MinimaSpan.textContent = '-';
    situacaoSpan.textContent = '-';
    situacaoSpan.className = '';
  }
}

p1Input.addEventListener('input', calcular);
at1Input.addEventListener('input', calcular);
at2Input.addEventListener('input', calcular);
