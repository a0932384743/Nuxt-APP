import Vue from 'vue';
import { Store } from 'vuex';
import { FirebaseApp } from 'firebase'; // 假設這是 firebase 的導入方式
import { VueI18n } from 'vue-i18n'; // 假设这是 vue-i18n 的导入方式

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<{
      $fire: FirebaseApp;
    }>;
    $t: VueI18n['t'];
  }
}
export function component(arg0: string, FontAwesomeIcon: any) {
    throw new Error('Function not implemented.');
}

export function use(VueI18n: VueI18n) {
    throw new Error('Function not implemented.');
}

export function directive(arg0: string, clickOutside: { bind(el: any, binding: any, vnode: any): void; unbind(el: any): void; }) {
    throw new Error('Function not implemented.');
}

