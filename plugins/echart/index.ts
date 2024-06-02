import Vue from 'vue';
import ECharts from 'vue-echarts';
import 'echarts';
import 'echarts/lib/component/geo';

import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markArea';
import 'static/js/world';

Vue.component('VChart', ECharts);
