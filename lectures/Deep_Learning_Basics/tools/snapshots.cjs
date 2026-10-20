const fs=require('fs'),path=require('path'),D=require('../source/diagrams.js');
const assets=path.join(__dirname,'../assets');
const figures={network:D.network(),hinge:D.hingeCurve(),'score-margin':D.marginFigure(),svm:D.svm(),landscape:D.contour(),batches:D.batches(),'mlp-blocks':D.blocks(),neuron:D.neuron(),relu:D.activation(),activations:D.activations(),'training-graph':D.trainingGraph()};
for(const [name,svg] of Object.entries(figures))fs.writeFileSync(path.join(assets,name+'.svg'),svg);
console.log(`Wrote ${Object.keys(figures).length} editable SVG figures.`);
