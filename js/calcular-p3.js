const mfInput = document.getElementById('mf');
const p3Input = document.getElementById('p3');

const mfValorSpan = document.getElementById('mf-valor');
const mfFinalSpan = document.getElementById('mf-final');
const resultadoSpan = document.getElementById('resultado');

function parseNota(value) {
  const n = parseFloat(value.replace(',', '.'));
  if (isNaN(n)) return null;
  if (n < 0) return 0;
  if (n > 10) return 10;
  return n;
}

function calcular() {
  const mf = parseNota(mfInput.value ?? '');
  const p3 = parseNota(p3Input.value ?? '');

  if (mf !== null) {
    mfValorSpan.textContent = mf.toFixed(1);

    // Verificar se está em exame (2.0 a 5.9)
    if (mf < 2.0) {
      resultadoSpan.className = 'reprovado';
      resultadoSpan.textContent = '❌ Sua nota está abaixo de 2.0 - Reprovado mesmo com P3';
      mfFinalSpan.textContent = '-';
      p3Input.disabled = true;
      return;
    } else if (mf >= 6.0) {
      resultadoSpan.className = 'aprovado';
      resultadoSpan.textContent = '✅ Você já está aprovado! Não precisa fazer P3.';
      mfFinalSpan.textContent = '-';
      p3Input.disabled = true;
      return;
    }

    p3Input.disabled = false;

    if (p3 !== null) {
      const mfFinal = (mf + p3) / 2;
      mfFinalSpan.textContent = mfFinal.toFixed(1);

      // Se P3 < 6, reprovado automaticamente
      if (mfFinal  < 6.0) {
        resultadoSpan.className = 'reprovado';
        resultadoSpan.textContent = '❌ Reprovado! P3 < 6.0';
      } else if (mfFinal >= 6.0) {
        resultadoSpan.className = 'aprovado';
        resultadoSpan.textContent = '✅ Aprovado!';
      } 
    } else {
      mfFinalSpan.textContent = '-';
      resultadoSpan.textContent = '';
      resultadoSpan.className = '';
    }
  } else {
    mfValorSpan.textContent = '-';
    mfFinalSpan.textContent = '-';
    resultadoSpan.textContent = '-';
    resultadoSpan.className = '';
  }
}

mfInput.addEventListener('input', calcular);
p3Input.addEventListener('input', calcular);
