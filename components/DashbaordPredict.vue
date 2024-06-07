<template>
  <b-card
    text-variant="white"
    header-class="py-1 px-2"
    body-class="p-2 h-100 d-flex flex-column position-relative"
    class="bg-transparent h-100"
    border-variant="secondary"
  >
    <template #header>
      <div class="d-flex pl-2 pr-5 position-relative">
        <div>
          <strong>貨櫃吞吐量預測</strong>
        </div>
        <b-dropdown
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
          menu-class="custom-dropdown-menu"
          class="position-absolute"
          style="right: 0px; top: 0px"
          right
        >
          <template #button-content>
            <font-awesome-icon
              icon="gear"
              class="text-dark"
            />
          </template>
        </b-dropdown>
      </div>
    </template>

    <b-tabs
      pills
      class="custom-pill"
      content-class="mt-3"
      nav-wrapper-class="mt-0"
      justified
    >
      <b-tab
        title="營運效率"
        active
      />
      <b-tab
        title="成本管理"
      />
      <b-tab
        title="安全合規"
      />
      <b-tab
        title="環境影響"
      />
    </b-tabs>
    <b-row class="h-100">
      <b-col
        sm="12"
        md="6"
      >
        <v-chart
          :options="optionTotal"
          class="h-100 w-100"
          autoresize
        />
      </b-col>
      <b-col
        sm="12"
        md="6"
      >
        <v-chart
          :options="optionSub"
          class="h-100 w-100"
          autoresize
        />
      </b-col>
    </b-row>
    <img
      src="/img/robot-icon.png"
      alt="告警機器人"
      width="50px"
      class="position-absolute"
      style="right: 10px;bottom: 10px"
    >
  </b-card>
