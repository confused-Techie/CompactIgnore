This document will serve as the source of truth for expected data structures.

When given an input `.compactignore` like so:

```text
# This is an orphaned comment
>GLOBAL
# This is a global comment
!/keep/this/file.txt
/remove/this/file.txt
>prettier
/remove/another/file.txt
```

The `parser.js` returns the following parsed data:

```json
{
  "orphanComments": ["This is an orphaned comment"],
  "GLOBAL": {
    "children": [
      {
        "type": "comment",
        "value": "This is a global comment"
      },
      {
        "type": "inclusion",
        "value": "/keep/this/file.txt"
      },
      {
        "type": "exclusion",
        "value": "remove/this/file.txt"
      }
    ]
  },
  "prettier": {
    "children": [
      {
        "type": "exclusion",
        "value": "remove/another/file.txt"
      }
    ]
  }
}
```

---

Each Service should return an object like:

```json
{
  "name": "filename",
  "content": "file content",
  "attribution": "attribution text"
}
```
