<template>
  <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
    <div class="flex flex-col space-y-4">
      <div class="overflow-auto h-60">
        <div v-for="(msg, index) in messages" :key="index" class="message">{{ msg }}</div>
      </div>
      <input type="text" v-model="message" class="border p-2" @keyup.enter="sendMessage">
      <button @click="sendMessage">
        Send
      </button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      socket: null,
      message: '',
      messages: []
    };
  },
  mounted() {
    this.socket = io('http://localhost:3000');
    this.socket.on('chat message', msg => {
      this.messages.push(msg);
    });
  },
  methods: {
    sendMessage() {
      this.socket.emit('chat message', this.message);
      this.message = '';
    }
  }
};
</script>
