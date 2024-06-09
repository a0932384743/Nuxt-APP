<template>
  <div class="chat-room">
    <div class="chat-header">
      <h5>商情平台小幫手</h5>
    </div>
    <div
      ref="chatMessages"
      class="chat-messages"
    >
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message"
        :class="{
          'text-right': index % 2 === 1
        }"
      >
        <b>{{ message.user }}:</b> <br/>{{ message.text }}
      </div>
    </div>
    <div class="chat-input">
      <b-form-input
        v-model="newMessage"
        placeholder="輸入訊息..."
        @keyup.enter="sendMessage"
      />
      <b-button
        variant="primary"
        class="text-nowrap"
        @click="sendMessage"
      >
        發送
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharRoom',
  data() {
    return {
      newMessage: '',
      messages: [
        { user: 'User', text: '請搜尋航運相關新聞' },
        { user: '商情平台小幫手', text: '您所查詢的新聞如下....' }
      ]
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({ user: 'You', text: this.newMessage });
        this.newMessage = '';
        this.$nextTick(() => {
          this.scrollToEnd();
        });
      }
    },
    scrollToEnd() {
      const chatMessages = this.$refs.chatMessages;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
};
</script>

<style scoped>
.chat-room {
  width: 100%;
  background: white;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
}

.chat-header {
  text-align: center;
  margin-bottom: 20px;
}

.chat-messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.message {
  margin-bottom: 10px;
}

.chat-input {
  display: flex;
  gap: 10px;
}
</style>
