/*
// GlobalNavStack.ts
import { AppStorageV2 } from '@kit.ArkUI';

export class NavPathStack {
  private stack: string[] = [];

  push(path: string) {
    this.stack.push(path);
  }

  pop(): string | undefined {
    return this.stack.pop();
  }

  getCurrent(): string | undefined {
    return this.stack[this.stack.length - 1];
  }
}

// 全局共享导航栈
export const GlobalNavStack = AppStorageV2.connect(
  NavPathStack,
  'navStack',
  () => new NavPathStack()
)!;
*/
