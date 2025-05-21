# API Web Tiếng Anh - NodeJs

## Cách sử dụng

Clone project về và chạy 2 câu lệnh sau, project chạy trên [http://localhost:3001](http://localhost:3001)

### `npm i`

### `npm start`

## API

### Word

- `[GET] /words/:name`: lấy thông tin từ vựng.

### Course

- `[GET] /courses`: lấy thông tin khóa học.
  - params:
    - topicId: int (Id topic trong database).
    - url: String (VD: https://ejoy-english.com/go/wordstoreDetail/505-phrase-list/42e).

### Exam

- `[GET] /exams`: crawl bài thi toeic.
  - params: bookId: int, examId: int, name: String, bookIdDatabase: String, cookie: String.

### Video

- `[GET] /video/crawl`: crawl video.
  - params: categoryId: int, url: String.

### Blog
- `[GET] /blogs`: crawl blog
  - params: categoryId: int, url: String
