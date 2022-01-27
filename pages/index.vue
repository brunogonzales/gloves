<template>
  <div class="container">
    {{ paper }}
    <h1>Theo</h1>
    <p>OpenAI concierge for the Flow blockchain</p>
    <section>
      <h3>Ask me anything</h3>
      <input type="text" v-model="question" />
      <button @click="ask">ask</button>
      <p v-text="answer"></p>
    </section>

    <section>
      <h2>document search</h2>
      <input type="text" v-model="query" />
      <button @click="search">search</button>
      <pre> <code>{{ result }}</code></pre>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      question: "what is Flow?",
      answer: "",
      documents: [
        // Q:How can I connect to and query the Access Nodes? What data is available there?
        "At the protocol level, you can connect to an access node via GRPC. Flow provides JavaScript and Golang SDKs to do this for you. Once you have connected to an access node, you can fetch information regarding accounts, contracts, blocks, collections, transactions, and events. You can also execute scripts to query the current state of the Flow blockchain.",
        //·1 Q:How do apps consume events?
        "Flow transactions can emit informative events containing data intended to be used by off-chain observers. Events can be used to trigger backend or UI events, for example. Note that a single transaction may emit many events, and that the order of events may surprise you if a non-standard transaction is being used. Event parameters may be optional, which means that they might be nil in some scenarios. All of this means that you must be careful when parsing events.",
        //·2 Q:Is there a devnet or testnet?
        "There is an access node for you to develop against the testnet/devnet. You can learn more about it here https://docs.onflow.org/dapp-deployment/testnet-deployment#accessing-flow-testnet",
        //·3 Q:Does Flow has a block explorer?,
        "You can use https://flowscan.org as a block explorer.",
        //·4 Q:How can I see what resources an account has?
        "Flow doesn't yet provide functionality to inspect all of the resources on an account, but it is possible to execute a Cadence script that checks for resources at known storage paths.",
        //·5 Q: Is there a public node?
        "Yes, an access node is publicly accessible to submit transactions and read data from the blockchain. If you’d like to access the devnet access node to build against, you can do so here",
        // 6 Q: what is the max tps in Flow?
        "The maximum amount of transactions per second is 100 aproximately but it can scale with hardware.",
        // 7 Q: what is proof of confindetial knowledge?
        "Specialized Proofs of Confidential Knowledge (SPoCKs) are a new cryptographic technique developed by the Flow team and formally defined in our Technical Papers. SPoCKs allow any number of provers to demonstrate to a third-party observer that they each have access to the same confidential knowledge. These proofs are non-interactive and don't reveal the confidential knowledge. Each prover’s SPoCK is specialized to them, and can’t be copied or forged by any other prover.",
      ],
      query: "is there a public node?",
      result: "",
      paper: "",
    };
  },
  methods: {
    async ask() {
      const answer = await this.$openai.createAnswer({
        search_model: "ada",
        model: "curie",
        question: this.question,
        documents: this.documents,
        max_tokens: 64,
        stop: ["\n", "<|endoftext|>", "==="],
        examples_context:
          "Flow is a new blockchain built for the next generation of apps, games, and the digital assets that power them.",
        examples: [
          [
            "How can I test my changes before deploying to mainnet?",
            "There is an access node to develop against the testnet. You can learn m about it here https://docs.onflow.org/dapp-deployment/testnet-deployment#accessing-flow-testnet",
          ],
        ],
      });
      this.answer = answer.data.answers[0];
    },
    async search() {
      const result = await this.$openai.createSearch("davinci", {
        documents: this.documents,
        query: this.query,
      });
      this.result = result.data;
    },
  },
  mounted() {
    this.paper = paper;
  },
};
</script>

// ask
what is flow?