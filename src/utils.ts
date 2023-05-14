import { exec } from 'child_process';

export const indexRouteHTML = `<div style="width:100%;height:100%;display:flex;flex-flow:column;justify-content:center;align-items:center;gap:16px"><a style="font-size:24px;" href="https://github.com/caffellatte/snsapi" target="_blank">GITHUB</a><h1 style="font-size:36px;">snsapi</h1><a style="font-size:24px;" href="/help">HELP</a></div>`;

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
