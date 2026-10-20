const fs=require('fs'),path=require('path'),D=require('../source/diagrams.js'),L=require('../source/learning-diagrams.js');
const figures={'margin':D.geometry(),'candidates':D.candidates(),'distance':D.distance(),'dual':D.dual(),'slack':D.slack(),'soft':D.soft().svg,'features':D.feature(),'kernel':D.kernel().svg,'hinge':L.hingeCurve(),'scores':L.marginFigure()};
for(const [name,svg] of Object.entries(figures))fs.writeFileSync(path.join(__dirname,'../assets',name+'.svg'),svg);
console.log('Wrote SVM figures.');
