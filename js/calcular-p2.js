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
      // Precisamos calcular qual P2 é necessário para MF = 6.0
      // MF = (N1 + N2) / 2 = 6.0
      // N1 + N2 = 12.0
      // N2 = 12.0 - N1
      // N2 = P2 * 0.7 + AT2 * 0.3 = 12.0 - N1
      // P2 * 0.7 = 12.0 - N1 - AT2 * 0.3
      // P2 = (12.0 - N1 - AT2 * 0.3) / 0.7

      const n2Necessaria = 12.0 - n1;
      const p2Necessaria = (n2Necessaria - at2 * 0.3) / 0.7;

      if (p2Necessaria < 0) {
        p2MinimaSpan.textContent = '0.0';
        situacaoSpan.className = 'aprovado';
        situacaoSpan.textContent = '✅ Aprovado! Qualquer nota em P2 já aprova você!';
      } else if (p2Necessaria > 10) {
        p2MinimaSpan.textContent = 'Impossível';
        situacaoSpan.className = 'reprovado';
        situacaoSpan.textContent = '❌ Impossível passar com essas notas em P1 e AT2.';
      } else {
        p2MinimaSpan.textContent = p2Necessaria.toFixed(1);
        situacaoSpan.className = 'exame';
        situacaoSpan.textContent = `⚠️ Você precisa de pelo menos ${p2Necessaria.toFixed(1)} em P2`;
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
