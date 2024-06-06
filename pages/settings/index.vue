<template>
  <b-container
    fluid
    class="h-100"
  >
    <b-modal
      v-model="modalShow"
      ok-only
      footer-class="justify-content-center"
      :ok-title="$t('add')"
      ok-variant="info"
    >
      <b-form>
        <b-form-group
          label-size="sm"
          label="圖表標題:"
          label-for="圖表標題"
          label-cols-sm="3"
          label-class="mb-1"
          label-align-sm="right"
        >
          <b-form-input
            id="圖表標題"
            v-model="form.name"
            placeholder="請輸入圖表標題"
            style="max-width: 300px"
          />
        </b-form-group>
        <b-form-group
          label-size="sm"
          label="圖表類型:"
          label-for="圖表類型"
          label-cols-sm="3"
          label-class="mb-1"
          label-align-sm="right"
        >
          <b-form-select
            id="圖表類型"
            v-model="form.type"
            class="text-secondary"
            :options="['折線圖','柱狀圖','圓餅圖','點陣圖'].map(s=>({
              value: s,
              text: s
            }))"
            placeholder="請選擇圖表類型"
            style="max-width: 300px"
          >
            <b-form-select-option :value="''">
              請選擇
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          label-size="sm"
          label="時間區間:"
          label-for="時間區間"
          label-cols-sm="3"
          label-class="mb-1"
          label-align-sm="right"
        >
          <b-form-select
            id="時間區間"
            v-model="form.date"
            class="text-secondary"
            :options="['每天','每月','每年'].map(s=>({
              value: s,
              text: s
            }))"
            placeholder="請選擇時間區間"
            style="max-width: 300px"
          >
            <b-form-select-option :value="''">
              請選擇
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          label-size="sm"
          label="時間層級:"
          label-for="時間層級"
          label-cols-sm="3"
          label-class="mb-1"
          label-align-sm="right"
        >
          <b-form-select
            id="時間層級"
            v-model="form.year"
            class="text-secondary"
            :options="['月份'].map(s=>({
              value: s,
              text: s
            }))"
            placeholder="請選擇時間層級"
            style="max-width: 300px"
          >
            <b-form-select-option :value="''">
              請選擇
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          label-size="sm"
          label="主要Y軸:"
          label-for="主要Y軸"
          label-cols-sm="3"
          label-class="mb-1"
          label-align-sm="right"
        >
          <b-form-select
            id="主要Y軸"
            v-model="form.mainY"
            class="text-secondary"
            :options="['經人採購指數[PMI]', '消費者物價指數[CPI]' , '全球經濟成長率[IMF]'].map(s=>({
              value: s,
              text: s
            }))"
            placeholder="請選擇主要Y軸"
            style="max-width: 300px"
          >
            <b-form-select-option :value="''">
              請選擇
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          label-size="sm"
          label="次要Y軸:"
          label-for="次要Y軸"
          label-cols-sm="3"
          label-class="mb-1"
          label-align-sm="right"
        >
          <b-form-select
            id="次要Y軸"
            v-model="form.subY"
            class="text-secondary"
            :options="['經人採購指數[PMI]', '消費者物價指數[CPI]' , '全球經濟成長率[IMF]'].map(s=>({
              value: s,
              text: s
            }))"
            placeholder="請選擇次要Y軸"
            style="max-width: 300px"
          >
            <b-form-select-option :value="''">
              請選擇
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          label-size="sm"
          label="基本數值:"
          label-for="基本數值"
          label-cols-sm="3"
          label-class="mb-1"
          label-align-sm="right"
        >
          <b-form-input
            id="基本數值"
            v-model="form.value"
            class="text-secondary"
            type="number"
            placeholder="請輸入基本數值"
            style="max-width: 300px"
          />
        </b-form-group>
      </b-form>
    </b-modal>
    <b-card
      text-variant="white"
      class="bg-transparent mb-5"
      border-variant="secondary"
    >
      <b-row>
        <b-col
          sm="12"
          md="6"
          order="2"
          order-md="1"
          order-sm="2"
          class="justify-content-md-start justify-content-end d-flex mb-1"
        >
          <b-button variant="info">
            {{ $t('save') }}
          </b-button>
        </b-col>
        <b-col
          sm="12"
          md="6"
          order="1"
          order-md="2"
          order-sm="1"
          class="justify-content-md-end justify-content-start d-flex mb-1"
          style="gap: 1rem"
        >
          <b-button
            variant="info"
            @click="toggleModal"
          >
            {{ $t('add.chart') }}
          </b-button>
          <b-button
            variant="info"
            @click="toggleModal"
          >
            {{ $t('add.text') }}
          </b-button>
          <b-button
            variant="info"
            @click="toggleModal"
          >
            {{ $t('add.pic') }}
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-form-group
      class="d-inline-flex w-100"
      label="主題名稱"
      label-for="MenuName"
      label-cols="3"
      label-class="text-right text-white pr-2"
      content-cols="8"
      description="請輸入主題名稱"
    >
      <b-form-input
        id="MenuName"
        v-model="menuName"
        type="text"
        required
      />
    </b-form-group>
    <grid-layout
      :layout="dashboardList"
      :col-num="1"
      :row-num="3"
      :row-height="300"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <dashboard-widget
        v-for="item in dashboardList"
        :key="item.name"
        :item="item"
        :data-source="dataSource"
      >
        了解如何使用Excel 函數來擷取一或多個儲存格中的文字，並將它分割至多個儲存格中。 此動作稱為剖析，作用與串連相反。 觀看此影片以深入了解。
      </dashboard-widget>
    </grid-layout>
  </b-container>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Settings',
  layout: 'DashboardLayout',
  data() {
    return {
      form: {
        name: '',
        type: '',
        date: '',
        year: '',
        mainY: '',
        subY: '',
        value: '',
      },
      modalShow: false,
      dashboardList: [
        {
          chartType: 'text',
          i: 0,
          w: 1,
          h: 1,
          x: 0,
          y: 0,
          name: '自訂圖表'
        }
      ],
      dataSource: {},
      menuName: ''
    };
  },
  methods: {
    toggleModal() {
      this.modalShow = !this.modalShow;
    }
  }
});
</script>
