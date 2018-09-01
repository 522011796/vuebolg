// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './store';
import moment from 'moment';
import VueI18n from 'vue-i18n';
import Validation from './validate/validation';
import 'font-awesome/css/font-awesome.css'
import './style/main.css'
import "babel-polyfill";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'highlight.js/styles/agate.css';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
hljs.registerLanguage('javascript', javascript);
var MarkdownIt = require('markdown-it')({
  html: true,
  xhtmlOut: true,
  linkify: true,
  typographer: true,
  breaks: true,
  langPrefix: 'language-',
  linkify: true,
  typographer:  true,
  highlight: function (str, lang) {
    var esc = MarkdownIt.utils.escapeHtml;

    try {
      if (!defaults._highlight) {
        throw 'highlighting disabled';
      }

      if (lang && lang !== 'auto' && hljs.getLanguage(lang)) {

        return '<pre class="hljs language-' + esc(lang.toLowerCase()) + '"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';

      } else if (lang === 'auto') {

        var result = hljs.highlightAuto(str);

        /*eslint-disable no-console*/
        console.log('highlight language: ' + result.language + ', relevance: ' + result.relevance);

        return '<pre class="hljs language-' + esc(result.language) + '"><code>' +
          result.value +
          '</code></pre>';
      }
    } catch (__) { /**/ }

    return '<pre class="hljs"><code>' + esc(str) + '</code></pre>';
  }
});
//var md = new MarkdownIt();


Vue.use(iView);
//表单验证插件
Vue.use(Validation);
//国际化
Vue.use(VueI18n);
Vue.use(mavonEditor);

const i18n = new VueI18n({
  locale: 'zh-CN',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./lang/zh'),   // 中文语言包
  }
});

Vue.prototype.$md = MarkdownIt

//时间格式化插件
Vue.prototype.$moment = moment
moment.locale('zh_cn');

// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

// 引用工具文件
import utils from './utils/index.js'
// 将工具方法绑定到全局
Vue.prototype.$utils = utils

//qs
import qs from 'qs'
Vue.prototype.$qs = qs

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,  //国际化
  store,//使用store
  components: { App },
  template: '<App/>'
})
