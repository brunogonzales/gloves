import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  // move to secret
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

export default ({ app }, inject) => {
  inject("openai", openai);
};
