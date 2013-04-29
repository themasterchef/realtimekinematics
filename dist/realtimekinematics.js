// Copyright © 2013 Christopher Kilding

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * almond 0.1.2 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

(function(e,t){typeof define=="function"&&define.amd?define([],t):e.realtimekinematics=t()})(this,function(){var e,t,n;return function(r){function c(e,t){var n=t&&t.split("/"),r=o.map,i=r&&r["*"]||{},s,u,a,f,l,c,h,p,d,v;if(e&&e.charAt(0)==="."&&t){n=n.slice(0,n.length-1),e=n.concat(e.split("/"));for(p=0;v=e[p];p++)if(v===".")e.splice(p,1),p-=1;else if(v===".."){if(p===1&&(e[2]===".."||e[0]===".."))return!0;p>0&&(e.splice(p-1,2),p-=2)}e=e.join("/")}if((n||i)&&r){s=e.split("/");for(p=s.length;p>0;p-=1){u=s.slice(0,p).join("/");if(n)for(d=n.length;d>0;d-=1){a=r[n.slice(0,d).join("/")];if(a){a=a[u];if(a){f=a,l=p;break}}}if(f)break;!c&&i&&i[u]&&(c=i[u],h=p)}!f&&c&&(f=c,l=h),f&&(s.splice(0,l,f),e=s.join("/"))}return e}function h(e,t){return function(){return l.apply(r,a.call(arguments,0).concat([e,t]))}}function p(e){return function(t){return c(t,e)}}function d(e){return function(t){i[e]=t}}function v(e){if(s.hasOwnProperty(e)){var t=s[e];delete s[e],u[e]=!0,f.apply(r,t)}if(!i.hasOwnProperty(e))throw new Error("No "+e);return i[e]}function m(e,t){var n,r,i=e.indexOf("!");return i!==-1?(n=c(e.slice(0,i),t),e=e.slice(i+1),r=v(n),r&&r.normalize?e=r.normalize(e,p(t)):e=c(e,t)):e=c(e,t),{f:n?n+"!"+e:e,n:e,p:r}}function g(e){return function(){return o&&o.config&&o.config[e]||{}}}var i={},s={},o={},u={},a=[].slice,f,l;f=function(e,t,n,o){var a=[],f,l,c,p,y,b;o=o||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(b=0;b<t.length;b++){y=m(t[b],o),c=y.f;if(c==="require")a[b]=h(e);else if(c==="exports")a[b]=i[e]={},f=!0;else if(c==="module")l=a[b]={id:e,uri:"",exports:i[e],config:g(e)};else if(i.hasOwnProperty(c)||s.hasOwnProperty(c))a[b]=v(c);else if(y.p)y.p.load(y.n,h(o,!0),d(c),{}),a[b]=i[c];else if(!u[c])throw new Error(e+" missing "+c)}p=n.apply(i[e],a);if(e)if(l&&l.exports!==r&&l.exports!==i[e])i[e]=l.exports;else if(p!==r||!f)i[e]=p}else e&&(i[e]=n)},e=t=l=function(e,t,n,i){return typeof e=="string"?v(m(e,t).f):(e.splice||(o=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},i?f(r,e,t,n):setTimeout(function(){f(r,e,t,n)},15),l)},l.config=function(e){return o=e,l},n=function(e,t,n){t.splice||(n=t,t=[]),s[e]=[e,t,n]},n.amd={jQuery:!0}}(),n("tools/almond",function(){}),n("src/util/Vector",[],function(){var e=function(e,t){if(e&&t&&e.length===t.length){var n=e.map(function(e,n){return Math.pow(e-t[n],2)}).reduce(function(e,t){return e+t});return n}},t=function(t,n){var r=e(t,n);if(r)return Math.sqrt(r)},n=function(e,t){if(e&&t&&e.length===t.length)return e.map(function(e,n){return e*t[n]}).reduce(function(e,t){return e+t})},r=function(e){if(e)return e.map(function(e){return e})},i=function(e){return Math.sqrt(n(e))},s=function(e){if(e){var t=i(e);return t===0?r(e):e.map(function(e){return e/t})}},o=function(e,t){var r=s(e),i=s(t),o=n(r,i);return Math.acos(o)};return{distanceBetween:t,distanceSquaredBetween:e,dot:n,dup:r,modulus:i,angleBetween:o}}),n("src/kinematics/PastAndPresent",["src/util/Vector"],function(e){function t(){this.latestCoords=[0,0,0],this.previousCoords=[0,0,0]}return t.prototype.push=function(e,t,n){this.latestCoords=e;var r;return t&&(r=t.call(n,this.previousCoords,this.latestCoords)),this.previousCoords=e,r},t.prototype.clear=function(){this.latestCoords=[0,0,0],this.previousCoords=[0,0,0]},t.prototype.getDistance=function(t,n){return e.distanceBetween(t,n)},t.prototype.getDistanceFromLatest=function(t){return e.distanceBetween(this.latestCoords,t)},t}),n("src/kinematics/RollingAverage",[],function(){function e(e){this.decay=e||.5,this.oldValue=null}return e.prototype.clear=function(){this.oldValue=null},e.prototype.push=function(e){if(!this.oldValue)return this.oldValue=e,e;var t=this.oldValue+this.decay*(e-this.oldValue);return this.oldValue=t,t},e}),n("src/kinematics/Rounding",[],function(){var e={max:1,min:2,mean:3,median:4},t=function(n,r,i){var s=n>r,o=null;switch(i){case e.max:s?o=n:o=r;break;case e.min:s?o=r:o=n;break;default:o=t(n,r,e.max)}return o};return{strategies:e,helpers:{reduction:t}}}),n("src/kinematics/RunningStat",[],function(){function e(){this.m_n=0,this.m_oldM=0,this.m_newM=0,this.m_oldS=0,this.m_newS=0}return e.prototype.clear=function(){this.m_n=0},e.prototype.push=function(e){this.m_n++,this.m_n===1?(this.m_oldM=this.m_newM=e,this.m_oldS=0):(this.m_newM=this.m_oldM+(e-this.m_oldM)/this.m_n,this.m_newS=this.m_oldS+(e-this.m_oldM)*(e-this.m_newM),this.m_oldM=this.m_newM,this.m_oldS=this.m_newS)},e.prototype.numDataValues=function(){return this.m_n},e.prototype.mean=function(){return this.m_n>0?this.m_newM:0},e.prototype.variance=function(){return this.m_n>1?this.m_newS/(this.m_n-1):0},e.prototype.standardDeviation=function(){return Math.sqrt(this.variance())},e}),n("src/kinematics/RunningSpeedStat",["src/kinematics/RunningStat","src/kinematics/PastAndPresent"],function(e,t){function n(){this.pnp=new t,this.runningStat=new e}return n.prototype.push=function(e){var t=this.pnp.push(e,this.pnp.getDistance,this);return this.runningStat.push(t),t},n.prototype.getMetric=function(){return this.runningStat.variance()},n.prototype.clear=function(){this.pnp.clear(),this.runningStat.clear()},n}),n("src/kinematics/RunningAccelerationStat",["src/kinematics/RunningStat","src/kinematics/RunningSpeedStat","src/kinematics/PastAndPresent"],function(e,t,n){function r(){this.runningStat=new e,this.speedStat=new t,this.previousVelocity=0}return r.prototype.push=function(e){var t=this.speedStat.push(e),n=t-this.previousVelocity;this.runningStat.push(n)},r.prototype.getMetric=function(){return this.runningStat.mean()},r.prototype.clear=function(){this.speedStat.clear(),this.runningStat.clear(),this.previousVelocity=0},r}),n("src/kinematics/RunningArrayStat",["src/kinematics/RunningStat","src/kinematics/Rounding"],function(e,t){function n(n,r){this.roundingStrategy=r||t.strategies.max,this.rstats=[];var i;for(i=0;i<n;i++)this.rstats.push(new e)}return n.prototype.push=function(e){this.rstats.forEach(function(t,n,r){var i=e[n];i&&t.push(i)})},n.prototype.mean=function(){var e=this;return this.rstats.reduce(function(n,r,i,s){return t.helpers.reduction(n,r.mean(),e.roundingStrategy)},0)},n.prototype.variance=function(){var e=this;return this.rstats.reduce(function(n,r,i,s){return t.helpers.reduction(n,r.variance(),e.roundingStrategy)},0)},n.prototype.standardDeviation=function(){var e=this;return this.rstats.reduce(function(n,r,i,s){return t.helpers.reduction(n,r.standardDeviation(),e.roundingStrategy)},0)},n.prototype.clear=function(){this.rstats.forEach(function(e){e.clear()})},n}),n("src/kinematics/RunningFreenessStat",["src/kinematics/RunningArrayStat","src/kinematics/Rounding","src/util/Vector"],function(e,t,n){function r(t){this.jointPairs=t||[],this.rstat=new e(this.jointPairs.length),this.vecA=[0,0,0],this.vecB=[0,0,0]}return r.prototype.push=function(e){var t=this,r=this.jointPairs.map(function(r){var i={};i.id=r[0],i.data=e[i.id];var s={};s.id=r[1],s.data=e[s.id];var o=null;return i.data&&s.data&&(t.vecA=i.data.position,t.vecB=s.data.position,o=n.angleBetween(t.vecA,t.vecB)),o});return t.rstat.push(r),this.getValue()},r.prototype.getValue=function(){return this.rstat.variance()},r.prototype.clear=function(){this.rstat.clear()},r}),n("src/kinematics/NumericalDifferentiator",[],function(){function e(){this.x=0,this.y=0}function t(t){var n=new e;return n.x=Math.cos(t),n.y=Math.sin(t),n}function n(t){var n=new e;return n.x=t,n.y=Math.cos(1/(t*t)),n}function r(t,n,r){var i=new e;return i.x=n,i.y=-(t(n).y-t(n+r).y)/r,i}function i(e,t){var n=function(n){return r(e,n,t)};return n}function s(t,n,r){var i=new e;return i.x=n,i.y=t(n-r).y*r,i}function o(e,t){var n=0,r=1e3,i=function(i){i<r?n=0:t=i-r;var o=s(e,i,t);return n+=o.y,o.y=n,r=i,o};return i}function u(t){var n=new e;return n.x=t,n.y=t*t,n}return{point:e,differentiate:i,integrate:o}}),n("src/kinematics/RunningImpactStat",["src/kinematics/RunningStat","src/kinematics/NumericalDifferentiator","src/kinematics/PastAndPresent"],function(e,t,n){function r(e,n){var r=new t.point;return r.x=e,r.y=e/n,r}function i(e,n){var r=new t.point;return r.x=v,r.y=v/n,r}function s(){this.runningStat=new e,this.pnp=new n}return s.prototype.push=function(e){this.pnp.push(e,this.pnpCallback,this)},s.prototype.pnpCallback=function(e,t){var n=this.pnp.getDistance(),r=0;this.runningStat.push(r)},s.prototype.clear=function(){this.pnp.clear(),this.runningStat.clear()},s}),n("src/kinematics/RunningLineStraightnessStat",["src/kinematics/PastAndPresent","src/util/Vector"],function(e,t){function n(){this.cumulativeActualDistance=0,this.startCoords=null,this.pnp=new e}return n.prototype.push=function(e){this.pnp.push(e,this.pnpCallback,this)},n.prototype.pnpCallback=function(e,n){if(this.startCoords){var r=this.pnp.getDistance(e,n);this.cumulativeActualDistance+=r}else this.startCoords=t.dup(n)},n.prototype.delta=function(){var e=0;if(this.startCoords){var t=this.pnp.getDistanceFromLatest(this.startCoords);e=Math.abs(t-this.cumulativeActualDistance)}return e},n.prototype.clear=function(){this.cumulativeActualDistance=0,this.startCoords=null,this.pnp.clear()},n}),n("src/kinematics/RunningSteadinessStat",["src/kinematics/PastAndPresent","src/kinematics/RollingAverage"],function(e,t){function n(){this.pnp=new e,this.avg=new t(.9)}return n.prototype.push=function(e){var t=this.pnp.push(e,this.pnp.getDistance,this),n=this.avg.push(t);return n},n.prototype.clear=function(){this.pnp.clear(),this.avg.clear()},n}),n("runningkinematics",["require","src/kinematics/PastAndPresent","src/kinematics/RollingAverage","src/kinematics/Rounding","src/kinematics/RunningAccelerationStat","src/kinematics/RunningArrayStat","src/kinematics/RunningFreenessStat","src/kinematics/RunningImpactStat","src/kinematics/RunningLineStraightnessStat","src/kinematics/RunningSpeedStat","src/kinematics/RunningStat","src/kinematics/RunningSteadinessStat"],function(e){return{PastAndPresent:e("src/kinematics/PastAndPresent"),RollingAverage:e("src/kinematics/RollingAverage"),Rounding:e("src/kinematics/Rounding"),RunningAccelerationStat:e("src/kinematics/RunningAccelerationStat"),RunningArrayStat:e("src/kinematics/RunningArrayStat"),RunningFreenessStat:e("src/kinematics/RunningFreenessStat"),RunningImpactStat:e("src/kinematics/RunningImpactStat"),RunningLineStraightnessStat:e("src/kinematics/RunningLineStraightnessStat"),RunningSpeedStat:e("src/kinematics/RunningSpeedStat"),RunningStat:e("src/kinematics/RunningStat"),RunningSteadinessStat:e("src/kinematics/RunningSteadinessStat")}}),t("runningkinematics")});