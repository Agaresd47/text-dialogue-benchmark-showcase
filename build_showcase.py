from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
ASSETS_DIR = ROOT / "assets"
FRAMEWORK_ZH_PATH = DATA_DIR / "framework.zh.json"
FRAMEWORK_EN_PATH = DATA_DIR / "framework.en.json"
TITLE_SOURCE_PATH = ROOT / "showcase-data.js"
INDEX_PATH = ROOT / "index.html"
FIGURE_BY_LOCALE = {
    "zh": "./assets/zh/eval/refined_portfolio_graph_spacious_zh.png",
    "en": "./assets/zh/eval/refined_portfolio_graph_compact_english.png",
}

NO_SUFFIX_KEYS = {
    "code",
    "displayPath",
    "href",
    "hrefTemplate",
    "id",
    "key",
    "locale",
    "model",
    "path",
    "src",
    "url",
}


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def write_inline_json(index_path: Path, element_id: str, payload: Any) -> None:
    text = index_path.read_text(encoding="utf-8")
    json_text = json.dumps(payload, ensure_ascii=False)
    json_text = json_text.replace("</script>", "<\\/script>").replace("<!--", "<\\!--")
    replacement = f'<script id="{element_id}" type="application/json">{json_text}</script>'
    pattern = rf'<script id="{re.escape(element_id)}" type="application/json">.*?</script>'
    updated = re.sub(pattern, lambda _: replacement, text, flags=re.S)
    index_path.write_text(updated, encoding="utf-8")
def load_showcase_source() -> dict[str, Any]:
    script = """
const fs = require('fs');
const vm = require('vm');
const text = fs.readFileSync('showcase-data.js', 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(text, context);
process.stdout.write(JSON.stringify(context.window.SHOWCASE_DATA));
"""
    result = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    return json.loads(result.stdout)


def rewrite_asset_link(value: str, locale: str) -> str:
    if value.startswith("https://github.com/"):
        if "/assets/zh/" in value or "/assets/en/" in value:
            value = re.sub(r"/assets/(zh|en)/", "/assets/", value)
        return value.replace("/assets/", f"/assets/{locale}/", 1)
    if value.startswith("./assets/"):
        value = re.sub(r"^\./assets/(zh|en)/", "./assets/", value)
        return value.replace("./assets/", f"./assets/{locale}/", 1)
    return value


def build_material(locale: str, showcase_source: dict[str, Any]) -> dict[str, Any]:
    core_cases = []
    for case in showcase_source["coreCases"]:
        cloned = json.loads(json.dumps(case))
        cloned["links"] = {
            name: rewrite_asset_link(url, locale) for name, url in case["links"].items()
        }
        core_cases.append(cloned)

    return {
        "locale": locale,
        "stats": showcase_source["stats"],
        "figure": {
            "src": FIGURE_BY_LOCALE[locale]
        },
        "bucketDistribution": showcase_source["bucketDistribution"],
        "coreCases": core_cases,
    }


def main() -> None:
    framework_zh = read_json(FRAMEWORK_ZH_PATH)
    framework_en = read_json(FRAMEWORK_EN_PATH)
    showcase_source = load_showcase_source()
    material_zh = build_material("zh", showcase_source)
    material_en = build_material("en", showcase_source)

    # write_json(FRAMEWORK_EN_PATH, framework_en)
    write_json(DATA_DIR / "material.zh.json", material_zh)
    write_json(DATA_DIR / "material.en.json", material_en)
    write_inline_json(INDEX_PATH, "framework-zh-data", framework_zh)
    write_inline_json(INDEX_PATH, "framework-en-data", framework_en)
    write_inline_json(INDEX_PATH, "material-zh-data", material_zh)
    write_inline_json(INDEX_PATH, "material-en-data", material_en)


    print("Generated data files and embedded inline JSON into index.html")


if __name__ == "__main__":
    main()
