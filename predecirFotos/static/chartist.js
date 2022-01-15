!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("chart.js")):"function"==typeof define&&define.amd?define(["exports","chart.js"],t):t((e=e||self).ChartPCP={},e.Chart)}(this,function(e,t){"use strict";var i={axisWidth:40,position:"right"};function r(e,i){var r=i.prototype;return i.extend(Object.assign({_type:e,initialize:function(){r.initialize.call(this);var e=this._chart;this.chart=e,this.ctx=e.ctx,this.options=t.helpers.merge({},[this.chart.options.elements.linearAxis])},update:function(){var e=this._model.axisWidth,t=this._model.bottom-this._model.top;this.left=0,this.right=e,this.top=this._model.top,this.bottom=this._model.bottom,r.update.call(this,e,t),this.top=this._model.top,this.bottom=this._model.bottom,this._configure()},draw:function(){this.ctx.save();var e=this._view.axisWidth;"left"===this.options.position?this.ctx.translate(this._view.x-e,0):this.ctx.translate(this._view.x,0),r.draw.call(this,this._view),this.ctx.restore()}}))}t.defaults.global.elements.linearAxis=Object.assign({},t.scaleService.getScaleDefaults("linear"),i);var a=t.elements.LinearAxis=r("linearAxis",t.scaleService.getScaleConstructor("linear"));t.defaults.global.elements.logarithmicAxis=Object.assign({},t.scaleService.getScaleDefaults("logarithmic"),i);var o=t.elements.LogarithmicAxis=r("logarithmicAxis",t.scaleService.getScaleConstructor("logarithmic"));t.defaults.global.elements.lineSegment=Object.assign({},t.defaults.global.elements.line,{hoverBorderWidth:4,hoverBorderColor:"rgba(0,0,0,0.8)",borderCapStyle:"round",tension:0});var s=t.elements.LineSegment=t.Element.extend({_type:"lineSegment",_getLineParts:function(){var e=this._view,t=(e.y1-e.y)/(e.x1-e.x);return{d:e.y-e.x*t,k:t}},inRange:function(e,t){var i=this._view,r=this._getLineParts(),a=e*r.k+r.d,o=(t-r.d)/r.k+r.d,s=2*this._view.borderWidth;return(Math.abs(t-a)<s||Math.abs(e-o)<s)&&e+s>=i.x&&e-s<=i.x1&&t+s>=Math.min(i.y,i.y1)&&t-s<=Math.max(i.y,i.y1)},inLabelRange:function(e,t){return this.inRange(e,t)},tooltipPosition:function(){var e=this._view;return{x:(e.x1+e.x)/2,y:(e.y1+e.y)/2,padding:e.borderWidth}},getCenterPoint:function(){var e=this._view;return{x:(e.x1+e.x)/2,y:(e.y1+e.y)/2}},inXRange:function(e){var t=this._view,i=2*this._view.borderWidth;return e+i>=t.x&&e-i<=t.x1},inYRange:function(e){var t=this._view,i=2*this._view.borderWidth;return e+i>=Math.min(t.y,t.y1)&&e-i<=Math.max(t.y,t.y1)},draw:function(){var e=this._view,t=this._chart.ctx;t.save(),t.lineCap=e.borderCapStyle,t.setLineDash&&e.borderDash&&t.setLineDash(e.borderDash),t.lineDashOffset=e.borderDashOffset,t.lineJoin=e.borderJoinStyle,t.lineWidth=e.borderWidth,t.strokeStyle=e.borderColor,t.beginPath(),t.moveTo(e.x,e.y),e.tension?t.bezierCurveTo(e.xCPn,e.yCPn,e.xCPp1,e.yCPp1,e.x1,e.y1):t.lineTo(e.x1,e.y1),t.stroke(),t.restore()}});t.defaults.pcp=t.helpers.configMerge(t.defaults.global,{hover:{mode:"single"},scales:{xAxes:[{type:"pcp",offset:!0,gridLines:{display:!1}}],yAxes:[]},tooltips:{callbacks:{title:function(){return""},label:function(e,t){var i=t.labels[e.index],r=t.datasets.filter(function(e){return!e._meta||!e._meta.hidden}).map(function(t){return"".concat(t.label,"=").concat(t.data[e.index])});return"".concat(i,"(").concat(r.join(", "),")")}}}});var n=t.DatasetController.prototype,l=t.controllers.pcp=t.DatasetController.extend({datasetElementType:a,dataElementType:t.elements.LineSegment,_dataElementOptions:["backgroundColor","borderCapStyle","borderColor","borderDash","borderDashOffset","borderJoinStyle","borderWidth","hoverBackgroundColor","hoverBorderColor","hoverBorderWidth","tension"],_datasetElementOptions:["axisWidth"],linkScales:function(){var e=this.getDataset();e.yAxisID=e.label,n.linkScales.call(this)},addElements:function(){n.addElements.call(this);var e=this._getValueScale();Object.assign(e.options,this.getDataset().axis)},_getValueScale:function(){return this.getMeta().dataset},_getPreviousDataSetMeta:function(){for(var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.index)-1;e>=0;e--){var t=this.chart.getDatasetMeta(e);if(!t.hidden)return t}return null},_getNextDataSetMeta:function(){for(var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.index)+1;e<this.chart.data.datasets.length;e++){var t=this.chart.getDatasetMeta(e);if(!t.hidden)return t}return null},_getVisibleDatasetIndex:function(e){for(var t=e,i=e-1;i>=0;i--){this.chart.getDatasetMeta(i).hidden&&t--}return t},update:function(e){var t=this,i=this.getMeta(),r=i.dataset;(this.updateAxis(r,e),this._getPreviousDataSetMeta())&&(i.data||[]).forEach(function(i,r){t.updateElement(i,r,e),i.pivot()})},draw:function(){var e=this.getMeta(),t=e.data||[];e.dataset&&e.dataset.draw(),this._getPreviousDataSetMeta()&&t.forEach(function(e,t){e.draw()})},updateAxis:function(e){e._configure();var t=this._resolveDatasetElementOptions(e),i=this._getIndexScale().getPixelForValue(void 0,this._getVisibleDatasetIndex(this.index));e.id=this.getDataset().label,e.options.position=this._getPreviousDataSetMeta()?"right":"left",e._model=Object.assign({x:i,top:this.chart.chartArea.top,bottom:this.chart.chartArea.bottom},t),e.update(),e.pivot()},updateElement:function(e,i,r){var a=this,o=this._getPreviousDataSetMeta(),s=this._getPreviousDataSetMeta(o.index),n=this.getMeta(),l=this._getNextDataSetMeta(),h=this._resolveDataElementOptions(e,i),d=this._getIndexScale(),c=function(e,t){if(!e)return t;var o=d.getPixelForValue(void 0,a._getVisibleDatasetIndex(e.index)),s=e.dataset;return{x:o,y:r?s.getBasePixel():s.getPixelForValue(a.chart.data.datasets[e.index].data[i],i,e.index)}},u=c(n),v=c(o,u),g={x:v.x,y:v.y,x1:u.x,y1:u.y};if(h.tension){var x=c(s,v),p=c(l,u),f=t.helpers.splineCurve(x,v,u,h.tension),m=t.helpers.splineCurve(v,u,p,h.tension);g.xCPn=f.next.x,g.yCPn=f.next.y,g.xCPp1=m.previous.x,g.yCPp1=m.previous.y}e._model=Object.assign(g,h)},_findOtherSegments:function(e){var t=this,i=e._index,r=[];return this.chart._getSortedVisibleDatasetMetas().forEach(function(e){if(e.controller._type===t._type&&e.controller!==t){var a=e.data[i];a._model&&r.push(a)}}),r},removeHoverStyle:function(e){var t=this;n.removeHoverStyle.call(this,e),this._findOtherSegments(e).forEach(function(e){n.removeHoverStyle.call(t,e)})},_setHoverStyleImpl:function(e){var i=this.chart.data.datasets[e._datasetIndex],r=e._index,a=e.custom||{},o=e._model,s=t.helpers.getHoverColor;e.$previousStyle={backgroundColor:o.backgroundColor,borderColor:o.borderColor,borderWidth:o.borderWidth},o.backgroundColor=t.helpers.options.resolve([a.hoverBackgroundColor,i.hoverBackgroundColor,o.hoverBackgroundColor,s(o.backgroundColor)],void 0,r),o.borderColor=t.helpers.options.resolve([a.hoverBorderColor,i.hoverBorderColor,o.hoverBorderColor,s(o.borderColor)],void 0,r),o.borderWidth=t.helpers.options.resolve([a.hoverBorderWidth,i.hoverBorderWidth,o.hoverBorderWidth,o.borderWidth],void 0,r)},setHoverStyle:function(e){var t=this;this._setHoverStyleImpl(e),this._findOtherSegments(e).forEach(function(e){t._setHoverStyleImpl(e)})}}),h=t.scaleService.getScaleConstructor("category").extend({_getLabels:function(){var e=this.chart.data.datasets;return this._getMatchingVisibleMetas().map(function(t){return e[t.index].label})}});t.scaleService.registerScaleType("pcp",h,t.helpers.merge({},[t.scaleService.getScaleDefaults("category"),{}])),e.LineSegment=s,e.LinearAxis=a,e.LogarithmicAxis=o,e.PCPScale=h,e.ParallelCoordinates=l,Object.defineProperty(e,"__esModule",{value:!0})});