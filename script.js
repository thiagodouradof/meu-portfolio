const GH = 'https://github.com/thiagodouradof/';
const cases = [
  { area: 'IA', title: 'Agente validador de documentos financeiros', repo: 'ai-financial-doc-validator',
    problem: 'Conferência manual e cruzamento de mais de 20 arquivos financeiros críticos, sujeito a erro humano e gargalos.',
    solution: 'Agente com LLMs e prompts estruturados que ingere duas bases, cruza divergências, aplica regras de negócio e gera um parecer executivo de auditoria.',
    impact: 'Fim das conferências manuais repetitivas, inconsistências detectadas na hora e mais confiabilidade.',
    stack: ['Python', 'LLMs', 'Prompt Engineering', 'Pandas'] },
  { area: 'Finanças', title: 'Pipeline de triagem e extração de contratos', repo: 'contract-ai-triage-pipeline',
    problem: 'Análise manual de centenas de contratos de fornecedores e licenças para achar cláusulas, prazos, valores e riscos.',
    solution: 'Fluxo ponta a ponta com extração automatizada, orquestração e LLMs: ingestão em lote de 400+ contratos e pré-análise de 200+, gerando tabela analítica.',
    impact: 'Mais de 30 minutos a menos por contrato, abrindo espaço para estudos de eficiência e renegociação em escala.',
    stack: ['Python', 'Power Automate', 'LLMs', 'SQL'] },
  { area: 'Finanças', title: 'Portal de consolidação de mapas de custo FP&A', repo: 'fpa-cost-map-portal',
    problem: 'Modelos de custeio fragmentados entre áreas, com retrabalho manual para consolidar e distribuir bases.',
    solution: 'Ferramenta interna que unifica, trata e publica bases e visões de custos para consumo automatizado por mais de 20 áreas de FP&A.',
    impact: 'Governança de custos padronizada, rotinas diárias reduzidas a minutos e autoatendimento para os times.',
    stack: ['Python', 'SQL', 'Streamlit', 'SharePoint'] },
  { area: 'Operações', title: 'Otimização de licenças de software com ML', repo: 'software-license-clustering-ml',
    problem: 'Pouca visibilidade sobre o uso real dos softwares corporativos, com desperdício em licenças subutilizadas.',
    solution: 'K-Means (Scikit-Learn) sobre logs sintéticos de uso para segmentar usuários em heavy, moderado e ocioso, com app Streamlit que recomenda realocações.',
    impact: 'Base de dados para cortar desperdício e otimizar o orçamento de TI.',
    stack: ['Python', 'Scikit-Learn', 'K-Means', 'Streamlit'] },
  { area: 'Operações', title: 'Gerador de templates web (Lean Six Sigma)', repo: 'web-app-scaffolding-cli',
    problem: 'Tempo perdido com boilerplate, estrutura de pastas e padrões a cada nova aplicação web interna.',
    solution: 'CLI de scaffolding que gera templates padronizados de front-end e back-end prontos para codar. Projeto que validou a certificação Lean Six Sigma Yellow Belt.',
    impact: 'Setup inicial mais rápido, arquitetura padronizada e menos desperdício no ciclo de desenvolvimento.',
    stack: ['Python', 'CLI', 'Templates', 'Git'] },
  { area: 'IA', title: 'Hackathon PwC: 2º lugar', repo: null,
    problem: 'Desafio interno de dados e IA aplicados a um cenário de negócio, com tempo curto de entrega.',
    solution: 'Solução prototipada em equipe e apresentada à banca. Edite este texto com o tema e a abordagem do seu projeto.',
    impact: 'Segundo lugar na competição interna da PwC Brasil.',
    stack: ['Python', 'IA Generativa'] }
];
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const grid = document.getElementById('grid');
grid.innerHTML = cases.map(c => `
  <article class="card" data-area="${c.area}">
    <span class="badge b-${c.area}">${c.area}</span>
    <h3>${esc(c.title)}</h3>
    <dl>
      <div><dt>Problema</dt><dd>${esc(c.problem)}</dd></div>
      <div><dt>Solução construída</dt><dd>${esc(c.solution)}</dd></div>
      <div><dt>Impacto</dt><dd class="impact">${esc(c.impact)}</dd></div>
    </dl>
    <ul class="chips">${c.stack.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
    <div class="cta">
      ${c.repo ? `<a class="btn" href="${GH}${c.repo}" target="_blank" rel="noopener">Repositório</a>` : ''}
      <a class="btn ghost" aria-disabled="true" href="#cases" title="Demo em breve">Demo em breve</a>
    </div>
  </article>`).join('');

document.querySelector('.filters').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  document.querySelectorAll('.filters button').forEach(x => x.classList.toggle('on', x === b));
  grid.querySelectorAll('.card').forEach(card => {
    card.hidden = b.dataset.f !== 'all' && card.dataset.area !== b.dataset.f;
  });
});
