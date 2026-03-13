import { ApiCreateResponse, ApiResultResponse, GenerationConfig } from '../types';

const API_BASE_URL = 'https://grsai.dakka.com.cn/v1/draw';

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const createGenerationTask = async (apiKey: string, config: GenerationConfig): Promise<string> => {
  const payload = {
    model: config.model,
    prompt: config.prompt,
    aspectRatio: config.aspectRatio,
    imageSize: config.imageSize,
    urls: config.refImages.length > 0 ? config.refImages : undefined,
    webHook: "-1", // Polling mode
    shutProgress: false,
  };

  const response = await fetch(`${API_BASE_URL}/nano-banana`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API Error ${response.status}: ${errText}`);
  }

  const data: ApiCreateResponse = await response.json();
  if (data.code !== 0) {
    throw new Error(data.msg || 'Unknown API error');
  }

  return data.data.id;
};

export const fetchTaskResult = async (apiKey: string, taskId: string): Promise<ApiResultResponse['data']> => {
  const response = await fetch(`${API_BASE_URL}/result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ id: taskId }),
  });

  if (!response.ok) {
    throw new Error('Failed to check task status');
  }

  const data: ApiResultResponse = await response.json();
  // Note: The API might return code -22 if task not found, handle gracefully in UI if needed
  if (data.code !== 0 && data.code !== 200) { 
       // Sometimes APIs return 200 in code for success, or 0.
       // Based on docs: 0 = success.
       throw new Error(data.msg);
  }

  return data.data;
};
