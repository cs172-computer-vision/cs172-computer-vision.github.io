// Bundled KaTeX is the only authoring dependency. No npm install is needed.
const fs=require('fs'),katex=require('../vendor/katex.min.js');
let input='';process.stdin.setEncoding('utf8');process.stdin.on('data',d=>input+=d);process.stdin.on('end',()=>{
let html=input.replace(/<m(\s+display="true")?>([\s\S]*?)<\/m>/g,(_,display,tex)=>katex.renderToString(tex,{displayMode:!!display,output:'html',throwOnError:true,strict:'error'}));process.stdout.write(html);
});
