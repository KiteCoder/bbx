(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{114:function(e,t,n){n(115),e.exports=n(145)},115:function(e,t){"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/bbx/expo-service-worker.js",{scope:"/bbx/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}))},145:function(e,t,n){"use strict";n.r(t);var r=n(157),a=n(80),c=n.n(a),o=n(38),i=n.n(o),l=n(1),u=n.n(l),s=n(4),m=n(17),d=n(43),f=n(3),h=n(112),b=n(156),p=2.3,v=4.3,g=n(83),E=n.n(g);var x=s.a.create({slider:{flex:1,padding:20,justifyContent:"center",backgroundColor:"#ecf0f1"},buttonContainer:{flexDirection:"row",alignItems:"stretch",marginTop:15},button:{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#eee",padding:10},middleButton:{borderLeftWidth:1,borderRightWidth:1,borderColor:"#ccc"},sensor:{marginTop:45,paddingHorizontal:10},text:{textAlign:"center"},balanceContainer:{backgroundColor:"#00872F"},offContainer:{backgroundColor:"#820003"}});Object(r.a)((function(){Object(h.a)();var e=Object(l.useState)(!1),t=i()(e,2),n=t[0],r=t[1],a=Object(l.useState)(0),o=i()(a,2),s=o[0],g=o[1],y=Object(l.useState)(!1),C=i()(y,2),T=(C[0],C[1],Object(l.useState)([])),j=i()(T,2),k=j[0],w=j[1],O=Object(l.useState)(p),S=i()(O,2),I=S[0],V=S[1],P=Object(l.useState)(v),R=i()(P,2),W=R[0],D=R[1],L=Object(l.useRef)(I),M=Object(l.useRef)(W),q=Object(l.useRef)(),B=Object(l.useRef)(s),F=null;Object(l.useEffect)((function(){var e=null;return q.current?e=setInterval((function(){var e=Math.round(10*s+1)/10;g((function(t){return e})),B.current=e}),100):q.current||0===s||clearInterval(e),function(){return clearInterval(e)}}),[q.current,s]);var J=function(e){var t=!0;e.x>L.current||e.x<-1*L.current||e.y>M.current||e.y<-1*M.current?(t=!1,q.current&&w((function(e){return[].concat(c()(e),[B.current])})),g(0),q.current=!1):q.current=!0,r(t)},z=function(){"function"===typeof window.DeviceMotionEvent.requestPermission&&window.DeviceMotionEvent.requestPermission().then((function(e){})).catch(console.error),F=b.a.addListener((function(e){J(e)}))},A=function(){F&&F.remove(),F=null};return u.a.createElement(f.a,null,u.a.createElement(f.a,{style:n?x.balanceContainer:x.offContainer},u.a.createElement(m.a,{style:x.text},"Instructions:"),u.a.createElement(m.a,{style:x.text},"Press start, and allow the app to use gyroscope data."),u.a.createElement(m.a,{style:x.text},"Place phone face up in the center of your board."),u.a.createElement(m.a,{style:x.text},"The background color will change if you are properly balanced, and the timer will start."),u.a.createElement("div",{className:"time"},s,"s"),u.a.createElement(f.a,{style:x.buttonContainer},u.a.createElement(d.a,{onPress:function(){F?(A(),q.current=!1):(z(),q.current=!0)},style:x.button},u.a.createElement(m.a,null,"Start")))),u.a.createElement(m.a,null,"These sliders can adjust the thresholds for pitch detection. The higher you go, The less sensitive the app will be to fall detection."),u.a.createElement(m.a,null,"X Threshold (Side to side pitch)"),u.a.createElement(m.a,null,I),u.a.createElement(E.a,{style:x.slider,maximumValue:10,minimumValue:0,minimumTrackTintColor:"#307ecc",maximumTrackTintColor:"#307ecc",step:.1,name:"xThreshold",value:p,onValueChange:function(e){V(e),L.current=e}}),u.a.createElement(m.a,null,"Y Threshold (Back and forward pitch)"),u.a.createElement(m.a,null,W),u.a.createElement(E.a,{style:x.slider,maximumValue:10,minimumValue:0,minimumTrackTintColor:"#307ecc",maximumTrackTintColor:"#307ecc",step:.1,name:"yThreshold",value:v,onValueChange:function(e){D(e),M.current=e}}),k.map((function(e){return u.a.createElement(m.a,{style:x.text},"time: ",e)})))}))}},[[114,1,2]]]);
//# sourceMappingURL=app.41b85ca4.chunk.js.map