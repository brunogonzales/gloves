import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  // move to secret
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

export default ({ app }, inject) => {
  inject("openai", openai);
};
