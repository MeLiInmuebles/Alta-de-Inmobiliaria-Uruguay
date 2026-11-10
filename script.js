(() => {
  'use strict';
  const search = document.getElementById('faqSearch');
  const allItems = Array.from(document.querySelectorAll('.faq-item'));
  const groups = Array.from(document.querySelectorAll('.faq-group'));
  const status = document.getElementById('search-result');
  const empty = document.getElementById('no-results');
  const topics = document.querySelector('.topics');
  const simplify = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-UY');
  function filterQuestions() {
    const query = simplify(search.value.trim());
    let visible = 0;
    for (const item of allItems) {
      const isMatch = !query || simplify(item.textContent).includes(query);
      item.hidden = !isMatch;
      if (isMatch) visible++;
    }
    for (const section of groups) {
      section.hidden = !Array.from(section.querySelectorAll('.faq-item')).some(item => !item.hidden);
    }
    topics.hidden = !!query;
    empty.hidden = visible !== 0;
    status.textContent = `${visible} ${visible === 1 ? 'pregunta disponible' : 'preguntas disponibles'}`;
  }
  search.addEventListener('input', filterQuestions);
  document.getElementById('clear-search').addEventListener('click', () => {
    search.value = '';
    filterQuestions();
    search.focus();
  });
  document.getElementById('expand-all').addEventListener('click', () => {
    allItems.forEach(item => { if (!item.hidden) item.open = true; });
  });
  document.getElementById('collapse-all').addEventListener('click', () => {
    allItems.forEach(item => { item.open = false; });
  });
})();

// User-initiated playback with clear, functional fallback.
(function(){
  const v=document.getElementById('videoPrincipal');
  const b=document.getElementById('playVideoButton');
  const e=document.getElementById('videoPlaybackError');
  if(!v||!b)return;
  const showError=()=>{if(e)e.hidden=false;};
  v.addEventListener('error',showError);
  v.addEventListener('play',()=>{b.textContent='Pausar video';if(e)e.hidden=true;});
  v.addEventListener('pause',()=>{b.textContent='▶ Reproducir video';});
  b.addEventListener('click',async()=>{
    if(!v.paused){v.pause();return;}
    try { await v.play(); }catch(err){showError();}
  });
})();
