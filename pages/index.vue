<template>
  <div>
    <pre><code>{{$openai}}</code></pre>

    <input type="text" v-model="prompt" />
    <button @click="ask">ask</button>
    <p>{{ answer }}</p>
  </div>
</template>


<script>
export default {
  data() {
    return {
      prompt: "",
      answer: "",
    };
  },
  methods: {
    async ask() {
      const completion = await this.$openai.createCompletion(
        "text-davinci-001",
        {
          prompt: this.prompt,
        }
      );
      this.answer = completion?.data?.choices[0]?.text;
    },
  },
};
</script>