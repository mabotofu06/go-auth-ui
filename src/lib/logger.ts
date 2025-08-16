import { PUBLIC_LOG_LEVEL } from "$env/static/public"; // 必要な公開環境変数

// ログレベル優先度
const levelOrder = ["error","warn","info","debug"] as const;
type Level = typeof levelOrder[number];

const currentLevel: Level = (PUBLIC_LOG_LEVEL as Level) || "info";
const currentIndex = levelOrder.indexOf(currentLevel);

// 出力するか判定 (要求レベルの index <= 現在レベル index)
function shouldPrint(requestLevel: Level) {
  return levelOrder.indexOf(requestLevel) <= currentIndex;
}

export const logger = {
  debug: (...a: unknown[]) => shouldPrint("debug") && console.info("[DEBUG]", ...a),
  table: (table: any, a: string[]|undefined=undefined) => shouldPrint("debug") && console.table(table, a),
  info:  (...a: unknown[]) => shouldPrint("info")  && console.info("[INFO]", ...a),
  warn:  (...a: unknown[]) => shouldPrint("warn")  && console.warn("[WARN]", ...a),
  error: (...a: unknown[]) => shouldPrint("error") && console.error("[ERROR]", ...a),
};

// シンプル互換 (従来 log)
export const log = (...a: unknown[]) => logger.info(...a);