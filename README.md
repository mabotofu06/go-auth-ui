# go-auth-ui

### シーケンス図
```mermaid
sequenceDiagram
autonumber
    actor user as 利用者
    participant otherSystem as 外部システム

    participant login as ログイン画面
    participant portal as ポータル画面
    participant bl as バックエンド(go-auth-bl)

    user->>otherSystem: 外部システムを利用

    Note right of otherSystem: 認可コード要求
    otherSystem->>bl: 認可コードを要求
    bl-->>login: ログイン画面を表示
    login->>bl: ログイン情報を送信し、照合
    bl->>otherSystem: ログイン情報問題なければ認可コードを発行

    Note right of otherSystem: アクセストークン要求
    otherSystem->>bl: 認可コードを使ってアクセストークンを要求
    bl-->>otherSystem: 認可コード問題なければアクセストークンを発行


    user->>login: go-Authのログイン画面に直アクセス
    login->>login: ログイン情報入力
    Note right of login: ログイン
    login->>bl: ログイン情報リクエスト
    bl-->>portal: ログイン問題なければアクセストークンを発行し、ポータルを表示

    portal->>otherSystem: ポータルから外部サイトにログイン状態を維持しつつ繊維可能
```

### 画面遷移図
```mermaid
sequenceDiagram
autonumber
    participant login as ログイン画面
    participant register as ユーザ登録画面

    participant sendPass as パスワード再発行画面

    participant portal as ポータル画面
    participant edit as ユーザ情報変更画面

    login->>register: ログイン情報を送信し、照合
    login->>sendPass: ログイン情報問題なければ認可コードを発行

    portal->>edit: ログイン情報問題なければ認可コードを発行
```


# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
