declare module '*.json';

declare module 'vue-echarts' {
  import ECharts from 'vue-echarts';
  const VueECharts: ECharts;
  export default VueECharts;
}


declare module 'vuedraggable' {
  import draggable from 'vuedraggable';
  const Draggable: draggable;
  export default Draggable;
}
