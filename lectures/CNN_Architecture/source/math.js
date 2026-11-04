(()=>{
  for(const e of document.querySelectorAll('m')){
    const span=document.createElement('span');
    span.className='math'+(e.className?' '+e.className:'');
    for(const [key,value] of Object.entries(e.dataset))span.dataset[key]=value;
    span.innerHTML=katex.renderToString(e.textContent,{
      displayMode:e.getAttribute('display')==='true',
      output:'htmlAndMathml',throwOnError:true,strict:'error'
    });
    e.replaceWith(span);
  }
  document.documentElement.dataset.mathReady='true';
})();
