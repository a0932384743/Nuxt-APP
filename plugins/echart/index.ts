import Vue from 'vue';
import ECharts from 'vue-echarts';
import 'echarts';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markArea';
import 'static/js/world';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LinesChart } from 'echarts/charts';
import { GeoComponent } from 'echarts/components';

// Register the required components
use([CanvasRenderer, LinesChart, GeoComponent]);
Vue.component('VChart', ECharts);
