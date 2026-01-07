# Longdata

This is a project to make our labs online. Containing living and file management functions.

## Getting Started

First, git and run the development server:

```bash
git clone https://github.com/Giqure/longdata.git
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Server

```bash
npm start
```

## Project

### create

Project is created with `next.js` with app route.
`Next.js` is based on `react`.

Project uses `next-auth` to implement signin function, `prisma` as ORM to connect `mySQL` and `tailwind` CSS.

Based on `TS`. Chinese.

### structure

Most function (`live` `feedback` and default page) shared the same layout in `(defaultRoot)`. Only `file` use a different layout. `Sign In` generally created by `Next-Auth`.

Files managed by `file` is storaged in `app/data/file`.

This project created in a enviroment which is called longdatd so its called longdata. It storaged in (Linux)`/www/`, so you can see if the absoulte path is used, it will be `/www/longdata/`.

### function

#### live

Receive stream by rtmp://SERVERIP:1935/live, and show all streams in `/live`.

Also a tutorial using OBS as example at `file/turtorial` (just spelling mistake).

#### feedback

Only one sentence.

#### file

Like a simple Explorer in windows, it manage files in certain dir. User can upload and delete files, make dirs.
Some details of files are storaged and displayed, e.g. uploader, upload time, file size(not storaged).

#### User

This website project contains user management. User can sign up, sign in and out.
