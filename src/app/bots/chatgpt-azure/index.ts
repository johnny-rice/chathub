import { UserConfig } from '~services/user-config'
import { AbstractChatGPTApiBot } from '../chatgpt-api'
import { ChatMessage } from '../chatgpt-api/types'

export class ChatGPTAzureApiBot extends AbstractChatGPTApiBot {
  constructor(
    private config: Pick<
      UserConfig,
      'azureOpenAIApiKey' | 'azureOpenAIApiDeploymentName' | 'azureOpenAIApiInstanceName'
    >,
  ) {
    super()
  }

  async fetchCompletionApi(messages: ChatMessage[], signal?: AbortSignal) {
    const endpoint = `https://${this.config.azureOpenAIApiInstanceName}.openai.azure.com/openai/deployments/${this.config.azureOpenAIApiDeploymentName}/chat/completions?api-version=2025-01-01-preview`
    return fetch(endpoint, {
      method: 'POST',
      signal,
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.config.azureOpenAIApiKey,
      },
      body: JSON.stringify({
        messages,
        stream: true,
      }),
    })
  }

  get name() {
    return `ChatGPT (azure/gpt-3.5)`
  }
}
