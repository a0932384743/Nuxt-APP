declare module '*.json';

declare module 'vue-echarts' {
  import ECharts from 'vue-echarts';
  const VueECharts: ECharts;
  export default VueECharts;
}

declare module 'vue-grid-layout' {
  import { PluginFunction } from 'vue';

  export const VueGridLayout: PluginFunction<{}>;

  export interface GridItemProps {
    x: number;
    y: number;
    w: number;
    h: number;
    i?: string;
    [key: string]: any;
  }

  export interface GridLayoutProps {
    layout: GridItemProps[];
    colNum?: number;
    rowHeight?: number;
    isDraggable?: boolean;
    isResizable?: boolean;
    [key: string]: any;
  }

  export const GridLayout: any;
  export const GridItem: any;
}
