import { exec } from 'child_process';

export const formatPreHTML = (str: string) =>
  `<pre style="word-wrap: break-word; white-space: pre-wrap;">${str}</pre>`;

export const execAsPromise = (command: string): Promise<string> =>
  new Promise((resolve) => {
    exec(command, (error, stdout) => {
      if (error) {
        resolve(error.message);
        return;
      }
      resolve(stdout);
    });
  });

export const processMultilineJSON = (text: string) =>
  text
    .split('\n')
    .map((text) => {
      try {
        return JSON.stringify(JSON.parse(text), undefined, 2);
      } catch (e) {
        return text;
      }
    })
    .slice(0, -1)
    .join(',');
