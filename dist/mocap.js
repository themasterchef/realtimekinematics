//Copyright 2012, etc.

/**
 * almond 0.1.2 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

(function(e,t){typeof define=="function"&&define.amd?define(["js-signals","underscore","socketio","zig"],t):e.mocap=t(e.Signal,e._,e.io,e.zig)})(this,function(e,t,n,r){var i,s,o;return function(e){function c(e,t){var n=t&&t.split("/"),i=r.map,s=i&&i["*"]||{},o,u,a,f,l,c,h,p,d,v;if(e&&e.charAt(0)==="."&&t){n=n.slice(0,n.length-1),e=n.concat(e.split("/"));for(p=0;v=e[p];p++)if(v===".")e.splice(p,1),p-=1;else if(v===".."){if(p===1&&(e[2]===".."||e[0]===".."))return!0;p>0&&(e.splice(p-1,2),p-=2)}e=e.join("/")}if((n||s)&&i){o=e.split("/");for(p=o.length;p>0;p-=1){u=o.slice(0,p).join("/");if(n)for(d=n.length;d>0;d-=1){a=i[n.slice(0,d).join("/")];if(a){a=a[u];if(a){f=a,l=p;break}}}if(f)break;!c&&s&&s[u]&&(c=s[u],h=p)}!f&&c&&(f=c,l=h),f&&(o.splice(0,l,f),e=o.join("/"))}return e}function h(t,n){return function(){return l.apply(e,a.call(arguments,0).concat([t,n]))}}function p(e){return function(t){return c(t,e)}}function d(e){return function(n){t[e]=n}}function v(r){if(n.hasOwnProperty(r)){var i=n[r];delete n[r],u[r]=!0,f.apply(e,i)}if(!t.hasOwnProperty(r))throw new Error("No "+r);return t[r]}function m(e,t){var n,r,i=e.indexOf("!");return i!==-1?(n=c(e.slice(0,i),t),e=e.slice(i+1),r=v(n),r&&r.normalize?e=r.normalize(e,p(t)):e=c(e,t)):e=c(e,t),{f:n?n+"!"+e:e,n:e,p:r}}function g(e){return function(){return r&&r.config&&r.config[e]||{}}}var t={},n={},r={},u={},a=[].slice,f,l;f=function(r,i,s,o){var a=[],f,l,c,p,y,b;o=o||r;if(typeof s=="function"){i=!i.length&&s.length?["require","exports","module"]:i;for(b=0;b<i.length;b++){y=m(i[b],o),c=y.f;if(c==="require")a[b]=h(r);else if(c==="exports")a[b]=t[r]={},f=!0;else if(c==="module")l=a[b]={id:r,uri:"",exports:t[r],config:g(r)};else if(t.hasOwnProperty(c)||n.hasOwnProperty(c))a[b]=v(c);else if(y.p)y.p.load(y.n,h(o,!0),d(c),{}),a[b]=t[c];else if(!u[c])throw new Error(r+" missing "+c)}p=s.apply(t[r],a);if(r)if(l&&l.exports!==e&&l.exports!==t[r])t[r]=l.exports;else if(p!==e||!f)t[r]=p}else r&&(t[r]=s)},i=s=l=function(t,n,i,s){return typeof t=="string"?v(m(t,n).f):(t.splice||(r=t,n.splice?(t=n,n=i,i=null):t=e),n=n||function(){},s?f(e,t,n,i):setTimeout(function(){f(e,t,n,i)},15),l)},l.config=function(e){return r=e,l},o=function(e,t,r){t.splice||(r=t,t=[]),n[e]=[e,t,r]},o.amd={jQuery:!0}}(),o("../tools/almond",function(){}),o("mocap/datasource/Broadcaster",["js-signals","underscore"],function(e,t){function n(){this.vent={skeleton:new e,rawData:new e}}return n.prototype.broadcastUser=function(e){this.vent.rawData.dispatch(e),this.vent.skeleton.dispatch(e.skeleton)},n}),o("mocap/datasource/DataRecorder",["underscore"],function(e){function t(e){var t=e||{};this.maxRecordingTime=t.maxRecordingTime||null,this.history=[],this.isRecording=!1}return t.prototype.getHistory=function(){return e.clone(this.history)},t.prototype.start=function(){this.isRecording=!0;if(this.maxRecordingTime){var e=this;setTimeout(e.stop,e.maxRecordingTime)}},t.prototype.stop=function(){this.isRecording=!1},t.prototype.clear=function(){this.history=[]},t.prototype.update=function(e){this.isRecording&&this.history.push(e)},t}),o("mocap/datasource/JointExtractor",[],function(){var e=function(e,t){var n=t[e];return n?{position:n.position,rotation:n.rotation}:null};return{extract:e}}),o("mocap/datasource/Joints",[],function(){return{Head:1,LeftAnkle:19,LeftCollar:5,LeftElbow:7,LeftFingertip:10,LeftFoot:20,LeftHand:9,LeftHip:17,LeftKnee:18,LeftShoulder:6,LeftWrist:8,Neck:2,RightAnkle:23,RightCollar:11,RightElbow:13,RightFingertip:16,RightFoot:24,RightHand:15,RightHip:21,RightKnee:22,RightShoulder:12,RightWrist:14,Torso:3,Waist:4}}),o("mocap/datasource/JointGroups",["mocap/datasource/Joints"],function(e){return{Head:1,LeftAnkle:19,LeftCollar:5,LeftElbow:7,LeftFingertip:10,LeftFoot:20,LeftHand:[[e.LeftShoulder,e.LeftElbow],[e.LeftElbow,e.LeftWrist],[e.LeftWrist,e.LeftHand]],LeftHip:17,LeftKnee:18,LeftShoulder:6,LeftWrist:8,Neck:2,RightAnkle:23,RightCollar:11,RightElbow:13,RightFingertip:16,RightFoot:24,RightHand:[[e.RightShoulder,e.RightElbow],[e.RightElbow,e.RightWrist],[e.RightWrist,e.RightHand]],RightHip:21,RightKnee:22,RightShoulder:12,RightWrist:14,Torso:3,Waist:4}}),o("mocap/datasource/JointUpdater",["underscore","js-signals","mocap/datasource/JointExtractor"],function(e,t,n){function r(n,r,i){var s=i||{};this.jointId=n,this.vent={joint:new t};var o=this;r&&(s.rateLimit?r.vent.skeleton.add(e.throttle(o.update,i.rateLimit),this):r.vent.skeleton.add(this.update,this))}return r.prototype.update=function(e){var t=n.extract(this.jointId,e);t&&this.vent.joint.dispatch(t)},r}),o("mocap/datasource/NetworkDataSource",["socketio"],function(e){function t(t,n,r){this.socketInstance=e.connect(r||"http://localhost:3000"),this.outputBcaster=n,t.vent.rawData.add(this.sendMessage,this)}return t.prototype.start=function(){var e=this;this.socketInstance.on("response",function(t){e.outputBcaster.broadcastUser(t)})},t.prototype.stop=function(){this.socketInstance.off("response")},t.prototype.sendMessage=function(e){this.socketInstance.emit("request",e)},t.prototype.sendCalibrationData=function(e){console.log("calibrating"),this.socketInstance.emit("calibrate",e)},t.prototype.joinRoom=function(e){console.log("Joining room"),this.socketInstance.emit("subscribe",e)},t.prototype.close=function(){this.socketInstance.off("response",this.ondata),this.socketInstance.leave()},t}),o("mocap/datasource/ZigDataSource",["zig","mocap/datasource/Joints"],function(e,t){function i(t,n){this.broadcaster=t;var i=this;e.addEventListener("userfound",function(e){e.addEventListener("userupdate",function(e){i.broadcaster.broadcastUser(r(e))})}),n&&n.domElement?e.init(n.domElement):e.embed()}var n=e.findZigObject(),r=function(e){var t;for(t=1;t<=24;t++){var n=e.skeleton[t];if(n){var r=n.position;r[0]/=10,r[1]/=10,r[2]=-r[2]/10}}return e};return i.prototype.initWebcamStream=function(e){var t=e.getContext("2d");e.width=n.imageMapResolution.width,e.height=n.imageMapResolution.height,n.requestStreams({updateImage:!0}),n.addEventListener("NewFrame",function(){var e=new Image;e.src="data:image/png;base64,"+n.imageMap,e.onload=function(){t.drawImage(e,0,0)}})},i.prototype.close=function(){e.removeEventListener("userfound"),e.removeEventListener("loaded")},i}),o("mocap",["require","mocap/datasource/Broadcaster","mocap/datasource/DataRecorder","mocap/datasource/JointExtractor","mocap/datasource/JointGroups","mocap/datasource/Joints","mocap/datasource/JointUpdater","mocap/datasource/NetworkDataSource","mocap/datasource/ZigDataSource"],function(e){return{Broadcaster:e("mocap/datasource/Broadcaster"),DataRecorder:e("mocap/datasource/DataRecorder"),JointExtractor:e("mocap/datasource/JointExtractor"),JointGroups:e("mocap/datasource/JointGroups"),Joints:e("mocap/datasource/Joints"),JointUpdater:e("mocap/datasource/JointUpdater"),NetworkDataSource:e("mocap/datasource/NetworkDataSource"),ZigDataSource:e("mocap/datasource/ZigDataSource")}}),o("js-signals",function(){return e}),o("underscore",function(){return t}),o("socketio",function(){return n}),o("zig",function(){return r}),s("mocap")});