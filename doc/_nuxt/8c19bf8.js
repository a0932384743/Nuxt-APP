(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{851:function(t,e,n){"use strict";n.r(e);n(85),n(27),n(134),n(138),n(23),n(69),n(28),n(18),n(98),n(100);var r=n(816),o=n(16),c=function(){return c=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},c.apply(this,arguments)},l=function(t,e,n,r){return new(n||(n=Promise))((function(o,c){function l(t){try{f(r.next(t))}catch(t){c(t)}}function d(t){try{f(r.throw(t))}catch(t){c(t)}}function f(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(l,d)}f((r=r.apply(t,e||[])).next())}))},d=function(t,body){var e,n,r,g,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return g={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function c(c){return function(l){return function(c){if(e)throw new TypeError("Generator is already executing.");for(;g&&(g=0,c[0]&&(o=0)),o;)try{if(e=1,n&&(r=2&c[0]?n.return:c[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,c[1])).done)return r;switch(n=0,r&&(c=[2&c[0],r.value]),c[0]){case 0:case 1:r=c;break;case 4:return o.label++,{value:c[1],done:!1};case 5:o.label++,n=c[1],c=[0];continue;case 7:c=o.ops.pop(),o.trys.pop();continue;default:if(!(r=o.trys,(r=r.length>0&&r[r.length-1])||6!==c[0]&&2!==c[0])){o=0;continue}if(3===c[0]&&(!r||c[1]>r[0]&&c[1]<r[3])){o.label=c[1];break}if(6===c[0]&&o.label<r[1]){o.label=r[1],r=c;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(c);break}r[2]&&o.ops.pop(),o.trys.pop();continue}c=body.call(t,o)}catch(t){c=[6,t],n=0}finally{e=r=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,l])}}},f=o.default.extend({name:"Knowledge",components:{DashboardWidget:r.default},layout:"DashboardLayout",data:function(){return{dashboardList:[]}},computed:{loading:function(){return this.$store.getters["dashboard/getLoading"]},dataSource:function(){var t=this.$store.getters["dashboard/getShipCount"],e={series:[]};return t&&Object.keys(t).length>0?e.series=[{data:Object.keys(t).map((function(e){return{name:e,value:t[e].data1}}))}]:e.series=[],{shipCount:e}}},created:function(){this.onLoadDashboard(this.$route.path)},methods:{onLoadDashboard:function(){return l(this,arguments,void 0,(function(path){var t=this;return void 0===path&&(path=""),d(this,(function(e){return this.$fire.database.ref("widgets".concat(path)).once("value",(function(e){var data=e.val();t.dashboardList=data.filter((function(t){return t})).map((function(t,e){return c(c({},t),{i:e})}))})),[2]}))}))}}}),h=f,y=n(124),component=Object(y.a)(h,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("grid-layout",{attrs:{show:!t.loading,layout:t.dashboardList,"col-num":5,"row-num":12,"row-height":150,"is-draggable":!0,"is-resizable":!0,"vertical-compact":!0,"use-css-transforms":!0}},t._l(t.dashboardList,(function(n){return e("dashboard-widget",{key:n.name,attrs:{item:n,"data-source":t.dataSource}})})),1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{DashboardWidget:n(816).default})}}]);