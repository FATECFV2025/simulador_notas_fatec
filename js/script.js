const p1Input = document.getElementById('p1');
const at1Input = document.getElementById('at1');
const p2Input = document.getElementById('p2');
const at2Input = document.getElementById('at2');
const p3Input = document.getElementById('p3');

const n1Span = document.getElementById('n1');
const n2Span = document.getElementById('n2');
const mfSpan = document.getElementById('mf');
const conceitoSpan = document.getElementById('conceito');
const mfFinalSpan = document.getElementById('mf-final');
const conceitoFinalSpan = document.getElementById('conceito-final');
const p3Section = document.getElementById('p3-section');

function parseNota(value) {
  const n = parseFloat(value.replace(',', '.'));
  if (isNaN(n)) return null;
  if (n < 0) return 0;
  if (n > 10) return 10;
  return n;
}

function getConceito(nota) {
  if (nota >= 6.0) {
    return { texto: 'APROVADO', classe: 'aprovado' };
  } else if (nota >= 2.0) {
    return { texto: 'EXAME', classe: 'exame' };
  } else {
    return { texto: 'REPROVADO', classe: 'reprovado' };
  }
}

function calcular() {
  const p1 = parseNota(p1Input.value ?? '');
  const at1 = parseNota(at1Input.value ?? '');
  const p2 = parseNota(p2Input.value ?? '');
  const at2 = parseNota(at2Input.value ?? '');
  const p3 = parseNota(p3Input.value ?? '');

  let n1 = null;
  let n2 = null;
  let mf = null;

  if (p1 !== null && at1 !== null) {
    n1 = p1 * 0.7 + at1 * 0.3;
    n1Span.textContent = n1.toFixed(1);
  } else {
    n1Span.textContent = '-';
  }

  if (p2 !== null && at2 !== null) {
    n2 = p2 * 0.7 + at2 * 0.3;
    n2Span.textContent = n2.toFixed(1);
  } else {
    n2Span.textContent = '-';
  }

  if (n1 !== null && n2 !== null) {
    mf = (n1 + n2) / 2;
    mfSpan.textContent = mf.toFixed(1);

    // Verificar se está na margem de exame (2.0 a 5.9)
    if (mf >= 2.0 && mf < 6.0) {
      p3Section.style.display = 'block';
      
      // Se P3 foi preenchido, calcular MF Final
      if (p3 !== null) {
        const mfFinal = (mf + p3) / 2;
        mfFinalSpan.textContent = mfFinal.toFixed(1);
        
        // Se P3 < 6, reprovado automaticamente
        if (p3 < 6.0) {
          conceitoFinalSpan.textContent = 'REPROVADO';
          conceitoFinalSpan.className = 'reprovado';
        } else {
          // Determinar conceito final baseado na MF Final
          const conceitoFinal = getConceito(mfFinal);
          conceitoFinalSpan.textContent = conceitoFinal.texto;
          conceitoFinalSpan.className = conceitoFinal.classe;
        }
      } else {
        mfFinalSpan.textContent = '-';
        conceitoFinalSpan.textContent = '-';
        conceitoFinalSpan.className = '';
      }
    } else {
      p3Section.style.display = 'none';
      mfFinalSpan.textContent = '-';
      conceitoFinalSpan.textContent = '-';
      conceitoFinalSpan.className = '';
    }

    // Definir conceito da MF inicial
    const conceito = getConceito(mf);
    conceitoSpan.textContent = conceito.texto;
    conceitoSpan.className = conceito.classe;
  } else {
    mfSpan.textContent = '-';
    conceitoSpan.textContent = '-';
    conceitoSpan.className = '';
    p3Section.style.display = 'none';
    mfFinalSpan.textContent = '-';
    conceitoFinalSpan.textContent = '-';
    conceitoFinalSpan.className = '';
  }
}

p1Input.addEventListener('input', calcular);
at1Input.addEventListener('input', calcular);
p2Input.addEventListener('input', calcular);
at2Input.addEventListener('input', calcular);
p3Input.addEventListener('input', calcular);