</template>
<script lang="ts">
import Vue from 'vue';
import regression from 'regression';
export default Vue.extend({
  name: 'DashboardPredict',
  props: {
    dataSource: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      option: {}
    };
  },
  computed: {
    optionSub() {
      const originalData1 = [
        {
          date: '2023-01-01',
          value: 4535
        },
        {
          date: '2023-02-01',
          value: 4345
        },
        {
          date: '2023-03-01',
          value: 4587
        },
        {
          date: '2023-04-01',
          value: 4688
        },
        {
          date: '2023-05-01',
          value: 4477
        },
        {
          date: '2023-06-01',
          value: 4573
        },
        {
          date: '2023-07-01',
          value: 5753
        },
        {
          date: '2023-08-01',
          value: 7861
        },
        {
          date: '2023-09-01',
          value: 7861
        },
        {
          date: '2023-10-01',
          value: 7817
        },
        {
          date: '2023-11-01',
          value: 7864
        },
        {
          date: '2023-12-01',
          value: 9782
        },
        {
          date: '2024-01-01',
          value: 8272
        },
        {
          date: '2024-02-01',
          value: 8722
        },
        {
          date: '2024-03-01',
          value: 7832
        }

      ];
      const originalData2 = [
        {
          date: '2023-01-01',
          value: 21234
        },
        {
          date: '2023-02-01',
          value: 24531
        },
        {
          date: '2023-03-01',
          value: 44538
        },
        {
          date: '2023-04-01',
          value: 14130
        },
        {
          date: '2023-05-01',
          value: 47187
        },
        {
          date: '2023-06-01',
          value: 14170
        },
        {
          date: '2023-07-01',
          value: 67834
        },
        {
          date: '2023-08-01',
          value: 77136
        },
        {
          date: '2023-09-01',
          value: 44521
        },
        {
          date: '2023-10-01',
          value: 34123
        },
        {
          date: '2023-11-01',
          value: 17428
        },
        {
          date: '2023-12-01',
          value: 27813
        },
        {
          date: '2024-01-01',
          value: 17812
        },
        {
          date: '2024-02-01',
          value: 17212
        },
        {
          date: '2024-03-01',
          value: 41430
        }

      ];
      const originalData3 = [
        {
          date: '2023-01-01',
          value: 12200
        },
        {
          date: '2023-02-01',
          value: 12100
        },
        {
          date: '2023-03-01',
          value: 12300
        },
        {
          date: '2023-04-01',
          value: 12300
        },
        {
          date: '2023-05-01',
          value: 11500
        },
        {
          date: '2023-06-01',
          value: 12701
        },
        {
          date: '2023-07-01',
          value: 12801
        },
        {
          date: '2023-08-01',
          value: 12601
        },
        {
          date: '2023-09-01',
          value: 14201
        },
        {
          date: '2023-10-01',
          value: 13201
        },
        {
          date: '2023-11-01',
          value: 11202
        },
        {
          date: '2023-12-01',
          value: 10202
        },
        {
          date: '2024-01-01',
          value: 12203
        },
        {
          date: '2024-02-01',
          value: 11023
        },
        {
          date: '2024-03-01',
          value: 13203
        }

      ];
      const originalSeriesData1 = originalData1.map(item => item.value);
      const originalSeriesData2 = originalData2.map(item => item.value);
      const originalSeriesData3 = originalData3.map(item => item.value);
      const predictedData1 = this.genPredictedData(originalData1);
      const predictedData2 = this.genPredictedData(originalData2);
      const predictedData3 = this.genPredictedData(originalData3);
      const xAxisData = originalData1
        .map(item => item.date)
        .concat(predictedData1.map(item => item.date));

      const predictedSeriesData1 = [...originalData1.map((item, index, array) => (index === array.length - 1) ? item : null), ...predictedData1.map(item => item.value)];
      const predictedSeriesData2 = [...originalData2.map((item, index, array) => (index === array.length - 1) ? item : null), ...predictedData2.map(item => item.value)];
      const predictedSeriesData3 = [...originalData3.map((item, index, array) => (index === array.length - 1) ? item : null), ...predictedData3.map(item => item.value)];

      const option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '進口貨原始數據',
            type: 'line',
            data: originalSeriesData1,
            smooth: true
          },
          {
            name: '進口貨預測數據',
            type: 'line',
            data: predictedSeriesData1,
            smooth: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          {
            name: '出口貨原始數據',
            type: 'line',
            data: originalSeriesData2,
            smooth: true
          },
          {
            name: '出口貨預測數據',
            type: 'line',
            data: predictedSeriesData2,
            smooth: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          {
            name: '國內貨物原始數據',
            type: 'line',
            data: originalSeriesData3,
            smooth: true
          },
          {
            name: '國內貨物預測數據',
            type: 'line',
            data: predictedSeriesData3,
            smooth: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        ]
      };

      return option;
    },
    optionTotal() {
      const originalData = [
        {
          date: '2023-01-01',
          value: 120
        },
        {
          date: '2023-02-01',
          value: 110
        },
        {
          date: '2023-03-01',
          value: 130
        },
        {
          date: '2023-04-01',
          value: 130
        },
        {
          date: '2023-05-01',
          value: 150
        },
        {
          date: '2023-06-01',
          value: 170
        },
        {
          date: '2023-07-01',
          value: 180
        },
        {
          date: '2023-08-01',
          value: 160
        },
        {
          date: '2023-09-01',
          value: 140
        },
        {
          date: '2023-10-01',
          value: 130
        },
        {
          date: '2023-11-01',
          value: 110
        },
        {
          date: '2023-12-01',
          value: 100
        },
        {
          date: '2024-01-01',
          value: 120
        },
        {
          date: '2024-02-01',
          value: 110
        },
        {
          date: '2024-03-01',
          value: 130
        }

      ];
      const predictedData = this.genPredictedData(originalData);
      const xAxisData = originalData
        .map(item => item.date)
        .concat(predictedData.map(item => item.date));
      const originalSeriesData = originalData.map(item => item.value);
      const predictedSeriesData = [...originalData.map((item, index, array) => (index === array.length - 1) ? item : null), ...predictedData.map(item => item.value)];

      const option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '原始數據',
            type: 'line',
            data: originalSeriesData,
            smooth: true
          },
          {
            name: '預測數據',
            type: 'line',
            data: predictedSeriesData,
            smooth: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        ]
      };

      return option;
    }
  },
  methods: {
    genPredictedData(originalData = []) {
      const dataForRegression = originalData.map((item, index) => [
        index,
        item.value
      ]);
      const result = regression.linear(dataForRegression);
      const equation = result.equation;
      const numberOfPredictions = 9;
      const predictedData = [];
      for (
        let i = originalData.length;
        i < originalData.length + numberOfPredictions;
        i++
      ) {
        const predictedValue = equation[0] * i + equation[1];
        predictedData.push({
          date: `2024-${i - originalData.length}`,
          value: predictedValue
        });
      }
      return predictedData;
    }
  }

});
</script>
<style></style>
