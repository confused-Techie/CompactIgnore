## IN DEVELOPMENT

Within the `parse_table.json` file will be included as many profiles as supported. Each having required values.

## `declarator`:

The Declarator will be the Declaration needed within the .compactignore file to indicate the type of profile to be used.
e.g. gitignore can be the declarator for creating a .gitignore file, where in the .compactignore file will need:

````(json)
"gitignore": [
  "location": "",
  "comment": "",
  "action": ""
]
````

## `path`:

This is the path used to import the proper parser, in relation to the `src/cli/parse.js` file.

While the parsers should all live in the `src/parsers/` directory, that would look like so: `"path": "../parsers/gitignore.js"`.

## `parser`:

This is used as the function to call within the parser that will receive the full Entry from the .compactignore file.

e.g. Will recieve a location, comment, and action and need to return a properly formatted file of that data, new lines and everything included.

## `name`:

This will be the resulting files exact name, and will be used to save the file thats created by the Profile.

## Parsers: attribution:

Optionally the parser may include an attribution function that will be called before any entries are processed, allowing attribution to be placed at the top of the file. 
