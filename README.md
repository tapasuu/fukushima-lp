# 福島LP - Vite + Sass 開発環境

## 環境構成

- **Vite**: 高速ビルドツール
- **Sass/SCSS**: CSSプリプロセッサ
- **PostCSS + Autoprefixer**: ベンダープレフィックス自動付与
- **normalize.css**: クロスブラウザスタイルの正規化

## ディレクトリ構造

```
構成/
├── src/              # 開発用ディレクトリ
│   ├── index.html
│   ├── scss/
│   │   ├── style.scss       # メインSassファイル
│   │   ├── _variables.scss  # 変数定義
│   │   └── _mixins.scss     # ミックスイン
│   ├── js/
│   │   └── main.js
│   └── images/
├── tmp/              # ビルド出力先（Vercelデプロイ用）
├── package.json
├── vite.config.js
└── vercel.json
```

## 開発コマンド

### 開発サーバー起動
```bash
npm run dev
```
- ホットリロード対応
- http://localhost:5173 で起動

### 本番ビルド
```bash
npm run build
```
- tmpディレクトリにビルド
- CSS/JSの最適化・圧縮
- Autoprefixer適用

### プレビュー
```bash
npm run preview
```
- ビルド結果をローカルでプレビュー

## Sass機能

### 変数の使用
```scss
// _variables.scssで定義
$primary-color: #3498db;

// style.scssで使用
.button {
  background-color: $primary-color;
}
```

### ミックスインの使用
```scss
.header {
  @include flex-center;

  @include respond-to('md') {
    padding: 2rem;
  }
}
```

### ファイル分割
```scss
// style.scss
@import 'normalize.css';
@import 'variables';
@import 'mixins';
@import 'components/header';
@import 'components/footer';
```

## デプロイ

ビルド後、GitHubにプッシュすると自動でVercelにデプロイされます。

```bash
npm run build
git add .
git commit -m "Update"
git push origin main
```

## Tips

- Sassファイルは自動でコンパイルされます
- `@import 'normalize.css'`でnormalize.cssが使えます
- 変数・ミックスインは`_variables.scss`と`_mixins.scss`で管理
- コンポーネントごとにSassファイルを分割できます
