(this["webpackJsonpsuggest-subreddit"]=this["webpackJsonpsuggest-subreddit"]||[]).push([[0],[,,,,,function(e,t,n){e.exports={suggestion:"Suggestion_suggestion__V8twn",contentContainer:"Suggestion_contentContainer__1L6gZ",details:"Suggestion_details__25987",content:"Suggestion_content__2M1JU",title:"Suggestion_title__3GZHo",score:"Suggestion_score__2df-3",description:"Suggestion_description__a4vvc",controls:"Suggestion_controls__2yJhl",excludeButton:"Suggestion_excludeButton__pbK15"}},function(e,t,n){e.exports={description:"SuggestionPage_description__2pdr4",container:"SuggestionPage_container__dAmph",title:"SuggestionPage_title__1dTlJ",logoutLink:"SuggestionPage_logoutLink__1ZCkD",loadingContainer:"SuggestionPage_loadingContainer__24sJP"}},,function(e,t,n){e.exports={loginPage:"LoginPage_loginPage__3bRAY",loginContainer:"LoginPage_loginContainer__2S3VI",title:"LoginPage_title__1EvV2",disclaimer:"LoginPage_disclaimer__1K1lE",example:"LoginPage_example__2fagL"}},,,,function(e,t,n){e.exports={footer:"Footer_footer__1G6Wy"}},function(e,t,n){e.exports={link:"Link_link__v1uWG"}},,,,,,function(e,t,n){e.exports={callToAction:"CallToAction_callToAction__1lKlF"}},function(e,t,n){e.exports={suggestion:"Suggestions_suggestion__z2rEA"}},function(e,t,n){e.exports={layout:"Layout_layout__3CwMv"}},function(e){e.exports=JSON.parse('{"nottheonion":{"score":6,"contributors":{"bestof":1,"history":1,"fitness":1,"askscience":1,"netflix":1,"announcements":1}},"reactiongifs":{"score":5,"contributors":{"bestof":1,"netflix":1,"announcements":1,"youtubehaiku":1,"accidentalrenaissance":1}},"news":{"score":4,"contributors":{"worldnews":1,"bestof":1,"history":1,"fitness":1}},"UpliftingNews":{"score":4,"contributors":{"worldnews":1,"history":1,"askscience":1,"announcements":1}},"MovieDetails":{"score":4,"contributors":{"movies":1,"netflix":1,"youtubehaiku":1,"accidentalrenaissance":1}},"SubredditDrama":{"score":4,"contributors":{"bestof":1,"truereddit":1,"announcements":1,"youtubehaiku":1}},"OutOfTheLoop":{"score":4,"contributors":{"bestof":1,"netflix":1,"announcements":1,"truegaming":1}},"IAmA":{"score":4,"contributors":{"bestof":1,"history":1,"askscience":1,"announcements":1}},"todayilearned":{"score":4,"contributors":{"bestof":1,"history":1,"fitness":1,"science":1}},"JusticeServed":{"score":4,"contributors":{"bestof":1,"netflix":1,"accidentalrenaissance":1,"cozyplaces":1}},"EverythingScience":{"score":4,"contributors":{"tech":1,"foodforthought":1,"gamernews":1,"science":1}},"space":{"score":4,"contributors":{"history":1,"askscience":1,"announcements":1,"futurology":1}},"HistoryMemes":{"score":4,"contributors":{"history":1,"mountandblade":1,"crusaderkings":1,"youtubehaiku":1}},"therewasanattempt":{"score":4,"contributors":{"programmerhumor":1,"accidentalrenaissance":1,"cozyplaces":1,"evilbuildings":1}},"business":{"score":3,"contributors":{"worldnews":1,"tech":1,"truereddit":1}},"Economics":{"score":3,"contributors":{"worldnews":1,"truereddit":1,"foodforthought":1}},"gadgets":{"score":3,"contributors":{"technology":1,"history":1,"askscience":1}},"technews":{"score":3,"contributors":{"technology":1,"tech":1,"gamernews":1}}}')},function(e,t,n){e.exports={loading:"Loading_loading__2yynj"}},function(e,t,n){e.exports=n(31)},,,,,function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(16),c=n.n(o),i=(n(29),n(2)),s=n(1),u=n.n(s),l=n(10),d=n(14),f=n(17),m=n(18),g=n(3),b={REDDIT_CLIENT_ID:"ubcs049_cdvODQ",REDDIT_REDIRECT_URI:"https://nikas.praninskas.com/suggest-subreddit/"};function p(e){return Object.entries(e).map((function(e){var t=Object(i.a)(e,2),n=t[0],r=t[1];return"".concat(n,"=").concat(window.encodeURIComponent(r))})).join("&")}function v(e,t){return Object.keys(t).length?"".concat(e,"?").concat(p(t)):e}function h(){return(h=Object(g.a)(u.a.mark((function e(t){var n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://www.reddit.com/api/v1/access_token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Basic ".concat(btoa("".concat(b.REDDIT_CLIENT_ID,":")))},body:p({grant_type:"authorization_code",code:t,redirect_uri:b.REDDIT_REDIRECT_URI})});case 2:if((n=e.sent).ok){e.next=9;break}return e.t0=Error,e.next=7,n.text();case 7:throw e.t1=e.sent,new e.t0(e.t1);case 9:return e.next=11,n.json();case 11:if(!(r=e.sent).error){e.next=14;break}throw new Error(r.error);case 14:return e.abrupt("return",Object(d.a)({},r,{expires_at:Date.now()+1e3*r.expires_in}));case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var E=function(){function e(t){Object(f.a)(this,e),this.token=t}return Object(m.a)(e,[{key:"iterateAndCollectListing",value:function(){var e=Object(g.a)(u.a.mark((function e(t,n){var r,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(v(t,Object(d.a)({limit:100},n?{after:n}:{})),{headers:{Authorization:"bearer ".concat(this.token.access_token)}});case 2:if((r=e.sent).ok){e.next=9;break}return e.t0=Error,e.next=7,r.text();case 7:throw e.t1=e.sent,new e.t0(e.t1);case 9:return e.next=11,r.json();case 11:if(a=e.sent,e.t2=[],e.t3=Object(l.a)(a.data.children),e.t4=l.a,!a.data.after){e.next=21;break}return e.next=18,this.iterateAndCollectListing(t,a.data.after);case 18:e.t5=e.sent,e.next=22;break;case 21:e.t5=[];case 22:return e.t6=e.t5,e.t7=(0,e.t4)(e.t6),e.abrupt("return",e.t2.concat.call(e.t2,e.t3,e.t7));case 25:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"fetchSubscribedSubreddits",value:function(){var e=Object(g.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.iterateAndCollectListing("https://oauth.reddit.com/subreddits/mine/subscriber"));case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}();function _(){window.location.href=v("https://www.reddit.com/api/v1/authorize",{client_id:b.REDDIT_CLIENT_ID,response_type:"code",state:"4",redirect_uri:b.REDDIT_REDIRECT_URI,duration:"temporary",scope:"mysubreddits"})}function y(){localStorage.removeItem("redditApiToken")}var w=a.a.createContext({redditApi:void 0,login:_,logout:y});function O(e){var t=e.children,n=Object(r.useState)(),o=Object(i.a)(n,2),c=o[0],s=o[1];return Object(r.useEffect)((function(){var e=function(){var e=localStorage.getItem("redditApiToken");if(e){var t=JSON.parse(e);if(t.expires_at&&!(t.expires_at<Date.now()-6e5))return t;y()}}();if(e)s(new E(e));else{var t=window.location.search.match(/code=([^&]+)/)||[],n=Object(i.a)(t,2)[1];n&&(window.history.replaceState(null,"",window.location.pathname),function(e){return h.apply(this,arguments)}(n).then((function(e){!function(e){var t=JSON.stringify(e);localStorage.setItem("redditApiToken",t)}(e),s(new E(e))})))}}),[]),a.a.createElement(w.Provider,{value:{redditApi:c,login:_,logout:function(){y(),s(void 0)}}},t)}function k(){return Object(r.useContext)(w)}var x=n(8),j=n.n(x),S=n(7),N=n(4),L=n.n(N),C=n(19),R=n.n(C);function T(e){var t=e.className,n=Object(S.a)(e,["className"]);return a.a.createElement("button",Object.assign({className:L()(R.a.callToAction,t)},n))}var I=n(20),D=n.n(I),P=n(5),A=n.n(P);function M(e){var t=e.children;return a.a.createElement(a.a.Fragment,null,t.reduce((function(e,n,r){return 0===r?[n]:[].concat(Object(l.a)(e),[r===t.length-1?" and ":", ",n])}),[]))}function J(){return(J=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function B(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var U=a.a.createElement("line",{x1:5,y1:5,x2:95,y2:95,strokeLinecap:"round"}),z=a.a.createElement("line",{x1:5,y1:95,x2:95,y2:5,strokeLinecap:"round"}),F=function(e){var t=e.svgRef,n=e.title,r=B(e,["svgRef","title"]);return a.a.createElement("svg",J({width:100,height:100,viewBox:"0 0 100 100",stroke:"#000",strokeWidth:"8px",ref:t},r),n?a.a.createElement("title",null,n):null,U,z)},K=a.a.forwardRef((function(e,t){return a.a.createElement(F,J({svgRef:t},e))}));n.p;function W(e){var t=e.subreddit,n=Object(S.a)(e,["subreddit"]);return a.a.createElement("a",Object.assign({href:"https://www.reddit.com/r/".concat(t),target:"_blank",rel:"noopener noreferrer"},n),"/r/",t)}function G(e){var t=e.className,n=e.subreddit,r=e.score,o=e.contributors;return a.a.createElement("div",{className:L()(A.a.suggestion,t)},a.a.createElement("div",{className:A.a.contentContainer},a.a.createElement("div",{className:A.a.content},a.a.createElement(W,{subreddit:n,className:A.a.title}),a.a.createElement("div",{className:A.a.description},"Similar to ",a.a.createElement("strong",null,Math.round(100*Number(r.toFixed(2))),"%")," of your subreddits")),a.a.createElement("div",{className:A.a.controls},a.a.createElement("button",{type:"button",className:A.a.excludeButton,title:"Exclude subreddit"},a.a.createElement(K,null)))),a.a.createElement("div",{className:A.a.details},"Because you subscribe to"," ",a.a.createElement(M,null,Object.keys(o).map((function(e){return a.a.createElement(W,{subreddit:e,key:e})})))))}function H(e){var t=e.className,n=e.data,r=e.totalSubreddits;return a.a.createElement("div",{className:t},Object.entries(n).map((function(e){var t=Object(i.a)(e,2),n=t[0],o=t[1];return a.a.createElement(G,{key:n,subreddit:n,score:o.score/r,contributors:o.contributors,className:D.a.suggestion})})))}var V=n(21),Z=n.n(V);function q(e){var t=e.className,n=e.children;return a.a.createElement("div",{className:L()(Z.a.layout,t)},n)}var Q=n(22),X=n(12),Y=n.n(X),$=n(13),ee=n.n($);function te(e){var t=e.className,n=e.element,r=void 0===n?"a":n,o=Object(S.a)(e,["className","element"]);return"a"===r?a.a.createElement("a",Object.assign({className:L()(ee.a.link,t),rel:"noopener noreferrer",target:"blank"},o)):a.a.createElement("button",Object.assign({className:L()(ee.a.link,t)},o))}function ne(){return a.a.createElement("footer",{className:Y.a.footer},a.a.createElement(te,{href:"https://github.com/nikaspran/suggest-subreddit"},"GitHub"),a.a.createElement(te,{href:"https://twitter.com/nikaspran",className:Y.a.twitterLink},"@nikaspran"))}function re(){return a.a.createElement("div",{style:{flex:"1 1 auto"}})}function ae(){var e=k().login;return a.a.createElement(q,{className:j.a.loginPage},a.a.createElement("div",{className:j.a.loginContainer},a.a.createElement(re,null),a.a.createElement("h1",{className:j.a.title},"Suggest me a subreddit"),a.a.createElement(T,{type:"button",onClick:e},"Fetch my subreddits via Reddit"),a.a.createElement("p",{className:j.a.disclaimer},"All data stays in your browser only"),a.a.createElement(re,null),a.a.createElement(ne,null)),a.a.createElement("div",{className:j.a.example},a.a.createElement(H,{data:Q,totalSubreddits:34})))}var oe,ce=n(6),ie=n.n(ce),se=function(){var e;function t(){return n.apply(this,arguments)}function n(){return(n=Object(g.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){var n=new XMLHttpRequest;n.addEventListener("load",(function(){e(JSON.parse(this.responseText))}));try{console.log("".concat(self.location.origin).concat("/suggest-subreddit","/similarSubreddits.json")),n.open("GET","".concat(self.location.origin).concat("/suggest-subreddit","/similarSubreddits.json")),n.send()}catch(r){t(r)}})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function r(e){return a.apply(this,arguments)}function a(){return(a=Object(g.a)(u.a.mark((function n(r){var a,o,c,s,l,d,f;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=r.sourceSubreddits,o=r.count,c=void 0===o?10:o,e=e||t(),n.next=4,e;case 4:return s=n.sent,l=new Set(a.map((function(e){return e.toLowerCase()}))),d={},a.forEach((function(e){var t=s[e]||[];Object.entries(t).forEach((function(t){var n=Object(i.a)(t,2),r=n[0],a=n[1];l.has(r.toLowerCase())||(d[r]=d[r]||{score:0,contributors:{}},d[r].score+=a,d[r].contributors[e]=a)}))})),f=Object.entries(d).sort((function(e,t){var n=Object(i.a)(e,2)[1];return Object(i.a)(t,2)[1].score-n.score})).slice(0,c),n.abrupt("return",Object.fromEntries(f));case 10:case"end":return n.stop()}}),n)})))).apply(this,arguments)}self.addEventListener("message",function(){var e=Object(g.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.data,e.t0=postMessage,e.t1=t.data.invocationKey,e.next=5,r(n);case 5:e.t2=e.sent,e.t3={invocationKey:e.t1,result:e.t2},e.t4=void 0,(0,e.t0)(e.t3,e.t4);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())};function ue(){var e=se.toString(),t=new Blob(["(".concat(e,")()")]);return new Worker(URL.createObjectURL(t))}function le(){return(le=Object(g.a)(u.a.mark((function e(t){var n,r,a,o=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.length>1&&void 0!==o[1]?o[1]:{},r=n.count,a=void 0===r?10:r,e.abrupt("return",new Promise((function(e,n){oe=oe||ue();var r="invocation_".concat(Math.random());oe.postMessage({invocationKey:r,sourceSubreddits:t,count:a});var o=setTimeout((function(){oe.removeEventListener("message",c),n(new Error("TIMEOUT: could not calculate similar subreddits in ".concat(10," seconds")))}),1e4);function c(t){var n=t.data;n.invocationKey===r&&(oe.removeEventListener("message",c),clearTimeout(o),e(n.result))}oe.addEventListener("message",c)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var de=n(23),fe=n.n(de);function me(){return(me=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function ge(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var be=a.a.createElement("g",{fill:"none",fillRule:"evenodd"},a.a.createElement("g",{transform:"translate(1 1)",strokeWidth:2},a.a.createElement("circle",{strokeOpacity:.5,cx:18,cy:18,r:18}),a.a.createElement("path",{d:"M36 18c0-9.94-8.06-18-18-18"},a.a.createElement("animateTransform",{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"1s",repeatCount:"indefinite"})))),pe=function(e){var t=e.svgRef,n=e.title,r=ge(e,["svgRef","title"]);return a.a.createElement("svg",me({width:38,height:38,viewBox:"0 0 38 38",stroke:"#fff",ref:t},r),n?a.a.createElement("title",null,n):null,be)},ve=a.a.forwardRef((function(e,t){return a.a.createElement(pe,me({svgRef:t},e))}));n.p;function he(){return a.a.createElement(ve,{className:fe.a.loading})}function Ee(){var e=k(),t=e.redditApi,n=e.logout,o=Object(r.useState)(),c=Object(i.a)(o,2),s=c[0],u=c[1],l=Object(r.useState)(),d=Object(i.a)(l,2),f=d[0],m=d[1],g=Object(r.useState)(void 0),b=Object(i.a)(g,2),p=b[0],v=b[1];return Object(r.useEffect)((function(){t&&(v("Fetching your subreddits (1/2)..."),t.fetchSubscribedSubreddits().then((function(e){return m(e),v("Calculating similar subreddits (2/2)..."),function(e){return le.apply(this,arguments)}(e.map((function(e){return e.data.display_name.toLowerCase()})))})).then(u).then((function(){v(void 0)})))}),[t]),a.a.createElement(q,{className:ie.a.container},s?a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:ie.a.description},a.a.createElement(re,null),a.a.createElement("h1",{className:ie.a.title},"Suggest me a subreddit"),a.a.createElement(te,{element:"button",onClick:n,className:ie.a.logoutLink},"Logout"),a.a.createElement(re,null),a.a.createElement(ne,null)),a.a.createElement(H,{data:s,className:ie.a.suggestions,totalSubreddits:(null===f||void 0===f?void 0:f.length)||0})):a.a.createElement("div",{className:ie.a.loadingContainer},a.a.createElement("div",null,p),a.a.createElement(he,null)))}function _e(){return k().redditApi?a.a.createElement(Ee,null):a.a.createElement(ae,null)}var ye=function(){return a.a.createElement(O,null,a.a.createElement(_e,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(ye,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[24,1,2]]]);
//# sourceMappingURL=main.f2ca172a.chunk.js.map