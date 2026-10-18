const D=require('../source/diagrams.js'),fs=require('fs'),path=require('path');
for(const [f,s] of Object.entries({knn1:D.knn(1),knn7:D.knn(7),metric:D.metric(),linear:D.linear(),hard:D.hard(),cv:D.cv(),cvplot:D.cvplot(),softmax:D.softplot(),loss:D.lossplot(),pixels:D.pixels(),'nearest-plot':D.nearestPlot(),'metric-compare':D.metricComparison(),'knn-focus':D.knn(1,'l2',{x:-.5,y:1.05},true,true)}))fs.writeFileSync(path.join(__dirname,'../assets/'+f+'.svg'),s);
console.log('Updated 13 SVG snapshots.');
